import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const EventHeading = ({ idx, data, handleOnChange }) => {
  const eventHeadingId = `heading-${idx}`;

  const refInput = useRef();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { current } = refInput;
    console.log(current, "<======= USE REF");

    // if (current.state.value) {
    //     setDisabled(true);
    // }

    return () => {};
  }, []);

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
        ref={refInput}
        //disabled={disabled}
      />
    </div>
  );
};

EventHeading.propTypes = {
  idx: PropTypes.number,
  data: PropTypes.array,
  handleOnChange: PropTypes.func
};

export default EventHeading;
