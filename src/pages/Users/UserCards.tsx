import React, { useState } from "react";
import { Row, Col, Avatar, Pagination, message } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "./UserForm";
import { userAction, deleteUserAction, updateUserAction } from "../../redux/actions/UserActions";
import CommonCard from "../../components/CommonCard/CommonCard";
import CommonModal from "../../components/CommonModal/CommonModal";
import { UserState } from "../../types/UserTypes";

const UserCards: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, page, per_page, total } = useSelector((state: { User: UserState }) => state.User);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<UserState["selectedUser"] | null>(null);
    const [deletingUser, setDeletingUser] = useState<UserState["selectedUser"] | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handlePageChange = (current: number, pageSize: number) => {
        dispatch(userAction(current, pageSize) as any);
    };

    const showDeleteConfirm = (user: NonNullable<UserState["selectedUser"]>) => {
        setDeletingUser(user);
        setIsDeleteModalVisible(true);
    };

    const handleEdit = (user: NonNullable<UserState["selectedUser"]>) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleDelete = async () => {
        if (deletingUser) {
            setDeleteLoading(true);
            try {
                const result = await dispatch(deleteUserAction(deletingUser.id) as any);
                if (result.success) {
                    message.success("User deleted successfully!");
                    setIsDeleteModalVisible(false);
                    setDeletingUser(null);
                    // Refresh the user list
                    dispatch(userAction(page, per_page) as any);
                } else {
                    message.error(result.message || "Failed to delete user");
                }
            } catch (error) {
                message.error("Failed to delete user");
            } finally {
                setDeleteLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
        setDeletingUser(null);
    };

    const handleUpdateUser = async (values: Partial<NonNullable<UserState["selectedUser"]>>) => {
        if (editingUser) {
            setUpdateLoading(true);
            try {
                const result = await dispatch(updateUserAction(editingUser.id, values) as any);
                if (result.success) {
                    message.success("User updated successfully!");
                    setIsModalVisible(false);
                    setEditingUser(null);
                    // Refresh the user list
                    dispatch(userAction(page, per_page) as any);
                } else {
                    message.error(result.message || "Failed to update user");
                }
            } catch (error) {
                message.error("Failed to update user");
            } finally {
                setUpdateLoading(false);
            }
        }
    };

    return (
        <div style={{ padding: "32px", background: "#E5E5E5" }}>
            {data && data.length > 0 ? (
                <>
                    <Row gutter={[24, 24]}>
                        {data.map((user: NonNullable<UserState["selectedUser"]>) => (
                            <Col xs={24} sm={12} md={8} lg={8} key={user.id}>
                                <div
                                    className="user-card-wrapper"
                                    style={{ position: "relative" }}
                                    onMouseEnter={() => setHoveredCard(user.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <CommonCard
                                        hoverable
                                        shadow="always"
                                        style={{
                                            borderRadius: 12,
                                            textAlign: "center",
                                            padding: "32px 0 16px",
                                            background: "#fff",
                                            transition: "box-shadow 0.2s ease-in-out",
                                            position: "relative",
                                            alignItems: "center",
                                            overflow: "hidden",
                                        }}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <Avatar src={user.avatar} size={80} />
                                        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 4 }}>{`${user.first_name} ${user.last_name}`}</div>
                                        <div style={{ color: "#888", fontSize: 16 }}>{user.email}</div>
                                        <div
                                            className="user-card-actions"
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                background: "rgba(128,128,128,0.5)",
                                                borderRadius: 12,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: hoveredCard === user.id ? 1 : 0, // Controlled by state
                                                transition: "opacity 0.2s ease-in-out",
                                                zIndex: 2,
                                                paddingTop: 32,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 16,
                                                    marginBottom: 16,
                                                    justifyContent: "center",
                                                    pointerEvents: "auto",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: "50%",
                                                        background: "#6366f1",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <EditOutlined style={{ color: "#fff", fontSize: 24 }} />
                                                </div>
                                                <div
                                                    style={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: "50%",
                                                        background: "red",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => showDeleteConfirm(user)}
                                                >
                                                    <DeleteFilled style={{ color: "#fff", fontSize: 24 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </CommonCard>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                        <Pagination
                            current={page}
                            pageSize={per_page}
                            total={total}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={["6", "12", "18"]}
                            disabled={loading}
                        />
                    </div>
                </>
            ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "24px", color: "#999", marginBottom: "16px" }}>No Data</div>
                        <div style={{ color: "#ccc" }}>No users found</div>
                    </div>
                </div>
            )}
            <CommonModal title={editingUser ? "Edit User" : "Create User"} visible={isModalVisible} onCancel={handleCancel} footer={null} width={600} maskClosable={false}>
                <UserForm onFinish={handleUpdateUser} initialValues={editingUser || undefined} isEditing={!!editingUser} onCancel={handleCancel} loading={updateLoading} />
            </CommonModal>
            <CommonModal
                title="Confirm Delete"
                visible={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true, loading: deleteLoading }}
            >
                <p>
                    Are you sure you want to delete this user{" "}
                    {deletingUser && (
                        <strong>
                            {deletingUser.first_name} {deletingUser.last_name}
                        </strong>
                    )}
                    ?
                </p>
            </CommonModal>
        </div>
    );
};

export default UserCards;
