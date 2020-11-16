import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, message } from "antd";

// redux actions
import {
    addSubCategory,
    fetchSubCategories
} from "../../redux/actions/post-management-actions/postManagementActions";

// Smart form component
import TextFormField from "../smart-form/TextFormField";

const schema = Yup.object().shape({
    name: Yup.string()
        // .min(1, "Subcategory name is too short")
        // .max(50, "Subcategory name is too long")
        .required("This field is required")
});

const AddSubCategoryForm = ({
    notification,
    addSubCategory,
    postManagement,
    fetchSubCategories,
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef();

    const data = {
        name: ""
    };

    const submitForm = (values, action) => {
        action.setSubmitting(true);
        addSubCategory(values);
    };

    const handleReset = resetForm => {
        resetForm();
        props.handleModalClose();
    };

    useEffect(() => {
        switch (notification.id) {
            case "ADD_SUBCATEGORY_FAILED":
                setLoading(false);
                message.error(
                    notification.notifications
                        ? notification.notifications.error
                        : null
                );
                break;
            case "ADD_SUBCATEGORY_SUCCESS":
                props.handleModalClose();
                setLoading(false);
                message.success(
                    notification.notifications
                        ? notification.notifications.success
                        : null
                );
                fetchSubCategories();
                break;
            default:
                return;
        }
        // eslint-disable-next-line
    }, [notification.id, notification.notifications]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={data}
            onSubmit={submitForm}
            validationSchema={schema}
            onReset={handleReset}
        >
            {props => (
                <Form ref={formRef}>
                    <TextFormField
                        name="name"
                        type="text"
                        label="Subcategory name"
                        requiredlabel={"true"}
                        placeholder="Enter a subcategory name"
                    />
                    <div className="modal-form-footer">
                        <Button
                            onClick={handleReset.bind(null, props.resetForm)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = state => {
    return {
        notification: state.notificationReducer,
        postManagement: state.postManagementReducer
    };
};

export default connect(
    mapStateToProps,
    { addSubCategory, fetchSubCategories }
)(AddSubCategoryForm);
