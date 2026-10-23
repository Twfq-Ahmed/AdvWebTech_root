import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service.js';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  enrollStudent(studentName: string, courseId: string) {
    return this.enrollmentService.enrollStudent('John Doe', '101');
  }

  @Post()
  getEnrollments(@Body() body: { studentName: string; courseId: string }) {
    return this.enrollmentService.getEnrollments(
      body.studentName,
      body.courseId,
    );
  }
}
