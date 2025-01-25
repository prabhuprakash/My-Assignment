package com.taskmanager.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.demo.model.Task;



@Repository
public interface TaskRepository extends JpaRepository<Task,String>{
	Optional<Task> findByTaskName(String taskName);
}
