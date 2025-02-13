import { useQuery } from "@tanstack/react-query";
import { Card, Empty, Row, Col, Layout, Select, Pagination } from 'antd';
import styled from "styled-components";
import { useState, useEffect } from "react";

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
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 3px 0px;
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
const CourseCard = styled(Card)`
  height: 250px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  .ant-card-body {
    padding-top: 5px;
  }
`;
const P = styled.p`
  margin: 8px 0;
`;

const Courses = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
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

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/public/courses');
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
  const instructors = courses ? [...new Set(courses.map(course => course.courseInstructor))] : [];

  const filteredCourses = courses
    ? courses.filter(course => {
        const matchesTech = selectedTech
          ? course.courseTechnologies.some(tech => tech.technologyName === selectedTech)
          : true;
        const matchesCourse = selectedCourse ? course.courseName === selectedCourse : true;
        const matchesInstructor = selectedInstructor ? course.courseInstructor === selectedInstructor : true;

        return matchesTech && matchesCourse && matchesInstructor;
      })
    : [];

  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        </FilterBar>
      </CoursesHeader>
      <CourseContainer>
      <CardContainer>
        <Row gutter={[16, 16]} justify="center" align="top">
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <Col key={course.courseId} xs={24} sm={12} md={8}>
                <CourseCard title={course.courseName}>
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
                </CourseCard>
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
    </CoursesLayout>
  );
};

export default Courses;
