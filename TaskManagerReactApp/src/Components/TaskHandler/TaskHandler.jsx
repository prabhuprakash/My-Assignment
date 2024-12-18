import { TaskAdder } from "../TaskAdder/TaskAdder";
import { useState, useContext } from "react";
import styles from 'styled-components';
import {TaskNamesContext} from "../../Context/TaskNamesProvider";

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

    const { taskNames, dispatchTaskNames } = useContext(TaskNamesContext);

    const addTask = () => {
        if (taskName === '') {
            alert("Enter a task name.");
        } else if (taskNames.includes(taskName)) {
            alert("Task already added");
        } else {
            dispatchTaskNames({ actionType: 'addTask', taskName });
        }
        setTaskName('');
    };

    const removeTask = (taskNameToRemove) => {
        dispatchTaskNames({ actionType: 'removeTask', taskName: taskNameToRemove });
    };

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
                <TaskAdder removeTask={removeTask} />
            </Container>
        </>
    );
}
export default TaskHandler;
