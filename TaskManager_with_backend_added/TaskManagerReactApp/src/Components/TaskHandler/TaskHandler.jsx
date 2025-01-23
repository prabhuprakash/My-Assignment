import { TaskAdder } from "../TaskAdder/TaskAdder";
import { useState } from "react";
import styles from 'styled-components';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from 'react-toastify';


const InputContainer = styles.div`
    text-align: center;
    margin: 30px auto;
    width: 80%;
    max-width: 600px;
    padding: 20px;
`;

const TaskInput = styles.input`
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
    margin-right: 10px;
    width: 60%;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
`;

const AddTaskButton = styles.button`
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    &:hover {
        background-color: #357ab7; 
        transform: scale(1.05);
    }
`;

const Container = styles.div`
    display:flex;
    flex-direction:column 
`;
const InnerContainer = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ccc;
    background-color:rgb(190, 154, 235);
`;
const H2 = styles.h2`
    flex: 1; 
    text-align: center;
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    padding: 0.5rem 0;
`
 const TaskHandler=()=> {
    const [taskName, setTaskName] = useState('');

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: async (newTask) => {
            const response = await fetch("http://localhost:8080/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(newTask),
            });
            if (!response.ok) {
                throw new Error("Error adding task");
            }
            return response.text(); 
        },
        onSuccess: (data) => {
            toast.success(data, {
                position: "top-right",
                autoClose: 1000,  
              });
            //alert(data); 
            queryClient.invalidateQueries(['tasksList']);
        },
        onError: (error) => {
            alert("Failed to add task: " + error.message);
        },
    });

    const removeMutation = useMutation({
        mutationFn: async (newTask) => {
            const response = await fetch(`http://localhost:8080/removeTask/${newTask}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error adding task");
            }
            return response.text(); 
        },
        onSuccess: (data) => {
            toast.success(data, {
                position: "top-right",
                autoClose: 1000,  
              });
            //alert(data); 
            queryClient.invalidateQueries(['tasksList']);
        },
        onError: (error) => {
            alert("Failed to remove task: " + error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updateTask) => {
            const response = await fetch("http://localhost:8080/updateStatus", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", 
                },
                body:JSON.stringify(updateTask),

            });
            if (!response.ok) {
                throw new Error("Error adding task");
            }
            return response.text(); 
        },
        onSuccess: (data) => {
            toast.success(data, {
                position: "top-right",
                autoClose: 1000,  
              });
            //alert(data); 
        },
        onError: (error) => {
            alert("Failed to update task status: " + error.message);
        },
    });

    const addTask = () => {
        const updatedTaskName=taskName.toUpperCase();
        if (taskName === '') {
            toast.success("Enter a task name.", {
                position: "top-right",
                autoClose: 1000,  
              });
            //alert();
        } else {
            addMutation.mutate({ taskName: updatedTaskName, completed: false });
        }
        setTaskName('');
    };

    const removeTask = (taskNameToRemove) => {
        removeMutation.mutate(taskNameToRemove);
    };

    const updateCompletedStatus = (taskNameToUpdate,isChecked) => {
        updateMutation.mutate({ taskName: taskNameToUpdate, completed: isChecked });
    }

    return (
        <>
            <InputContainer>
                <TaskInput
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value.trim())}
                    placeholder="Task Name"
                />
                <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
            </InputContainer>

            <Container>
                <InnerContainer>
                    <H2>Task</H2>
                    <H2>Completed</H2>
                    <H2>Remove</H2>
                </InnerContainer>

                <TaskAdder removeTask={removeTask} handleCheckboxChange={updateCompletedStatus} />
            </Container>
            <ToastContainer />
        </>
    );
}
export default TaskHandler;
