import {
  CarTwoTone,
  HomeTwoTone
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogInContext } from "../../Context/LoginContextProvider";

const { Sider, Content } = Layout;

const ContentSider = styled(Sider)`
  background-color: #a2bfc9;
  position: fixed;
  top: 64px;
  bottom: 0px;
  left: 0;
  width:200px;
`;

const ContentContent =styled(Content)`
  position: fixed;
  top: 64px;
  bottom: 0px;
  left:200px;
  right:0;
  
`;

const ContentMenu = styled(Menu)`
  background-color: inherit;
  margin-top: 20px;
`;

const ContentPages = styled(Layout)`
`;



export default function Contents() {
  const [selectedKey, setSelectedKey] = useState(""); // Default selected key
  const { logInState } = useContext(LogInContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "home", label: "Home", path: "/", icon: <HomeTwoTone twoToneColor="#1890ff" /> },
    logInState.type === "LogIn"&&{ key: "carRents", label: "Car Rents", path: "/carRents", icon: <CarTwoTone twoToneColor="#13c2c2" /> },
    logInState.type === "LogIn"&&{ key: "rentedCars", label: "Rented Cars", path: "/rentedCars", icon: <CarTwoTone twoToneColor="#faad14" /> },
  ];
  
  useEffect(() => {
    if(logInState.type==="LogOut"){
      const activeItem = menuItems.find((item) => item.key==="home");
      if (activeItem) {
        navigate(activeItem.path);
        setSelectedKey(activeItem.key);
      }
    }
    else{
      const activeItem = menuItems.find((item) => location.pathname === item.path);
      if (activeItem) setSelectedKey(activeItem.key);
    }
  }, [location,logInState.type]);

  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  return (
    <>
      <ContentSider>
        <ContentMenu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </ContentSider>
      <ContentContent>
        <Outlet />
      </ContentContent>
    </>
  );
}
