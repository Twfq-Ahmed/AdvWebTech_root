import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service.js';
import { get } from 'http';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() createCourse: CreateCourseDto) {
    // console.log(course.name);
    // console.log(course.code);
    // console.log(course.instructor);
    // console.log(course.credits);
    // console.log(course.description);
    return this.courseService.createCourse(createCourse);
  }

  @Put('/:id')
  updateCourse(@Param('id') id: string, @Body() updateCourse: UpdateCourseDto) {
    return this.courseService.updateCourse(id, updateCourse);
  }

  @Patch('/:id')
  patchCourse(@Param('id') id: string, @Body() patchCourse: UpdateCourseDto) {
    return this.courseService.patchCourse(id, patchCourse);
  }

  @Delete('/:id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  @Post('/:id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      // storage: diskStorage({
      //   destination: './uploads',
      //   filename: (req, file, cb) => {
      //     const safeName = file.originalname.replace(/[^a-zA-z0-9._-]/g, '_');
      //     cb(null, `${Date.now()}-${safeName}`);
      //   },
      // }),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        // console.log(file.originalname, file.mimetype);
        const allowedMimeTypes = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'application/pdf',
        ];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
        const ext = extname(file.originalname).toLowerCase();

        if (
          !allowedMimeTypes.includes(file.mimetype) ||
          !allowedExtensions.includes(ext)
        ) {
          return cb(
            new BadRequestException(
              'Only .jpg, .jpeg, .png and .pdf files are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.courseService.uploadCourseMaterial(id, file);
  }
}
