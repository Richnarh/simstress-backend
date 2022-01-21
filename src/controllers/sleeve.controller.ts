import { Request, Response } from "express";
import { ISleeve } from "../dto/sleeve.dto";
import { Sleeve } from "../entities/sleeve.entity";
import { toDto, toEntity } from "../mapper/sleeve.mapper";
import { deleteSleeve, findAllSleeve, findById, saveSleeve, updateSleeve } from "../services/sleeve.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Sleeve>> =>
{
    const dtoList:ISleeve[] = [];
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const sleetList = await findAllSleeve(headerValue);
        if (sleetList.length > 0)
        {
            sleetList.forEach((sleeve: Sleeve) =>{
                dtoList.push(toDto(sleeve));
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

    
export const getById = async (req: Request, res: Response): Promise<Response<Sleeve>> =>
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

export const createSleeve = async (req: Request, res: Response): Promise<Response<Sleeve>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await saveSleeve(entity);
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

export const updateSleve = async (req: Request, res: Response): Promise<Response<Sleeve>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await updateSleeve(req.params.id, entity, headerValue);
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

export const delSleve = async (req: Request, res: Response): Promise<Response<Sleeve>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await deleteSleeve(req.params.id, headerValue);
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