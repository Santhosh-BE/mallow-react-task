import React, { useState } from "react";
import { Table, Space, message, Avatar } from "antd";
import type { TableProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { userAction, updateUserAction, deleteUserAction } from "../../redux/actions/UserActions";
import CommonButton from "../../components/CommonButton/CommonButton";
import UserForm from "./UserForm";
import CommonModal from "../../components/CommonModal/CommonModal";
import { UserState } from "../../types/UserTypes";

const UserLists: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, page, per_page, total } = useSelector((state: { User: UserState }) => state.User);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<UserState["selectedUser"] | null>(null);
    const [deletingUser, setDeletingUser] = useState<UserState["selectedUser"] | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleTableChange = (pagination: Parameters<NonNullable<TableProps["onChange"]>>[0]) => {
        const { current, pageSize } = pagination;
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

    const columns = [
        {
            title: "",
            dataIndex: "avatar",
            key: "avatar",
            render: (text: string, record: NonNullable<UserState["selectedUser"]>) => (
                <Space>
                    <Avatar size={50} src={record.avatar} style={{ objectFit: "cover" }} />
                    <span>{`${record.first_name} ${record.last_name}`}</span>
                </Space>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
        },

        {
            title: "Actions",
            key: "actions",
            render: (record: NonNullable<UserState["selectedUser"]>) => (
                <Space>
                    <CommonButton htmlType="button" onClick={() => handleEdit(record)} disabled={loading}>
                        Edit
                    </CommonButton>
                    <CommonButton htmlType="button" color="#FF4D4F" onClick={() => showDeleteConfirm(record)} disabled={loading}>
                        Delete
                    </CommonButton>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%", overflow: "auto" }}>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={
                        data && data.length > 0
                            ? {
                                  current: page,
                                  pageSize: per_page,
                                  total: total,
                                  showSizeChanger: true,
                                  pageSizeOptions: ["6", "12", "18"],
                              }
                            : false
                    }
                    scroll={{ x: "max-content", y: 55 * 5 }}
                    loading={loading}
                    onChange={handleTableChange}
                    rowKey="id"
                />
            </Space>
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

export default UserLists;
