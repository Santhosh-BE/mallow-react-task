import React, { useEffect, useState } from "react";
import { Card, Checkbox, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CommonInput from "../components/CommonInput/CommonInput";
import CommonButton from "../components/CommonButton/CommonButton";
import { auth } from "../redux/actions/AuthActions";
import { ROUTE } from "../constants/Common";
import { LoginFormData } from "../types/LoginTypes";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        localStorage.clear();
    }, []);
    const onFinish = async (values: LoginFormData) => {
        setLoading(true);
        try {
            const result = await dispatch(auth(values) as any);
            if (result?.success) {
                navigate(ROUTE.USERS);
            } else {
                messageApi.error(result?.message || "Login failed. Please try again.");
            }
        } catch (error: unknown) {
            messageApi.error((error as any)?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ background: "#e5e5e5", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100%", minHeight: "100vh" }}>
                <Card style={{ width: 400, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <Form onFinish={onFinish} layout="vertical">
                        <CommonInput
                            name="username"
                            icon={<UserOutlined style={{ color: "#bfbfbf" }} />}
                            iconPosition="left"
                            placeholder="eve.holt@reqres.in"
                            size="large"
                            autoComplete="username"
                            rules={[
                                { required: true, message: "Username is required" },
                                { type: "email", message: "Please enter a valid email address" },
                            ]}
                        />

                        <CommonInput
                            name="password"
                            icon={<LockOutlined style={{ color: "#bfbfbf" }} />}
                            iconPosition="left"
                            placeholder="Password"
                            size="large"
                            autoComplete="current-password"
                            type="password"
                            rules={[
                                { required: true, message: "Password is required" },
                                { min: 6, message: "Password must be at least 6 characters" },
                                { max: 100, message: "Password must be at most 100 characters" },
                            ]}
                        />

                        <Form.Item name="rememberMe" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <CommonButton variant="primary" size="large" block htmlType="submit" style={{ fontWeight: 500 }} loading={loading}>
                            Log in
                        </CommonButton>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Login;
