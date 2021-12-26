import { Request, Response } from "express";
import { ISleet } from "../dto/sleet.dto";
import { Sleet } from "../entities/sleet.entity";
import { toDto, toEntity } from "../mapper/sleet.mapper";
import { deleteSleet, findAllSleets, findById, saveSleet, updateSleet } from "../services/sleet.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Sleet>> =>
{
    const dtoList:ISleet[] = [];
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const sleetList = await findAllSleets(headerValue);
        if (sleetList.length > 0)
        {
            sleetList.forEach((sleet: Sleet) =>{
                dtoList.push(toDto(sleet));
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

    
export const getById = async (req: Request, res: Response): Promise<Response<Sleet>> =>
{
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == null)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await findById(req.params.id, headerValue);
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

export const createSleet = async (req: Request, res: Response): Promise<Response<Sleet>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await saveSleet(entity);
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

export const updateslet = async (req: Request, res: Response): Promise<Response<Sleet>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await updateSleet(req.params.id, entity, headerValue);
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

export const delSleet = async (req: Request, res: Response): Promise<Response<Sleet>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await deleteSleet(req.params.id, headerValue);
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