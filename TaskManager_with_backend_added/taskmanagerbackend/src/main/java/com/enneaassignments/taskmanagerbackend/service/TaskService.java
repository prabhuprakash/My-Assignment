package com.enneaassignments.taskmanagerbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enneaassignments.taskmanagerbackend.model.Task;
import com.enneaassignments.taskmanagerbackend.repositry.TaskRepositry;

@Service
public class TaskService {
	
	@Autowired
	TaskRepositry repo;
	
	public void addTask(Task task) {
		repo.save(task);
	}
}
