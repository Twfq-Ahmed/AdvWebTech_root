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
            name: name,
            code: code,
          },
        ],
      },
    ];
  }
}
