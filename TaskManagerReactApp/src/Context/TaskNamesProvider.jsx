import React,{ useReducer } from "react";
export const TaskNamesContext = React.createContext();
const TaskNamesContextProvider=({children})=>{
    function reducer(taskNames,action){
        switch(action.actionType){
            case 'addTask':
                return([...taskNames,action.taskName]);
            case 'removeTask':
                return(taskNames.filter(name=>name!==action.taskName));
            default :
                return taskNames;
        }
    }
    const [taskNames,dispatchTaskNames]=useReducer(reducer,[]);
    return (
        <TaskNamesContext.Provider value={{taskNames,dispatchTaskNames}}>
            {children}
        </TaskNamesContext.Provider>
    )
}
export default TaskNamesContextProvider;
