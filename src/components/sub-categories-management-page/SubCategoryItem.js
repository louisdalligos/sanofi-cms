import React, { useState } from "react";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { Button, Icon, Input, message, Modal } from "antd";
import ItemTypes from "./ItemTypes";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions
import { fetchSubCategories } from "../../redux/actions/post-management-actions/postManagementActions";

const style = {
    border: "1px solid #CCC",
    backgroundColor: "white",
    cursor: "move"
};

const tdStyle = {
    padding: "0.5rem"
};

const { confirm } = Modal;

const SubCategoryItem = ({
    id,
    name,
    moveCard,
    findCard,
    auth,
    fetchSubCategories
}) => {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, originalIndex },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        }
    });
    const opacity = isDragging ? 0 : 1;

    const [isEditing, setIsEditing] = useState(false);
    const [item, setItem] = useState({ name: name ? name : null });

    // Table actions
    function showDeleteConfirm(id, e) {
        e.stopPropagation();

        confirm({
            title: "Are you sure you want to delete this subcategory?",
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            onOk() {
                deleteSubCategoryItem(id);
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    const deleteSubCategoryItem = id => {
        console.log(id);

        axios({
            url: `${API}/sub-categories/delete/${id}`,
            method: "delete",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.access_token}`
            }
        })
            .then(function(res) {
                console.log(res);
                message.success(res.data ? res.data.success : null);
                fetchSubCategories();
            })
            .catch(function(err) {
                console.log(err.response.data);
                message.error(
                    err.response.data.error
                        ? err.response.data.error
                        : "There was an error in processing your request"
                );
            });
    };

    function editCategoryItem(e) {
        e.stopPropagation();
        setIsEditing(true);
        console.log(e.target);
    }

    function updateCategoryItem(id, e) {
        e.stopPropagation();
        console.log(id);
        setIsEditing(false);

        axios({
            url: `${API}/sub-categories/update/${id}`,
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.access_token}`
            },
            data: item
        })
            .then(function(res) {
                console.log(res);
                message.success(res.data ? res.data.success : null);
            })
            .catch(function(err) {
                console.log(err.response.data);
                message.error(err.response.data.error);
            });
    }

    const handleChange = e => {
        console.log(e.target.value);
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    return (
        <tr ref={node => drag(drop(node))} style={{ ...style, opacity }}>
            <td style={{ ...tdStyle }}>
                <Input
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </td>
            <td style={{ ...tdStyle }}>
                {isEditing ? (
                    <Button
                        type="primary"
                        size="small"
                        onClick={e => updateCategoryItem(id, e)}
                        style={{ marginRight: 10 }}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        type={isEditing ? "success" : "primary"}
                        size="small"
                        onClick={e => editCategoryItem(e)}
                        style={{ marginRight: 10 }}
                    >
                        Edit
                    </Button>
                )}

                <Button
                    type="danger"
                    size="small"
                    onClick={e => showDeleteConfirm(id, e)}
                >
                    <Icon type="delete" />
                </Button>
            </td>
        </tr>
    );
};

const mapStateToProps = state => {
    return {};
};

export default connect(
    mapStateToProps,
    { fetchSubCategories }
)(SubCategoryItem);
