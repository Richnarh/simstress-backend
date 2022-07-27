import { ICourse } from "../dto/course.dto";
import { Course } from "../entities/course.entity";

export const toEntity = async (iCourse:ICourse):Promise<Course> =>{
    let course:Course = new Course();

    course.title = iCourse.title;
    course.description = iCourse.description;
        
    return course;
}

export const toDto = (course:Course):ICourse =>{
    let dto = {} as ICourse;
    
    dto.id = course.id;
    dto.title = course.title;
    dto.description = course.description;
   
    return dto;
}