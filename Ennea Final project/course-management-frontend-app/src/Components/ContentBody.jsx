import { Layout, Menu } from "antd";
import styled from "styled-components";
import { useState, useContext } from "react";
import { SignInContext } from "../Context/SignInContextProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HomeTwoTone, UserOutlined} from "@ant-design/icons"
const { Header, Content } = Layout;

const ContentBodyLayout = styled(Layout)`
  margin: 0;
  background-color: #f0f3d2;
  min-height: calc(100vh - 128px);
  font-size: clamp(14px, 1.2vw, 16px);

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ContentBodyHeader = styled(Header)`
  position: fixed;
  height: 40px; 
  padding: 0px;
  width: 100%;
`;

const ContentBodyContent = styled(Content)`
  margin-top: 36px;
  padding: 0;
  background-color: aliceblue;
`;

const NavigationBar = styled(Menu)`
  padding-left: 30px;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #698fb0d7;

  .ant-menu-item {
    height: 36px !important;
    line-height: 36px !important; 
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 14px; 
    color: #ffffffef;
    padding: 0 12px !important; 
  }

  .ant-menu-item-selected {
    color: #ffcc00 !important;
  }
`;

const ContentBody = () => {
  const [selectedKey, setSelectedKey] = useState("");;
  const { SignInState } = useContext(SignInContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("role");

  const items = [
    !SignInState && {
      label: "Courses",
      key: "courses",
      path: "/", 
      icon:<HomeTwoTone/>
    },
    SignInState && userRole === "ADMIN" &&{
      label: "Courses Management",
      key: "coursesmanagement",
      path: "/coursesmanagement",
      icon:<HomeTwoTone/>
    },
    SignInState && userRole === "USER" &&{
      label: "Courses Enrollment",
      key: "coursesenrollment",
      path: "/coursesenrollment",
      icon:<HomeTwoTone/>
    },
    SignInState && userRole === "USER" &&{
      label: "User Profile",
      key: "userprofile",
      path: "/userprofile",
      icon:<UserOutlined />
    },
    SignInState && userRole === "ADMIN" &&{
      label: "Profiles",
      key: "profilesmanager",
      path: "/profilesmanager",
      icon:<UserOutlined />
    },
  ];

  useEffect(() => {
    const defaultPath = !SignInState
      ? "/"
      : userRole === "ADMIN"
      ? "/coursesmanagement"
      : "/coursesenrollment";

    const isValidPath = items.some((item) => item.path === location.pathname);

    if (!isValidPath) {
      navigate(defaultPath);
      setSelectedKey(defaultPath === "/" ? "courses" : defaultPath.replace("/", ""));
    } else {
      setSelectedKey(location.pathname === "/" ? "courses" : location.pathname.replace("/", ""));
    }
  }, [location,SignInState]);

  const onClick = ({key}) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  

  return (
    <ContentBodyLayout>
      <ContentBodyHeader>
        <NavigationBar onClick={onClick} selectedKeys={[selectedKey]} mode="horizontal" items={items} />
      </ContentBodyHeader>
      <ContentBodyContent>
        <Outlet />
      </ContentBodyContent>
    </ContentBodyLayout>
  );
};

export default ContentBody;
