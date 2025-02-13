import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Empty, Button, Row, Col, Layout, Modal, Form, message, Select, Badge, Popover, Pagination } from 'antd';
import styled from "styled-components";
import { useState, useEffect } from "react";
import AddCourseForm from "../Forms/AddCourseForm";
import EditCourseForm from "../Forms/EditCourseForm";
import { EditOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons"

const { Header, Content } = Layout;

const CoursesLayout = styled(Layout)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const CoursesHeader = styled(Header)`
  position: fixed;
  padding: 4px 0px 0px 40px;
  top: 100px;
  width: 100%;
  background-color: #c4dff7;
  height: 34px;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 3px 150px 3px 0px;
  height: 28px;

  .ant-select {
    padding: 0px;
    width: 160px !important;
    height: 28px !important;
    font-size: 12px !important;
  }

  .ant-select-selector {
    height: 28px !important;
    line-height: 28px !important;
  }
  button {
    padding: 13px 16px !important;
    margin: 0px 20px 3px !important;
    height: 24px !important;
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  gap: 10px; 
  height: 28px;
`;
const CourseContainer = styled(Content)`
  position: fixed;
  margin-top: 34px;
  width:100%;
  padding: 0px;
  background-color: #f9f9f9;
  height: calc(100vh - 45px);
`;
const CoursePagination = styled(Pagination)`
  width:100%;
  justify-content: center;
`;
const CardContainer = styled.div`
  position: fixed;
  width:100%;
  margin-top: 34px;
  padding: 10px 20px 0px 20px;
  background-color: #f9f9f9;
  height: calc(100vh - 45px);
`;

const BadgeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CourseBadge = styled(Badge)`
  position: absolute;
  bottom: 10px;
  right: 10px;

  .ant-badge-count {
    background-color: #7c4dff;
    color: white;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CourseCard = styled(Card)`
  height: 250px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  .ant-card-body {
    padding-top: 5px;
  }
`;

const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap:5px;
`;

const P = styled.p`
  margin: 8px 0;
`;

const CoursesManagement = () => {
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [editCourseModalOpen, setEditCourseModalOpen] = useState(false);
  const [addCourseForm] = Form.useForm();
  const [editCourseForm] = Form.useForm();
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [courseIdToEdit, setCourseIdToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setPageSize(6);
      } else if (width > 768) {
        setPageSize(3);
      } else {
        setPageSize(2);
      }
    };
  
    useEffect(() => {
      updatePageSize();
      window.addEventListener("resize", updatePageSize);
      return () => window.removeEventListener("resize", updatePageSize);
    }, []);

  const { data: courses, isLoading, error, refetch } = useQuery({
    queryKey: ['admincourses'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/admin/courses',{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 204) {
        return [];
      }
      return response.json();
    }
  });

  const courseNames = courses ? [...new Set(courses.map(course => course.courseName))] : [];
  const technologies = courses
    ? [...new Set(courses.flatMap(course => course.courseTechnologies.map(tech => tech.technologyName)))]
    : [];
  const instructors = courses
    ? [...new Set(courses.map(course => course.courseInstructor))]
    : [];

  const filteredCourses = courses
    ? courses.filter(course => {
        const matchesTech = selectedTech
          ? course.courseTechnologies.some(tech => tech.technologyName === selectedTech)
          : true;
        const matchesCourse = selectedCourse
          ? course.courseName === selectedCourse
          : true;
        const matchesInstructor = selectedInstructor
          ? course.courseInstructor === selectedInstructor
          : true;

        return matchesTech && matchesCourse && matchesInstructor;
      })
    : [];

  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const addCourseMutation = useMutation({
    mutationFn: async (coursedetails) => {
      const response = await fetch("http://localhost:8080/admin/addcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(coursedetails),
      });

      const result = await response.text();
  
      if (!response.ok) {
        message.error(result.message || result || "Failed to add course");
        throw new Error(result.message || result || "Failed to add course");
      }
      return result;
    },
    onSuccess: () => {
      message.success("Course added successfully!");
      refetch();
    },
  });
  
  const handleAddCourse = () => {
    setAddCourseModalOpen(true);
  };

  const submitAddCourse = async () => {
    const values = await addCourseForm.validateFields();
    const payload = {
      courseName: values.courseName,
      courseDescription: values.courseDescription,
      courseInstructor: values.courseInstructor,
      courseTechnologies: values.courseTechnologies
        .split(",")
        .map((tech) => ({ technologyName: tech.trim() })),
    };
    await addCourseMutation.mutateAsync(payload); 
    setAddCourseModalOpen(false);
    addCourseForm.resetFields();
  };
  const deleteMutation = useMutation({
    mutationFn: async (courseId) => {
      const response = await fetch(`http://localhost:8080/admin/deletecourse/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        if(response.status==204)
          message.error("course doest exist!");
        else
          message.error(errorText || "Failed to delete course");
      }      
      return response.text();
    },
    onSuccess: () => {
      message.success("Course deleted successfully!");
      refetch(); 
    },    
  })

  const handleDeleteCourse = async (courseId) => {
    await deleteMutation.mutateAsync(courseId);
  };

  const editMutation = useMutation({
    mutationFn: async (courseDetails) => {
      const response = await fetch(`http://localhost:8080/admin/editcourse/${courseIdToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(courseDetails),
      });
  
      const result = await response.text();
  
      if (!response.ok) {
        message.error(result.message || "Failed to edit course");
        throw new Error(result.message || "Failed to edit course");
      }  
      return result;
    },
    onSuccess: () => {
      message.success("Course updated successfully!");
      refetch();
    },
  });

  const submitEditCourse = async () => {
    const values = await editCourseForm.validateFields();
    const updatedCourse = {
      courseName: values.courseName,
      courseDescription: values.courseDescription,
      courseInstructor: values.courseInstructor,
      courseTechnologies: values.courseTechnologies.split(",").map(tech => ({ technologyName: tech.trim() }))
    };
  
    await editMutation.mutateAsync(updatedCourse);
    setEditCourseModalOpen(false);
    editCourseForm.resetFields();
    setCourseIdToEdit(null); 
  };
  
  const handleEditCourse = (course) => {
    setCourseIdToEdit(course.courseId); 
    editCourseForm.setFieldsValue({ 
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      courseInstructor: course.courseInstructor,
      courseTechnologies: course.courseTechnologies.map(tech => tech.technologyName).join(", ")
    });
    setEditCourseModalOpen(true);
  };
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading courses: {error.message}</p>;
  }
  return (
    <CoursesLayout>
      <CoursesHeader>
        <FilterBar>
          <Filters>
          <Select placeholder="Filter by Technology" style={{ width: 200 }} onChange={setSelectedTech} allowClear>
            {technologies.map((tech) => (
              <Select.Option key={tech} value={tech}>
                {tech}
              </Select.Option>
            ))}
          </Select>
          <Select placeholder="Filter by Course" style={{ width: 200 }} onChange={setSelectedCourse} allowClear>
            {courseNames.map((name) => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
          <Select placeholder="Filter by Instructor" style={{ width: 200 }} onChange={setSelectedInstructor} allowClear>
            {instructors.map((instructor) => (
              <Select.Option key={instructor} value={instructor}>
                {instructor}
              </Select.Option>
            ))}
          </Select>
          </Filters>
          
          <Button type="primary" onClick={handleAddCourse}>
          <FormOutlined /> Add Course
          </Button>
        </FilterBar>
      </CoursesHeader>
      <CourseContainer>
      <CardContainer>
        <Row gutter={[16, 16]} justify="center" align="top">
        {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <Col key={course.courseId} xs={24} sm={12} md={8}>
                <BadgeWrapper>
                  <CourseCard
                    title={course.courseName}
                    extra={
                      <CardButtons>
                        <Button type="primary" onClick={() => handleEditCourse(course)}>
                        <EditOutlined /> Edit
                        </Button>
                        <Button type="primary" danger onClick={() => handleDeleteCourse(course.courseId)}>
                        <DeleteOutlined /> Delete
                        </Button>
                      </CardButtons>
                    }
                  >
                    <P>
                    <strong>Course Id:</strong> {course.courseId}
                  </P>
                  <P>
                    <strong>Instructor:</strong> {course.courseInstructor}
                  </P>
                  <P>
                    <strong>Technologies:</strong> {course.courseTechnologies
                      .map((tech) => tech.technologyName)
                      .join(", ")}
                  </P>
                  <P>
                    <strong>Description:</strong> {course.courseDescription}
                  </P>
                    <Popover content={`Total enrolled in this course: ${course.users.length}`}>
                      <CourseBadge count={course.users.length} showZero />
                    </Popover>
                  </CourseCard>
                </BadgeWrapper>
              </Col>

            ))
          ) : (
            <Col xs={24} style={{ textAlign: "center", padding: "50px 0" }}>
              <Empty description="No Courses Available" />
            </Col>
          )}
        </Row>
      </CardContainer>
      <CoursePagination hideOnSinglePage = {false}
              current={currentPage}
              pageSize={pageSize}
              total={filteredCourses.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
      </CourseContainer>
      <Modal
        title="Add Course"
        open={addCourseModalOpen}
        onOk={submitAddCourse}
        onCancel={() => setAddCourseModalOpen(false)}
        okText="Add Course"
        centered={true}
      >
        <AddCourseForm form={addCourseForm} />
      </Modal>
      <Modal
        title="Edit Course"
        open={editCourseModalOpen}
        onOk={submitEditCourse}
        onCancel={() => setEditCourseModalOpen(false)}
        okText="Save Course"
        centered={true}
      >
        <EditCourseForm form={editCourseForm} />
      </Modal>
    </CoursesLayout>
  );
};

export default CoursesManagement;
