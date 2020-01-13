import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Icon, Form } from "antd";

const EventHeading = ({
  idx,
  data,
  handleOnChange,
  handleRename,
  handleDelete,
  saveEntry,
  stateData,
  videoAddRef
}) => {
  const eventHeadingId = `heading-${idx}`;

  const saveButtonRef = useRef(null);
  const editButtonRef = useRef(null);
  const inputHeadingRef = useRef(null);

  useEffect(() => {
    console.log(videoAddRef, "VIDEO REF");
    stateData.filter((item, index) => {
      if (
        item.heading === "" &&
        index === inputHeadingRef.current.props["data-idx"]
      ) {
        console.log(inputHeadingRef.current.props.id);
        const currentInputAdded = inputHeadingRef.current.props.id;
        document.getElementById(`${currentInputAdded}`).disabled = false;

        document
          .getElementById(`${currentInputAdded}`)
          .classList.remove("ant-input-disabled");

        // set state for button
        document.getElementById(
          `${saveButtonRef.current.props.id}`
        ).style.display = "block";
        document.getElementById(
          `${editButtonRef.current.props.id}`
        ).style.display = "none";
      }
    });

    if (videoAddRef.current) {
      stateData.forEach((item, index) => {
        if (
          item.heading === "" &&
          index === inputHeadingRef.current.props["data-idx"]
        ) {
          document.getElementById(
            `${videoAddRef.current.props.id}`
          ).disabled = true;
        } else {
          document.getElementById(
            `${videoAddRef.current.props.id}`
          ).disabled = false;
        }
      });
    }
  }, [stateData, videoAddRef]);

  return (
    <div key={`heading-${idx}`} style={{ margin: "20px 0" }}>
      <Input
        placeholder="Please input a heading"
        type="text"
        name={eventHeadingId}
        data-idx={idx}
        data-name="heading"
        id={eventHeadingId}
        value={data[idx].heading}
        onChange={handleOnChange}
        placeholder="Enter a heading title"
        style={{ width: 400, marginRight: 30, float: "left" }}
        className="ant-input"
        ref={inputHeadingRef}
        disabled
      />

      <div
        className="headingListActions"
        style={{
          display: "flex",
          marginBottom: 20
        }}
      >
        <Button
          onClick={e =>
            handleRename(
              idx,
              e,
              inputHeadingRef.current,
              saveButtonRef.current,
              editButtonRef.current
            )
          }
          ref={editButtonRef}
          id={`button-edit-${idx}`}
          style={{ display: "block" }}
        >
          <Icon type="edit" />
        </Button>

        <Button
          type="primary"
          onClick={e => {
            saveEntry(
              idx,
              e,
              inputHeadingRef.current,
              saveButtonRef.current,
              editButtonRef.current
            );
          }}
          ref={saveButtonRef}
          id={`button-save-${idx}`}
          style={{ display: "none" }}
        >
          <Icon type="check" />
          Save
        </Button>

        <Button type="danger" onClick={e => handleDelete(idx, e)}>
          <Icon type="delete" />
        </Button>
      </div>
    </div>
  );
};

EventHeading.propTypes = {
  idx: PropTypes.number,
  data: PropTypes.array,
  handleOnChange: PropTypes.func
};

export default EventHeading;
