package com.enneaassignments.taskmanagerbackend.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enneaassignments.taskmanagerbackend.model.Task;

@Repository
public interface TaskRepositry extends JpaRepository<Task,Integer>{

}
