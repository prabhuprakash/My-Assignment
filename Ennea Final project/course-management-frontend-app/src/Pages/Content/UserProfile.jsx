import { Layout, Card, Button, List, Typography, Space, message, Form, Modal } from "antd";
import styled from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { SignInContext } from "../../Context/SignInContextProvider";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import  UpdateProfileForm  from "../Forms/UpdateProfileForm";

const { Content } = Layout;
const { Title, Text } = Typography;

const UserProfileContent = styled(Content)`
  position: fixed;
  margin: 0%;
  padding: 0%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const UserProfileCard = styled(Card)`
  padding: 20px;
  text-align: center;
`;

const UserProfile = () => {
  const [openUpdateProfile,setOpenUpdateProfile] = useState(false);
  const [updateProfileForm] = Form.useForm();
  const { setSignInState } = useContext(SignInContext);
  const navigate = useNavigate();
  
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['enrolledcourses'],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/user/enrolledcourses",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 204) {
        return [];
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch courses");
      }
    
      return response.json();
    },
    retry:2,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:8080/user/deleteaccount`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        if(response.status==204)
          message.warning("User doest exist!");
        else
          message.error(errorText || "Failed to delete account");
      }
      return response.text();
    },
    onSuccess: () => {
      message.success("Account deleted successfully!");
      setSignInState(false);
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("emailId");
      localStorage.removeItem("token");
      navigate("/");     
    },    
  });
  const handleDeleteAccount = async () => {
    await deleteMutation.mutateAsync();
  };

  const handleUpdateProfile = async () => {
    updateProfileForm.setFieldsValue({
      emailId: localStorage.getItem("emailId"),
    })
    setOpenUpdateProfile(true);
  };

  const updateMutation = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch("http://localhost:8080/user/updateprofile", {
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
    onSuccess: (data, variables) => {
      message.success("Profile updated successfully!");

      if (variables.userName) localStorage.setItem("user", variables.userName);
      if (variables.emailId) localStorage.setItem("emailId", variables.emailId);

      setOpenUpdateProfile(false);
    },
  });

  const handleUpdate = async () => {
    const values = await updateProfileForm.validateFields();

    const storedEmail = localStorage.getItem("emailId") || "";

    let updatePayload = {};

    if (values.emailId && values.emailId !== storedEmail) {
      updatePayload.emailId = values.emailId;
    }
    if (values.password && values.password.trim() !== "") {
      updatePayload.password = values.password;
    }
    if (Object.keys(updatePayload).length === 0) {
      message.info("No changes detected.");
      return;
    }
    await updateMutation.mutateAsync(updatePayload);
    updateProfileForm.resetFields();
  };
  return (
      <UserProfileContent>
        <UserProfileCard>
          <Title level={3}>User Profile</Title>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Username:</Text>
            <Text>{localStorage.getItem("user")}</Text>
            <Text strong>Email:</Text>
            <Text>{localStorage.getItem("emailId")}</Text>
            <Button type="primary" onClick={handleUpdateProfile}>
              <UserOutlined /> Update Profile
            </Button>
            <Title level={5} style={{ marginTop: 20 }}>Enrolled Courses</Title>
            <List
              bordered
              style={{ width: 500 }}
              dataSource={courses} 
              renderItem={(course) => (
                <List.Item>
                  <strong>{course.id}</strong>: {course.name}
                </List.Item>
              )}
            />
            <Button type="primary" danger onClick={handleDeleteAccount}>
            <DeleteOutlined /> Delete Account
            </Button>
          </Space>
        </UserProfileCard>
        <Modal
          title="Update Profile"
          open={openUpdateProfile}
          onOk={handleUpdate}
          onCancel={()=>setOpenUpdateProfile(false)}
          okText='Update'
          centered={true}  
        >
          <UpdateProfileForm form={updateProfileForm}/>
        </Modal>
      </UserProfileContent> 
  );
};

export default UserProfile;
