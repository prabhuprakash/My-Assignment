package com.enneaassignments.taskmanagerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enneaassignments.taskmanagerbackend.model.Task;
import com.enneaassignments.taskmanagerbackend.service.TaskService;

@RestController
public class TaskController {
	@Autowired
	TaskService service;
	@PostMapping("/addtask")
	public void addTask(@RequestBody Task task ) {
		System.out.println("Controller :" +task);
		service.addTask(task);
	}
}
