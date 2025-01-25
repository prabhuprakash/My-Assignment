package com.taskmanager.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



import com.taskmanager.demo.model.Task;
import com.taskmanager.demo.service.TaskService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {
	@Autowired
	TaskService service;
	@GetMapping("/all")
	public @ResponseBody List<Task> allTasks() {
		return service.allTasks();
	}
	@PostMapping("/addtask/{taskname}")
	public String addTask(@PathVariable String taskname ) {
		return service.addTask(taskname);
	}
	@PutMapping("/updateStatus")
	public String changeCompleteStatus(@RequestBody Task task) {
		return service.changeCompleteStatus(task);
	}
	@DeleteMapping("/removeTask/{taskname}")
	public String removeTask(@PathVariable String taskname) {
		return service.removeTask(taskname);
	}
}
