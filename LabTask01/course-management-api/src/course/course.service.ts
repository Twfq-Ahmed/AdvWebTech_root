import { BadRequestException, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import path, { basename, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

@Injectable()
export class CourseService {
  getAllCourses() {
    //return 'Get All Courses';
    return [
      {
        message: 'All courses fetched successfully',
        data: [
          {
            Name: 'Advanced Programming in Web Technology',
            Code: 'CSC4161',
          },
        ],
      },
    ];
  }

  getCourseById(id: string) {
    //return 'Get Course with ID: ' + id;
    return [
      {
        message: 'Course fetched successfully',
        id: id,
      },
    ];
  }

  createCourse(createCourse: CreateCourseDto) {
    //return 'Create Course';
    return [
      {
        message: 'Course created successfully',
        data: createCourse,
      },
    ];
  }

  updateCourse(id: string, updateCourse: UpdateCourseDto) {
    //return 'Update Course ' + id;
    return [
      {
        message: 'Course updated successfully',
        id: id,
        data: updateCourse,
      },
    ];
  }

  patchCourse(id: string, patchCourse: UpdateCourseDto) {
    //return 'Patch Course ' + id;
    return [
      {
        message: 'Course patched successfully',
        id: id,
        updatedFields: [Object.keys(patchCourse)],
      },
    ];
  }

  deleteCourse(id: string) {
    //return 'Delete Course ' + id;
    return [
      {
        message: 'Course deleted successfully',
        id: id,
      },
    ];
  }

  private readonly uploadDirName = 'uploads';
  async uploadCourseMaterial(id: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const safeName = basename(file.originalname).replace(
      /[^a-zA-Z0-9.-_]/g,
      '_',
    );
    const fileName = `${Date.now()}-${safeName}`;
    const uploadDir = join(process.cwd(), this.uploadDirName);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, fileName), file.buffer);

    return [
      {
        message: 'Material uploaded successfully',
        id: id,
        filename: fileName,
        path: `${this.uploadDirName}/${fileName}`,
      },
    ];
  }
}
