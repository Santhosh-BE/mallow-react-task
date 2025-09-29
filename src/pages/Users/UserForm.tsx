import React, { useEffect, useRef } from "react";
import { Form, Row, Col, Typography } from "antd";
import CommonInput from "../../components/CommonInput/CommonInput";
import CommonButton from "../../components/CommonButton/CommonButton";
import { User, UserFormProps } from "../../types/UserTypes";

const { Title } = Typography;

const UserForm: React.FC<UserFormProps> = ({ onFinish, initialValues, isEditing = false, onCancel, loading = false }) => {
    const [form] = Form.useForm();
    const prevInitialValues = useRef<Partial<User> | undefined>(undefined);

    useEffect(() => {
        if (initialValues && prevInitialValues.current !== initialValues) {
            form.setFieldsValue(initialValues);
            prevInitialValues.current = initialValues;
        } else if (!initialValues && prevInitialValues.current) {
            form.resetFields();
            prevInitialValues.current = undefined;
        }
    }, [initialValues, form]);

    return (
        <div style={{ padding: "20px 0" }}>
            <Title level={4}>{isEditing ? "Edit User" : "Create User"}</Title>
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CommonInput
                            name="first_name"
                            label="First Name"
                            placeholder="Enter first name"
                            rules={[{ required: true, message: "Please enter first name" }]}
                        />
                    </Col>
                    <Col span={12}>
                        <CommonInput
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter last name"
                            rules={[{ required: true, message: "Please enter last name" }]}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <CommonInput
                            name="email"
                            label="Email"
                            placeholder="Enter email"
                            rules={[
                                { required: true, message: "Please enter email" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                        />
                    </Col>
                </Row>
                {!isEditing && (
                    <Row gutter={16}>
                        <Col span={24}>
                            <CommonInput
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                rules={[{ required: true, message: "Please enter password" }]}
                            />
                        </Col>
                    </Row>
                )}
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                            <CommonButton htmlType="button" onClick={onCancel} disabled={loading}>
                                Cancel
                            </CommonButton>
                            <CommonButton htmlType="submit" variant="primary" loading={loading} style={{ width: "80px" }}>
                                {isEditing ? "Update" : "Create"}
                            </CommonButton>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default UserForm;
