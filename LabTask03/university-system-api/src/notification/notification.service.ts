import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: any,
  ) {}

  sendNotification(studentName: string, message: string) {
    return [{ message: message, name: studentName }];
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    return this.enrollmentService.getEnrollments(studentName, courseId);
  }
}
