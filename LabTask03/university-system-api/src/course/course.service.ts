import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  getAllCourses() {
    return [
      {
        message: 'All courses fetched',
        data: [
          // {
          //   name: 'Advanced Programming in Web Technology',
          //   code: 'CSC4161',
          // },
        ],
      },
    ];
  }

  getCourseById(id: string) {
    //  console.log('ID: ' + id);
    //  console.log('Checking');
    return [
      {
        message: 'Course fetched',
        id: id,
      },
    ];
  }

  createCourse(name: string, code: string) {
    return [
      {
        message: 'Course created',
        data: [
          {
            CourseName: name,
            CourseCode: code,
          },
        ],
      },
    ];
  }
}
