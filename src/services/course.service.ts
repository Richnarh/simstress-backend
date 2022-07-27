import { getRepository } from "typeorm";
import { Course } from "../entities/course.entity";

export const findAllCourses = async() =>{
   return await getRepository(Course).find();
}

export const findById = async(id:any) =>{
    
    return await getRepository(Course)
                .createQueryBuilder("Course")
                .andWhere({id:id})
                .getOne();
}

export const saveCourse = async(course:Course) =>{
    const savedObj = getRepository(Course).create(course);
    return await getRepository(Course).save(savedObj);
}

export const updateCourse = async(id:any, obj:Object) =>{
    const result = await findById(id);
    if (result)
    {
        getRepository(Course).merge(result, obj);
        return await getRepository(Course).save(result);
    }
}

export const deleteCourse = async(id:any) =>{
    const result = await findById(id);
    if(result){
        return await getRepository(Course).delete(result.id);
    }
    return null;
}