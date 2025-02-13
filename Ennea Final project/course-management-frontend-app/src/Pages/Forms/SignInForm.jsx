import { Form, Input } from "antd"

const SignInForm = ({form})=> {
  return (
    <Form
      form={form}
      name="signin"
      layout="horizontal"
      labelCol={{ span: 6 }} 
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      colon={true}
    >
    <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,message:"Please enter username!"
          },
        ]}
      >
        <Input placeholder="eg: JhonSmith"/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,message:"Please enter your password!"
          },
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
  )
}

export default SignInForm;