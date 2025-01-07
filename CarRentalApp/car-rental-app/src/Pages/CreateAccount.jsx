import { Form, Input, message, Modal } from 'antd';
export default function CreateAccount({onClose}){
  const [form] = Form.useForm(); 
  async function postUserData(values) {
    const response=await fetch('http://localhost:5000/create-account',{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'content-type':'application/json'
      }
    }
    );
    const resData=await response.json();
    return resData.message;
  }

  const handleOk = async () => {
    try{
      const values = await form.validateFields();
        console.log('Form values:', values); 
        const messagefromserver=await postUserData(values);
        if(messagefromserver==='Username already exists')
          message.warning(messagefromserver);
        else
          message.success(messagefromserver);
        form.resetFields();
        onClose();
      }catch(error){
        console.error('Error:', error.message);
        message.error(error.message || 'An unexpected error occurred'); // Show error message
      }
  };
return(   <>
<Modal
            title="Create Account"
            open={true}
            onOk={handleOk}
            onCancel={onClose}
            okText="Submit"
            cancelText="Cancel"
          >
             <Form
                          form={form}
                          layout="vertical"
                          name="create_account_form"
                        >
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

              <Form.Item
                name="mobile"
                label="Mobile Number"
                rules={[
                  { required: true, message: 'Please input your mobile number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' },
                ]}
              >
                <Input />
              </Form.Item>
              </Form>
      </Modal>
            </>
  )
}
