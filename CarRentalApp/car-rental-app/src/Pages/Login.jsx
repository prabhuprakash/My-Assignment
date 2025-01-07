import { Form, Input, Modal, message } from 'antd';
import { useContext } from 'react';
import { LogInContext } from '../Context/LoginContextProvider';
export default function Login({ onClose }) {
  const {dispatchLogIn}=useContext(LogInContext);
  const [form] = Form.useForm();

  // Function to send login data to the server
  async function postLoginData(values) {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await response.json();
      return resData.message;
    } catch (error) {
      throw error;
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        message.success(result.message);
        
        // Dispatch the user's role to the context
        dispatchLogIn({
          type: "LogIn",
          name: result.user.username,
          role: result.user.role,
        });
  
        form.resetFields();
        onClose();
      } else {
        message.warning(result.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      message.error(error.message || 'An unexpected error occurred');
    }
  };
  
  return (
    <>
      <Modal
        title="Login"
        open={true}
        onOk={handleOk}
        onCancel={onClose}
        okText="Login"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="Login-Form">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
