import React, { useEffect, Fragment } from "react";
import { Table, Tooltip, Button, Icon, Modal, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { noImage } from "../../../utils/constant";
// redux actions
import {
    deleteEventHeadingVideo,
    fetchCurrentEvent,
    setSelectedVideo
} from "../../../redux/actions/cme-actions/cmeActions";

const { confirm } = Modal;

const VideoListTable = ({
    deleteEventHeadingVideo,
    setSelectedVideo,
    fetchCurrentEvent,
    currentEvent,
    notifs,
    loading,
    ...props
}) => {
    const columns = [
        {
            title: "Title",
            dataIndex: "video_title",
            rowKey: "id",
            render: (text, record) => (
                <Fragment>
                    <img
                        src={
                            record.video_thumbnail_url
                                ? record.video_thumbnail_url
                                : noImage
                        }
                        alt=""
                        style={{ width: 70, marginRight: 10 }}
                    />
                    {record.video_title}
                </Fragment>
            )
        },
        {
            title: "Description",
            dataIndex: "video_description",
            rowKey: "id"
        },
        {
            title: "Actions",
            rowKey: "id",
            render: (text, record) => (
                <Fragment>
                    <Tooltip placement="right" title="Edit the video">
                        <Button
                            type="primary"
                            onClick={e => showEditModal(record.id, e)}
                            style={{ marginRight: 10 }}
                        >
                            <Icon type="edit" /> Edit
                        </Button>
                    </Tooltip>
                    <Tooltip placement="right" title="Delete this video?">
                        <Button
                            type="danger"
                            onClick={e => showDeleteConfirm(record.id, e)}
                        >
                            <Icon type="delete" />
                        </Button>
                    </Tooltip>
                </Fragment>
            )
        }
    ];

    // table actions
    function showDeleteConfirm(id, e) {
        e.stopPropagation();

        confirm({
            title: "Are you sure you want to delete this video?",
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            onOk() {
                console.log(id);
                deleteEventHeadingVideo(id); // redux action
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    function showEditModal(id, e) {
        e.stopPropagation();

        let selectedVideoObj = props.videosData.find(item => {
            if (item.id === id) {
                return {
                    id: id,
                    event_section_id: item.event_section_id,
                    video_description: item.video_description,
                    video_embed: item.video_embed,
                    video_title: item.video_title
                };
            }
        });
        props.handleModal(id);
        console.log(selectedVideoObj, "<--------------VIDEO DATA");
        // redux action set selected video
        setSelectedVideo(selectedVideoObj);
    }

    return (
        <Table
            columns={columns}
            loading={currentEvent.requestInProgress}
            rowKey={record => record.id}
            dataSource={props.videosData}
            pagination={false}
            size="small"
            locale={{ emptyText: "No results found" }}
        />
    );
};

const mapStateToProps = state => {
    return {
        currentEvent: state.cmeReducer.currentEvent,
        notifs: state.notificationReducer,
        loading: state.cmeReducer.requestInProgress
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            deleteEventHeadingVideo: deleteEventHeadingVideo,
            fetchCurrentEvent: fetchCurrentEvent,
            setSelectedVideo: setSelectedVideo
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoListTable);
