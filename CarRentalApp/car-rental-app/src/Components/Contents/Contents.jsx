import {
  CarTwoTone,
  HomeTwoTone
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const { Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const CenteredSider = styled(Sider)`
  background-color: #a2bfc9;
  position: fixed;
  top: 64px;
  bottom: 0px;
  left: 0;
  width: 200px;  /* Fixed width for Sider */
`;

const StyledMenu = styled(Menu)`
  background-color: inherit;
  margin-top: 20px;
`;

const StyledContent = styled(Content)`
  background-color: white;
  position: fixed;
  top: 65px;
  margin-top: auto;
  right: 0;
  bottom:auto;
  left: 200px;  /* Adjusted to match the fixed Sider width */
  
`;

const menuItems = [
  { key: "home", label: "Home", path: "/", icon: <HomeTwoTone twoToneColor="#1890ff" /> },
  { key: "carRents", label: "Car Rents", path: "/carRents", icon: <CarTwoTone twoToneColor="#13c2c2" /> },
  { key: "rentedCars", label: "Rented Cars", path: "/rentedCars", icon: <CarTwoTone twoToneColor="#faad14" /> },
];


export default function Contents() {
  const [selectedKey, setSelectedKey] = useState(""); // Default selected key
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const activeItem = menuItems.find((item) => location.pathname === item.path);
    if (activeItem) setSelectedKey(activeItem.key);
  }, [location]);

  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  return (
    <StyledLayout>
      <CenteredSider>
        <StyledMenu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </CenteredSider>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
}
