import React, { Component, Fragment } from "react";
import { Select, Spin, Button, Icon } from "antd";
import { connect } from "react-redux";

import Sortable from "react-sortablejs";

import {
  fecthClinicalTrialsArticles,
  setClinicalTrialsArticle,
  addItemClinicalTrialsArticle,
  deleteClinicalTrialsDndItem,
  saveSortedClinicalTrials
} from "../../../../redux/actions/product-management-actions/clinical-trials-productmanagement.actions";

import { setProductDirty } from "../../../../redux/actions/centralize-functionality-actions/centralize-functionality.actions";

const { Option } = Select;

class ClinicalTrialsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedItem: null,
      dndList: [],
      prevDndList: [],
      MANUAL_CHECK_NO_SELECTED: false,
      tabKeyPrev: null
    };
    this.onSelectItem = this.onSelectItem.bind(this);
    this.handleSaveSelectedArticle = this.handleSaveSelectedArticle.bind(this);
    this.handleDeleteClinicalTrialsDndItem = this.handleDeleteClinicalTrialsDndItem.bind(
      this
    );
    this.handleSaveSortedClinicalTrials = this.handleSaveSortedClinicalTrials.bind(
      this
    );
  }

  // NEW: componentWillReceiveprops()
  static getDerivedStateFromProps(props, state) {
    if (
      props.dndList !== state.prevDndList ||
      props.tabKey !== state.tabKeyPrev
    ) {
      // reset selected articles
      if (props.tabKey.toString().indexOf("clinical") !== -1) {
        props.setClinicalTrialsArticle("");
      }
      return {
        prevDndList: props.dndList,
        dndList: props.dndList,
        tabKeyPrev: props.tabKey,
        // resets
        addedItem: null,
        MANUAL_CHECK_NO_SELECTED: false
      };
    }
    return null;
  }

  componentDidMount() {
    // mount
    this.props.fecthClinicalTrialsArticles(this.props.id);
  }

  componentWillUnmount() {
    // unmount
  }

  handleSaveSortedClinicalTrials(productId, payload) {
    const mutated = payload.map(item => {
      const clone = Object.assign({}, item);
      delete clone.product_id;
      delete clone.article_id;
      delete clone.page_title;
      delete clone.sort;
      return clone;
    });
    console.log(JSON.stringify(mutated, null, 4));
    this.props.saveSortedClinicalTrials(productId, mutated);
  }

  handleSaveSelectedArticle() {
    if (this.state.addedItem) {
      // set to global store
      this.props.setClinicalTrialsArticle("");
      // set to server
      this.props.addItemClinicalTrialsArticle(
        this.state.addedItem,
        this.props.id
      );
      // set to local state
      this.setState({
        addedItem: null
      });
    } else {
      this.setState({
        MANUAL_CHECK_NO_SELECTED: true
      });
    }

    this.props.setProductDirty({ dirty: true });
  }

  handleDeleteClinicalTrialsDndItem(clinicalTrialId) {
    this.props.deleteClinicalTrialsDndItem(this.props.id, clinicalTrialId);
  }

  onSelectItem(item) {
    const compose = {
      product_id: this.props.id,
      page_title: item.page_title,
      article_id: item.id
    };
    const payload = {
      clinical_trials: [compose]
    };
    this.setState({
      addedItem: payload
    });
  }

  render() {
    const { dndList } = this.state;
    const { loader } = this.props;

    const options = this.props.articles.map(d => (
      <Option key={d.id} disabled={d.flag}>
        {d.page_title}
      </Option>
    ));

    // const options = [];

    const renderItems = dndList.map((clinicalTrial, idx) => (
      <div key={idx} data-id={clinicalTrial.sort} className="dnd-table">
        <div className="grid-left">
          <div className="ant-form-item-control">
            <div className="dnd-content-wrapper">
              <span className="dnd-icon" style={{ color: "#aaa" }}>
                <Icon type="drag" />
              </span>
              <p className="dnd-content">{clinicalTrial.page_title}</p>
            </div>
          </div>
        </div>
        <div className="grid-right">
          <div
            className="dnd-btn-wrapper"
            style={{ justifyContent: "flex-end" }}
          >
            <Button
              type="danger"
              onClick={() => {
                this.handleDeleteClinicalTrialsDndItem(clinicalTrial.id);
              }}
            >
              <Icon type="delete" />
            </Button>
          </div>
        </div>
      </div>
    ));

    return (
      <Fragment>
        <h3>Select Articles</h3>
        <br />

        <div className="clinical-trials-editor">
          <div className="custom-wrapper">
            <Select
              defaultActiveFirstOption={false}
              value={this.props.selectedArticle.toString()}
              onChange={id => {
                this.props.setClinicalTrialsArticle(id.toString());
                this.setState(
                  {
                    MANUAL_CHECK_NO_SELECTED: false
                  },
                  () => {
                    const found = this.props.articles.filter(
                      article => +article.id === +id
                    )[0];
                    this.onSelectItem(found);
                  }
                );
              }}
              style={{ width: "500px" }}
              // locale={{ emptyText: "No data found" }}
              // placeholder="Plese select an article"
              // optionLabelProp="page_title"
            >
              {options}
            </Select>
            <div
              className={
                "ant-form-item-control " +
                (this.state.MANUAL_CHECK_NO_SELECTED ? "has-error" : "")
              }
            >
              {(this.state.MANUAL_CHECK_NO_SELECTED && (
                <div className="ant-form-explain">
                  {"No article has been selected."}
                </div>
              )) || <div></div>}
            </div>
          </div>

          <div className="custom-wrapper">
            <Button type="primary" onClick={this.handleSaveSelectedArticle}>
              Select Article
            </Button>
          </div>
        </div>

        <br />

        {(this.state.dndList.length && (
          <div className="dnd-wrapper" style={{ maxWidth: "100%" }}>
            <Spin spinning={loader}>
              <Sortable
                tag={"div"}
                onChange={(order, sortable, evt) => {
                  const newArr = [];
                  order.forEach(newSequence => {
                    this.state.dndList.forEach(clinicalTrial => {
                      if (+clinicalTrial.sort === +newSequence) {
                        newArr.push(clinicalTrial);
                      }
                    });
                  });

                  for (let i = 0; i < newArr.length; i++) {
                    newArr[i].new_position = i;
                  }

                  this.setState({
                    dndList: newArr
                  });

                  this.handleSaveSortedClinicalTrials(this.props.id, newArr);
                }}
              >
                {renderItems}
              </Sortable>
            </Spin>
          </div>
        )) || <span></span>}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.clinicalTrialsProductManagementReducers.articles,
  selectedArticle:
    state.clinicalTrialsProductManagementReducers.selectedArticle,
  dndList: state.clinicalTrialsProductManagementReducers.dndList,
  loader: state.clinicalTrialsProductManagementReducers.loader
});

const mapDispatchToProps = {
  fecthClinicalTrialsArticles,
  setClinicalTrialsArticle,
  addItemClinicalTrialsArticle,
  deleteClinicalTrialsDndItem,
  saveSortedClinicalTrials,
  setProductDirty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicalTrialsComponent);

/*
article_id: 9
id: 21
page_title: "Combination therapy in patients with type 2 diabetes"
product_id: 3
sort: 21
 */
