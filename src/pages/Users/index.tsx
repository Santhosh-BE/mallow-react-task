import React, { useEffect, useState } from "react";
import { Tabs, Input, Button, Row, Col, message, Flex, Grid } from "antd";
import { TableOutlined, IdcardOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import UserLists from "./UserLists";
import UserCards from "./UserCards";
import UserForm from "./UserForm";
import { userAction, createUserAction } from "../../redux/actions/UserActions";
import { filterUsersAction, resetSearchAction } from "../../redux/actions/UserActions";
import CommonModal from "../../components/CommonModal/CommonModal";
import { UserState } from "../../types/UserTypes";

const { useBreakpoint } = Grid;
const Users: React.FC = () => {
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const userData = useSelector((state: { User: UserState }) => state.User);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(userAction(userData.page, userData.per_page) as any);
    }, [dispatch, userData.page, userData.per_page]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreateUser = async (values: Partial<NonNullable<UserState["selectedUser"]>>) => {
        setCreateLoading(true);
        try {
            const result = await dispatch(createUserAction(values as Omit<NonNullable<UserState["selectedUser"]>, "id">) as any);
            if (result.success) {
                message.success("User created successfully!");
                setIsModalVisible(false);
                dispatch(userAction(userData.page, userData.per_page) as any);
            } else {
                message.error(result.message || "Failed to create user");
            }
        } catch (error) {
            message.error("Failed to create user");
        } finally {
            setCreateLoading(false);
        }
    };

    const handleSearch = () => {
        if (userData.originalData) {
            dispatch(filterUsersAction(searchQuery, userData.originalData) as any);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        dispatch(resetSearchAction() as any);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    const getContainerPadding = () => {
        if (screens.xs) return "16px";
        if (screens.sm) return "20px";
        return "32px";
    };

    const getContentPadding = () => {
        if (screens.xs) return "16px 16px 12px 16px";
        if (screens.sm) return "24px 24px 16px 24px";
        return "32px 32px 24px 32px";
    };

    return (
        <div style={{ background: "#f5f7fa", padding: getContainerPadding() }}>
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    padding: getContentPadding(),
                }}
            >
                <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
                    <Col>
                        <div style={{ fontSize: 22, fontWeight: 600 }}>Users</div>
                    </Col>
                    <Col>
                        <Flex gap="middle" align="start">
                            <Input
                                placeholder="Search users..."
                                style={{ width: 220 }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                suffix={<SearchOutlined style={{ color: searchQuery ? "#1890ff" : "#ccc", cursor: "pointer" }} onClick={handleSearch} />}
                            />
                            {searchQuery && (
                                <Button type="link" onClick={handleClearSearch} style={{ marginRight: 16 }}>
                                    Clear
                                </Button>
                            )}
                            <Button type="primary" onClick={showModal}>
                                Create User
                            </Button>
                        </Flex>
                    </Col>
                </Row>
                <Tabs
                    defaultActiveKey="table"
                    type="card"
                    tabBarStyle={{ marginBottom: 24 }}
                    items={[
                        {
                            key: "table",
                            label: (
                                <span>
                                    <TableOutlined style={{ marginRight: 8 }} /> Table
                                </span>
                            ),
                            children: <UserLists />,
                        },
                        {
                            key: "card",
                            label: (
                                <span>
                                    <IdcardOutlined style={{ marginRight: 8 }} /> Card
                                </span>
                            ),
                            children: <UserCards />,
                        },
                    ]}
                />
            </div>
            <CommonModal title="Create User" visible={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
                <UserForm onFinish={handleCreateUser} onCancel={handleCancel} loading={createLoading} />
            </CommonModal>
        </div>
    );
};

export default Users;
