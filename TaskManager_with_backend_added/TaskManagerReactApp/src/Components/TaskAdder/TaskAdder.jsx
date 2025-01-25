import styles from 'styled-components';

import { useQuery } from "@tanstack/react-query";
const TaskContainer = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ccc;
    background-color: ${({ $index }) => ($index % 2 === 0 ? '#f9f9f9' : '#e8e8e8')};
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

export function TaskAdder({ removeTask,handleCheckboxChange }) {

    const { isLoading, error, data } = useQuery({
        queryKey: ['tasksList'],
        queryFn: () =>
          fetch('http://localhost:8080/all').then((res) =>
            res.json(),
          ),
      })
    
    if (isLoading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>Error loading tasks: {error.message}</p>;
    }
    return (
        <>
            {data ? data.map((task,index) => (
                <TaskContainer key={`${task.taskName}-${index}`} $index={index}>
                    <TaskText>{task.taskName}</TaskText>
                    <CheckboxButton type="checkbox" defaultChecked={task.completed} onChange={(event) => handleCheckboxChange(task.taskName, event.target.checked)} />
                    <RemoveButton onClick={() => removeTask(task.taskName)}>Remove</RemoveButton>
                </TaskContainer>
            )):<TaskContainer></TaskContainer>}
        </>
    );
}