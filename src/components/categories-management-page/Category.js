import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Button, Spin, Modal, message } from "antd";
import { useDrop } from "react-dnd";

import CategoryItem from "./CategoryItem";
import update from "immutability-helper";
import ItemTypes from "./ItemTypes";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions
import { fetchCategories } from "../../redux/actions/post-management-actions/postManagementActions";

// Add categoryForm
import AddCategoryForm from "./AddCategoryForm";

const style = {
    width: 400,
    marginTop: 30
};

// Component
const Category = ({ auth, fetchCategories, notification, postManagement }) => {
    const [cards, setCards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchCategories();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        switch (notification.id) {
            case "FETCH_CATEGORIES_SUCCESS":
                setCards(postManagement.categories.results);
                break;
            default:
                return;
        }
        // eslint-disable-next-line
    }, [notification.id, notification.notifications]);

    const moveCard = (id, atIndex) => {
        const { card, index } = findCard(id);
        setCards(
            update(cards, {
                $splice: [[index, 1], [atIndex, 0, card]]
            })
        );

        console.log("ID: ", id, "Index: ", atIndex);
        console.log("card item", card);

        //let val = {[parseInt(id), atIndex + 1]};
        let val = "[1, 2], [2, 1], [3, 3], [5, 4], [13, 5], [14, 6]";

        axios({
            url: `${API}/categories/sort`,
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.access_token}`
            },
            data: val
        })
            .then(res => {
                console.log(res);
                message.success(
                    res.data
                        ? res.data.success
                        : "Categories successfully sorted"
                );
                console.log("cards on move new state", cards);
            })
            .catch(err => {
                console.log(err);
                message.error(
                    err.response.data.error
                        ? err.response.data.error
                        : "Oops! Something went wrong!"
                );
            });
    };
    const findCard = id => {
        console.log(id, "id");
        const card = cards.filter(c => `${c.id}` === id)[0];

        return {
            card,
            index: cards.indexOf(card)
        };
    };
    const [, drop] = useDrop({ accept: ItemTypes.CARD });

    // show add category modal
    const showAddCategoryModal = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Row>
                <Button type="primary" onClick={showAddCategoryModal}>
                    Add Category
                </Button>
                <Spin spinning={postManagement.requestInProgress}>
                    <table ref={drop} style={style}>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards
                                ? cards.map(card => (
                                      <CategoryItem
                                          key={card.id}
                                          id={`${card.id}`}
                                          name={card.name}
                                          moveCard={moveCard}
                                          findCard={findCard}
                                          auth={auth}
                                      />
                                  ))
                                : "No results found"}
                        </tbody>
                    </table>
                </Spin>

                <Modal
                    title="New Category"
                    visible={modalVisible}
                    className="modal-form"
                >
                    <AddCategoryForm handleModalClose={handleModalClose} />
                </Modal>
            </Row>
        </>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
        notification: state.notificationReducer,
        postManagement: state.postManagementReducer
    };
};

export default connect(
    mapStateToProps,
    { fetchCategories }
)(Category);
