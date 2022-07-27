import { Request, Response } from "express";
import { ICourse } from "../dto/course.dto";
import { Course } from "../entities/course.entity";
import { toDto, toEntity } from "../mapper/course.mapper";
import { deleteCourse, findAllCourses, findById, saveCourse, updateCourse } from "../services/course.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Course>> =>
{
    const dtoList:ICourse[] = [];
    try
    {
        const courseList = await findAllCourses();
        if (courseList.length > 0)
        {
            courseList.forEach((course: Course) =>{
                dtoList.push(toDto(course));
            });

            return res.json(ApiResponse.ok(dtoList));
        }
        else
        {
            return res.json(ApiResponse.ok([])); 
        }
    } catch (error)
    {
        console.log(`error: ${error}`);
    }
    return res.json(ApiResponse.cannotFind([]));
}

    
export const getById = async (req: Request, res: Response): Promise<Response<Course>> =>
{
    try
    {
        const result = await findById(req.params.id);
        if(result !== undefined)
        {
            const dto = toDto(result);
            return res.json(ApiResponse.ok(dto));
        }
        else
        {
            return res.json(ApiResponse.cannotFind([]));
        }            

    } catch (error)
    {
        console.log(`error: ${error}`);
    }
    return res.json(ApiResponse.error([]));
}

export const createCourse = async (req: Request, res: Response): Promise<Response<Course>> =>
{
    try 
    {
        const entity = await toEntity(req.body);
        const result = await saveCourse(entity);
        if (result !== null || result !== undefined)
        {
            const dto = toDto(result);
            return res.json(ApiResponse.ok(dto));
        }
    } catch (error) 
    {
        console.log(`error: ${error}`);
    }
    return res.json(ApiResponse.ERROR({},'Error: record could not be created!'));
}

export const updateCours = async (req: Request, res: Response): Promise<Response<Course>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body);
        const result = await updateCourse(req.params.id, entity);
        if (result)
        {
            const dto = toDto(result);
            return res.json(ApiResponse.OK(dto, dataUpdated));
        }
        else
        {
            return res.json(ApiResponse.error([]));
        }
    } catch (error)
    {
        console.log(`error: ${error}`);
    }
    return res.json(ApiResponse.error([]));
}

export const delCourse = async (req: Request, res: Response): Promise<Response<Course>> =>
{
    try 
    {
        const result = await deleteCourse(req.params.id);
        if (result)
        {
            return res.json(ApiResponse.OK([], dataRemoved));
        }
        else
        {
            return res.json(ApiResponse.cannotFind([]));
        }
        
    } catch (error)
    {
        console.log(`error: ${error}`);
    }
    return res.json(ApiResponse.error([]));
}