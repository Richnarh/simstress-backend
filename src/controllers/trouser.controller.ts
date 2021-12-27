import { Request, Response } from "express";
import { ITrouser } from "../dto/trouser.dto";
import { Trouser } from "../entities/trouser.entity";
import { toDto, toEntity } from "../mapper/trouser.mapper";
import { deleteTrouser, findAllTrouser, findById, saveTrouser, updateTrouser } from "../services/trouser.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Trouser>> =>
{
    const dtoList:ITrouser[] = [];
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const sleetList = await findAllTrouser(headerValue);
        if (sleetList.length > 0)
        {
            sleetList.forEach((trouser: Trouser) =>{
                dtoList.push(toDto(trouser));
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

    
export const getById = async (req: Request, res: Response): Promise<Response<Trouser>> =>
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

export const createTrouser = async (req: Request, res: Response): Promise<Response<Trouser>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await saveTrouser(entity);
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

export const updateTrouzer = async (req: Request, res: Response): Promise<Response<Trouser>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await updateTrouser(req.params.id, entity, headerValue);
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

export const deleteTrouzer = async (req: Request, res: Response): Promise<Response<Trouser>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await deleteTrouser(req.params.id, headerValue);
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