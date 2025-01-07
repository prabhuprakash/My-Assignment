import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LogInContext } from '../../Context/LoginContextProvider';
import CreateAccount from '../../Pages/CreateAccount';
import Login from '../../Pages/Login';

const StyledH1 = styled.h1`
  margin: 0;
  color:#87d068;
  text-align: center;
  line-height: 64px;
`;

const StyledH2 = styled.h4`
  margin: 0;
  color:white;
  text-align: center;
  line-height: 64px;
`;
const ResponsiveRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ResponsiveCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export default function TopBar() {
  const [renderComponent, setRenderComponent] = useState(null);
  const { logInState, dispatchLogIn } = useContext(LogInContext);

  const openComponent = (component) => {
    setRenderComponent(component);
  };

  const closeComponent = () => {
    setRenderComponent(null);
  };

  const renderLoggedOutView = () => (
    <ResponsiveCol span={8} offset={8}>
      <Space>
      
      <Button type="link" onClick={() => openComponent('CreateAccount')}>
      <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />Create Account
      </Button>
      
      <Button type="link" onClick={() => openComponent('Login')}>
      <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> Login
      </Button>
      </Space>
    </ResponsiveCol>
  );

  const renderLoggedInView = () => (
    <ResponsiveCol span={8} offset={8}>
      <Space>
      <StyledH2>Welcome {logInState.name}</StyledH2>
      <Button
        type="link"
        onClick={() => dispatchLogIn({ type: 'LogOut', name: '' })}
      >
        LogOut
      </Button>
      </Space>
    </ResponsiveCol>
  );

  return (
    <>
      <ResponsiveRow>
        <Col span={8}>
          <></>
          <StyledH1><Avatar src={"/Mycarrental_Logo.webp"} />  MyCar Rentals</StyledH1>
        </Col>
        {logInState.type === 'LogOut' ? renderLoggedOutView() : renderLoggedInView()}
      </ResponsiveRow>

      {renderComponent === 'CreateAccount' && <CreateAccount onClose={closeComponent} />}
      {renderComponent === 'Login' && <Login onClose={closeComponent} />}
    </>
  );
}
