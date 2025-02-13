import styled from "styled-components";
import { Button, Modal, Form, message } from "antd";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { SignInContext }  from "../Context/SignInContextProvider";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons"

import CreateAccountForm from "../Pages/Forms/CreateAccountForm";
import SignInForm from "../Pages/Forms/SignInForm";

const Logo=styled.img`
  width: 40px;
  height: 40px;
  padding-top: 10px;
`;
const H1=styled.h1`
  margin: 0;
  color: #d3840e;
`;
const P= styled.p`
  color: #d3840e;
`
const TopBarItem=styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:10px;
`;

function TopBar() {
  const [openCreateAccount,setOpenCreateAccount]=useState(false);
  const [openSignIn,setOpenSignIn]=useState(false);
  
  const { SignInState, setSignInState , setEnrolledCourses } = useContext(SignInContext);

  const [form] = Form.useForm();

  const createAccountMutation = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch("http://localhost:8080/account/createaccount",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(userDetails),
      })
      const data = await response.text();
      if (!response.ok) {
        throw new Error(data);
      }
      return data;
    },
    onSuccess: () => {
      message.success("Account created successfully!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  })
  const signInMutation = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch("http://localhost:8080/account/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(userDetails),
      })
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",data.username);
      localStorage.setItem("role",data.role);
      localStorage.setItem("emailId",data.emailId);
      const enrolledString = data.enrolledcourses || ""; 
      const enrolledArray = enrolledString.split(",").map(id => id.trim()).filter(id => id);
      setEnrolledCourses(enrolledArray)
      setSignInState(true);
      message.success("Signed in successfully!");
      setOpenSignIn(false);
    },
    onError: () => {
      message.error("Sign In Failed. Invalid credentials!");
    },
  })
  const handleCreateAccount = async () => {
    const values=await form.validateFields();
    createAccountMutation.mutate(values);
    form.resetFields();
    setOpenCreateAccount(false);
  }
  const handleSignIn = async () => {
    const values=await form.validateFields();
    signInMutation.mutate(values);
    form.resetFields();
  }
  const handleSignOut = () => {
    setSignInState(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("emailId");
  }
  
  return (
    <>
      <TopBarItem>
      <Logo src="./title_image.png"/>
      <H1>Course Management</H1>
      </TopBarItem>
      {SignInState?
        <TopBarItem>
          <P>Welcome {localStorage.getItem("user")}</P>
          <Button type="link" onClick={()=>handleSignOut()}><UserOutlined /> Sign Out</Button>
        </TopBarItem>
        :
        <TopBarItem>
          <Button type="link" onClick={()=>setOpenCreateAccount(true)}> <UserAddOutlined /> Create Account</Button>
          <Button type="link" onClick={()=>setOpenSignIn(true)}><UserOutlined /> Sign In</Button>
        </TopBarItem>}
      <Modal 
        title="Create Account"
        open={openCreateAccount}
        onOk={handleCreateAccount}
        onCancel={()=>setOpenCreateAccount(false)}
        okText='Confirm'
        centered={true}  
        destroyOnClose={true}
      >
        <CreateAccountForm form={form}/>
      </Modal>
      <Modal
        title="SignIn"
        open={openSignIn}
        onOk={handleSignIn}
        onCancel={()=>setOpenSignIn(false)}
        okText='SignIn'
        centered={true}  
        destroyOnClose={true}
      >
        <SignInForm form={form}/>
      </Modal>
    </>
  )
}

export default TopBar;