import { Layout, Table, Button, message, Form, Modal } from "antd";
import styled from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import UpdateProfileForm from "../Forms/UpdateProfileForm";

const { Content } = Layout;

const ProfilesContent = styled(Content)`
  position: fixed;
  height:100%;
  width:100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const ProfilesManager = () => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [updateProfileForm] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/admin/allusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userName) => {
      const response = await fetch(`http://localhost:8080/admin/delete/${userName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        message.error(errorText || "Failed to delete user");
        throw new Error(errorText);
      }
    },
    onSuccess: () => {
      message.success("User deleted successfully!");
      refetch(); 
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch("http://localhost:8080/admin/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const errorText = await response.text();
        message.error(errorText || "Failed to update profile");
        throw new Error(errorText);
      }

      return response.text();
    },
    onSuccess: () => {
      message.success("Profile updated successfully!");
      setOpenUpdateProfile(false);
      refetch(); 
    },
  });

  const handleDeleteUser = async (userName) => {
    await deleteMutation.mutateAsync(userName);
  };

  const handleUpdateProfile = (user) => {
    setSelectedUser(user);
    updateProfileForm.setFieldsValue({
      emailId: user.emailId,
    });
    setOpenUpdateProfile(true);
  };

  const handleUpdate = async () => {
    const values = await updateProfileForm.validateFields();
    if (!selectedUser) return;

    let updatePayload = { userName: selectedUser.userName, ...values };

    await updateMutation.mutateAsync(updatePayload);
    updateProfileForm.resetFields();
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <>
          <Button type="primary" onClick={() => handleUpdateProfile(user)} style={{ marginRight: 8 }}>
            <UserOutlined /> Update
          </Button>
          <Button type="primary" danger onClick={() => handleDeleteUser(user.userName)}>
            <DeleteOutlined /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <ProfilesContent>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="userName"
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        bordered
      />

      <Modal
        title="Update Profile"
        open={openUpdateProfile}
        onOk={handleUpdate}
        onCancel={() => setOpenUpdateProfile(false)}
        okText="Update"
        centered
      >
        <UpdateProfileForm form={updateProfileForm} />
      </Modal>
    </ProfilesContent>
  );
};

export default ProfilesManager;
