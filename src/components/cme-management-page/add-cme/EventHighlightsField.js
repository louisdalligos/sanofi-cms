import React, { useEffect } from "react";
import { Form, Field, FieldArray } from "formik";

const EventHighlightsField = ({
  name,
  move,
  swap,
  remove,
  push,
  insert,
  unshift,
  pop,
  form,
  ...props
}) => {
  useEffect(() => {
    console.log();
    return () => {};
  }, []);

  return (
    <div></div>
    // <div>
    //     {data && data.length > 0 ? (
    //         data.map((item, index) => (
    //             <div key={index}>
    //                 <Field name={`data.${index}`} />
    //                 <button
    //                     type="button"
    //                     onClick={() => remove(index)} // remove a item from the list
    //                 >
    //                     -
    //                 </button>
    //                 <button
    //                     type="button"
    //                     onClick={() => insert(index, "")} // insert an empty string at a position
    //                 >
    //                     +
    //                 </button>
    //             </div>
    //         ))
    //     ) : (
    //         <button type="button" onClick={() => push("")}>
    //             {/* show this when user has removed all item from the list */}
    //             Add a friend
    //         </button>
    //     )}
    // </div>
  );
};

export default EventHighlightsField;
