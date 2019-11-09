package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.dto.CourseDto;
import com.mycompany.myapp.domain.dto.CourseWithTNDto;
import org.checkerframework.checker.units.qual.C;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long>{
    @Query("SELECT new com.mycompany.myapp.domain.dto.CourseDto(c.courseName, c.courseLocation, c.courseContent, c.teacherId) from UserCourse u left join Course c on u.course.id = c.id")
    List<CourseDto> findAllCoursesRegisteredDto();

    Optional<UserCourse> findUserCourseByCourse(Course course);
}
