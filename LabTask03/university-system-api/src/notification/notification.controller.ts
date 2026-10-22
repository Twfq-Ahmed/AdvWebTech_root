import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service.js';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/send')
  sendNotification(@Body() studentName: string, message: string) {
    return this.notificationService.sendNotification(studentName, message);
  }

  @Post('/check')
  checkEnrollmentAndNotify(@Body() studentName: string, courseId: string) {
    return this.notificationService.checkEnrollmentAndNotify(
      studentName,
      courseId,
    );
  }
}
