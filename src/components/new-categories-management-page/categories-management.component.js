import React, { Component, Fragment } from "react";
import {
    Collapse,
    PageHeader,
    List,
    Button,
    Icon,
    Col,
    Row,
    Input,
    Spin
} from "antd";
import Sortable from "react-sortablejs";

class CategoriesManagementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            categories: [],
            prevCategories: null,

            editCursor: -1,
            editName: "",
            isEditedDirty: false,
            isEditorDirty: false
        };
        this.Vars = {
            delay: null,
            charLimit: 25
        };
        this.triggerSaveNewCategory = this.triggerSaveNewCategory.bind(this);
        this.triggerSaveSortedCategories = this.triggerSaveSortedCategories.bind(
            this
        );
        this.triggerDeleteCategory = this.triggerDeleteCategory.bind(this);
        this.triggerEditSaveCategory = this.triggerEditSaveCategory.bind(this);
    }

    // NEW: componentWillReceiveprops()
    static getDerivedStateFromProps(props, state) {
        if (props.categories !== state.prevCategories) {
            return {
                prevCategories: props.categories,
                categories: props.categories
            };
        }
        return null;
    }
    triggerEditSaveCategory() {
        const { saveEditedCategory } = this.props;
        if (
            this.state.editName.length >= this.Vars.charLimit ||
            this.state.editName.length === 0
        ) {
            this.setState({
                isEditedDirty: true
            });
            return;
        }

        saveEditedCategory &&
            saveEditedCategory({
                name: this.state.editName,
                id: this.state.editCursor
            });
        this.categoriesRefresh();
    }

    triggerDeleteCategory(id) {
        const { deleteCategory } = this.props;
        deleteCategory && deleteCategory(id);
        this.categoriesRefresh();
    }

    triggerSaveSortedCategories(payload) {
        const { saveSortedCategories } = this.props;
        saveSortedCategories && saveSortedCategories(payload);
        this.categoriesRefresh();
    }

    triggerSaveNewCategory() {
        const { saveNewCategory } = this.props;

        if (
            this.state.category.length >= this.Vars.charLimit ||
            this.state.category.length === 0
        ) {
            this.setState({
                isEditorDirty: true
            });
            return;
        }

        this.setState({
            editCursor: -1,
            editName: ""
        });

        saveNewCategory &&
            saveNewCategory({
                name: this.state.category
            });
        this.categoriesRefresh();
    }

    categoriesRefresh() {
        this.setState({
            editName: "",
            editCursor: -1,
            category: "",
            isEditedDirty: false,
            isEditorDirty: false
        });
    }

    componentWillUnmount() {
        clearTimeout(this.Vars.delay);
        this.categoriesRefresh();
    }

    componentDidMount() {
        this.props.getNewCategories();
    }

    render() {
        const { categories, loader } = this.props;
        const renderItems = categories.map((category, idx) => (
            <div key={idx} data-id={category.sort} className="dnd-table">
                <div className="grid-left">
                    <div
                        className={
                            "ant-form-item-control " +
                            (this.state.isEditedDirty ? "has-error" : "")
                        }
                    >
                        {this.state.editCursor === category.id ? (
                            <div>
                                <Input
                                    value={this.state.editName}
                                    onChange={evt => {
                                        const value = evt.target.value;
                                        this.setState({
                                            editName: value,
                                            isEditedDirty: false
                                        });
                                    }}
                                />
                                {this.state.isEditedDirty && (
                                    <div className="ant-form-explain">
                                        {this.state.editName.length === 0
                                            ? "This field is required"
                                            : "Name should be not more than 25 characters."}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span>{category.name}</span>
                        )}
                    </div>
                </div>

                <div className="grid-right">
                    <div className="dnd-btn-wrapper">
                        <Fragment>
                            {/* save/edit dynamic */}
                            {this.state.editCursor !== category.id ? (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            editCursor: category.id,
                                            editName: category.name,
                                            isEditedDirty: false
                                        });
                                    }}
                                >
                                    <Icon type={"edit"} />
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={this.triggerEditSaveCategory}
                                >
                                    <Icon type={"save"} />
                                </Button>
                            )}
                        </Fragment>

                        <Button
                            type="danger"
                            onClick={() => {
                                this.triggerDeleteCategory(category.id);
                            }}
                        >
                            <Icon type="delete" />
                        </Button>
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="box-layout-custom">
                <PageHeader title={"Categories"} />

                <div className="dnd-header dnd-table">
                    <div
                        className={
                            "grid-left ant-form-item-control " +
                            (this.state.isEditorDirty ? "has-error" : "")
                        }
                    >
                        <Input
                            value={this.state.category}
                            onChange={evt => {
                                const value = evt.target.value;
                                this.setState({
                                    category: value,
                                    isEditorDirty: false
                                });
                            }}
                        />
                        {this.state.isEditorDirty && (
                            <div className="ant-form-explain not-bold">
                                {this.state.category.length === 0
                                    ? "This field is required"
                                    : "Name should be not more than 25 characters."}
                            </div>
                        )}
                    </div>
                    <div className="grid-right">
                        <Button
                            type="primary"
                            onClick={this.triggerSaveNewCategory}
                        >
                            Add Category
                        </Button>
                    </div>
                </div>

                {/* <br /> */}

                <div className="dnd-header dnd-table">
                    <div className="grid-left">Categories</div>
                    <div className="grid-right">Actions</div>
                </div>

                <div className="dnd-wrapper">
                    <Spin spinning={loader}>
                        <Sortable
                            tag={"div"}
                            onChange={(order, sortable, evt) => {
                                const newArr = [];
                                order.forEach(newSequence => {
                                    this.state.categories.forEach(category => {
                                        if (+category.sort === +newSequence) {
                                            newArr.push(category);
                                        }
                                    });
                                });
                                for (let i = 0; i < newArr.length; i++) {
                                    newArr[i].new_position = i;
                                }
                                this.triggerSaveSortedCategories(newArr);
                            }}
                        >
                            {renderItems}
                        </Sortable>
                    </Spin>
                </div>
            </div>
        );
    }
}

export default CategoriesManagementComponent;
