package com.coursemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.coursemanagement.models.Course;
import com.coursemanagement.models.UserAccount;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount,String>{
  Optional<UserAccount> findByEmailId(String emailId);

  List<UserAccount> findByCoursesContaining(Course course);

  @Query("SELECT u.userName, u.emailId FROM UserAccount u WHERE u.role <> 'admin'")
  List<Object[]> findAllNonAdminUsers();
}
