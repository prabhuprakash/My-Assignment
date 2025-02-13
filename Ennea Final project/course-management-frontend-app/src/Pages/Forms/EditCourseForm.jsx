import { Form, Input } from 'antd';

const EditCourseForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Course Name"
        name="courseName"
        rules={[{ required: true, message: "Please enter the course name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Instructor"
        name="courseInstructor"
        rules={[{ required: true, message: "Please enter the instructor's name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Technologies"
        name="courseTechnologies"
        rules={[{ required: true, message: "Please add at least one technology" }]}
      >
        <Input placeholder="Comma-separated technologies (e.g., React, Java)" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="courseDescription"
        rules={[{ required: true, message: "Please add a course description" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default EditCourseForm;
