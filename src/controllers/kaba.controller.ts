import { Request, Response } from "express";
import { IKaba } from "../dto/kaba.dto";
import { Kaba } from "../entities/kaba.entity";
import { toDto, toEntity } from "../mapper/kaba.mapper";
import { deleteKaba, findAllKaba, findById, saveKaba, updateKaba } from "../services/kaba.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Kaba>> =>
{
    const dtoList:IKaba[] = [];
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const sleetList = await findAllKaba(headerValue);
        if (sleetList.length > 0)
        {
            sleetList.forEach((kaba: Kaba) =>{
                dtoList.push(toDto(kaba));
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

    
export const getById = async (req: Request, res: Response): Promise<Response<Kaba>> =>
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

export const createKaba = async (req: Request, res: Response): Promise<Response<Kaba>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await saveKaba(entity);
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

export const updateKab = async (req: Request, res: Response): Promise<Response<Kaba>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await updateKaba(req.params.id, entity, headerValue);
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

export const delKaba = async (req: Request, res: Response): Promise<Response<Kaba>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await deleteKaba(req.params.id, headerValue);
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