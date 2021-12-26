import { Request, Response } from "express";
import { IGenderType } from "../dto/genderType.dto";
import { GenderType } from "../entities/GenderType.entity";
import { toDto, toEntity } from "../mapper/genderType.mapper";
import { deleteGenderType, findAllGenderType, findById, saveGenderType, updateGenderType } from "../services/genderType.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

    export const findAll = async (req: Request, res: Response): Promise<Response<GenderType[]>> =>{
        try
        {
            const dtoList:IGenderType[] = [];
            let headerValue = req.headers["useraccountid"];
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const genderTypeList = await findAllGenderType(headerValue);

            if (genderTypeList.length > 0)
            {
                genderTypeList.forEach((genderType: GenderType) =>{
                    dtoList.push(toDto(genderType));
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
    
    export const getById = async (req: Request, res: Response): Promise<Response<GenderType>> =>
    {
        try
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const entity = await toEntity(req.body, headerValue);
            if(entity !== undefined)
            {
                const dto = toDto(entity);
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

    export const createGenderType = async (req: Request, res: Response): Promise<Response<GenderType>> =>
    {
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const entity = await toEntity(req.body, headerValue);
            const genderType = await saveGenderType(entity);
            if (genderType !== null || genderType !== undefined)
            {
                const dto = toDto(genderType);
                return res.json(ApiResponse.ok(dto));
            }
        } catch (error) 
        {
            console.log(`error: ${error}`);
        }
        return res.json(ApiResponse.ERROR({},'Error: record could not be created!'));
    }

    export const updateGender = async (req: Request, res: Response): Promise<Response<GenderType>> =>{
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const entity = await toEntity(req.body, headerValue);
            const result = await updateGenderType(req.params.id, entity, headerValue);
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

    export const deleteGender = async (req: Request, res: Response): Promise<Response<GenderType>> =>
    {
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const result = await deleteGenderType(req.params.id, headerValue);
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