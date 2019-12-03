import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Button, Spin, Modal, message } from "antd";
import { useDrop } from "react-dnd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import SubCategoryItem from "./SubCategoryItem";
import update from "immutability-helper";
import ItemTypes from "./ItemTypes";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions
import {
    fetchSubCategories,
    addSubCategory
} from "../../redux/actions/post-management-actions/postManagementActions";

// Add subcategoryForm
import AddSubCategoryForm from "./AddSubCategoryForm";

const style = {
    width: 400,
    marginTop: 30
};

// Component
const SubCategory = ({
    auth,
    fetchSubCategories,
    notification,
    postManagement
}) => {
    const [cards, setCards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchSubCategories();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        switch (notification.id) {
            case "FETCH_SUBCATEGORIES_SUCCESS":
                setCards(postManagement.subCategories.results);
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
        let val = "[10, 11], [11, 10], [12, 12], [13, 13]";

        axios({
            url: `${API}/sub-categories/sort`,
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
                        : "Subcategories successfully sorted"
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
        const card = cards.filter(c => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card)
        };
    };
    const [, drop] = useDrop({ accept: ItemTypes.CARD });

    // show add category modal
    const showAddSubCategoryModal = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Row>
                <Button type="primary" onClick={showAddSubCategoryModal}>
                    Add Subcategory
                </Button>
                <Spin spinning={postManagement.requestInProgress}>
                    <table ref={drop} style={style}>
                        <thead>
                            <tr>
                                <th>Subcategory Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards
                                ? cards.map(card => (
                                      <SubCategoryItem
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
                    title="New Subcategory"
                    visible={modalVisible}
                    className="modal-form"
                >
                    <AddSubCategoryForm handleModalClose={handleModalClose} />
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
    { fetchSubCategories }
)(SubCategory);
