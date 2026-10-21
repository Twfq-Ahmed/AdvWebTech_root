import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';

@Injectable()
export class EnrollmentService {
  constructor(private readonly courseService: CourseService) {}

  enrollStudent(studentName: string, courseId: string) {
    return [
      {
        message: 'Student enrolled successfully',
        student: studentName,
        course: this.courseService.getCourseById(courseId),
      },
    ];
  }

  getEnrollments(studentName: string, courseId: string) {
    return [
      {
        message: 'All enrollments fetched',
        data: [
          {
            name: studentName,
            courseId: courseId,
          },
        ],
      },
    ];
  }
}
