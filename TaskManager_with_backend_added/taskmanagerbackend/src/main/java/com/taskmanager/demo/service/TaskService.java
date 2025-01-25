package com.taskmanager.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.taskmanager.demo.model.Task;
import com.taskmanager.demo.repository.TaskRepository;



@Service
public class TaskService {
	
	@Autowired
	TaskRepository repo;
	
	public List<Task> allTasks() {
		return repo.findAll();
	}
	public String addTask(String taskname) {
		Optional<Task> t=repo.findByTaskName(taskname);
		if (!t.isPresent()) {
			Task newTask=new Task();
			newTask.setTaskName(taskname);
	        repo.save(newTask);
	        return "Task added Successfully";
	    } else {
	    	return taskname + " already exists.";
	    }
	}
	
	public String changeCompleteStatus(Task task) {
		Optional<Task> t=repo.findByTaskName(task.getTaskName());
		 if (t.isPresent()) {
		        Task taskToUpdate = t.get();
		        taskToUpdate.setCompleted(task.isCompleted());
		        repo.save(taskToUpdate);
		        return "changed successfully";
		    } else {
		        return task.getTaskName() + " not found.";
		    }
		}

	public String removeTask(String taskname) {
		Optional<Task> t=repo.findByTaskName(taskname);
		if(t.isPresent()) {
			Task taskToRemove=t.get();
			repo.delete(taskToRemove);
			return "Task Removed Successfully";
		}else {
			return t.get().getTaskName() + " doesn't exist.";
		}
	}
}