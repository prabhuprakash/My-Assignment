import { useContext } from "react";
import styles from 'styled-components';
import { TaskNamesContext } from "../../Context/TaskNamesProvider";

const TaskContainer = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ccc;
    background-color: ${({ index }) => (index % 2 === 0 ? '#f9f9f9' : '#e8e8e8')};
`;
const TaskText = styles.div`
    flex: 1; 
    text-align: center;
`;
const CheckboxButton = styles.input`
    flex: 1; 
    text-align: center;
    color: white;
    cursor: pointer;
    accent-color: #663399;
`;

const RemoveButton = styles.button`
    flex: 1; 
    text-align: center;
    border: none;
    border-radius: 4px;
    padding: 0.5rem ;
    cursor: pointer;
    background-color:rgb(225, 30, 30);
    color: white;
    &:hover {
        background-color: #27ae60;
    }
`;

export function TaskAdder({ removeTask }) {
    const { taskNames } = useContext(TaskNamesContext);

    return (
        <>
            {taskNames.map((taskName,index) => (
                <TaskContainer key={taskName} index={index}>
                    <TaskText>{taskName}</TaskText>
                    <CheckboxButton type="checkbox" />
                    <RemoveButton onClick={() => removeTask(taskName)}>Remove</RemoveButton>
                </TaskContainer>
            ))}
        </>
    );
}