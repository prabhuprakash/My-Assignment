import { Form, Input } from 'antd';

const UpdateProfileForm = ({ form }) => {
  return (
    <Form
      form={form}
      name="updateprofile"
      layout="horizontal"
      labelCol={{ span: 6 }} 
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      colon={true}
    >
      <Form.Item
        label="Email"
        name="emailId"
        rules={[
          {
            required: true,message:"Please enter email!"
          },
          {
            type: "email",message:"Enter a valid email!"
          },
          {
            validator(_, value) {
              if (!value || /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Only Gmail or Hotmail emails are allowed!"));
            }
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

    </Form>
  );
};

export default UpdateProfileForm;
