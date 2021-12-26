import { Request, Response } from "express";
import { IFabricType } from "../dto/fabricType.dto";
import { FabricType } from "../entities/fabricType.entity";
import { toDto, toEntity } from "../mapper/fabricType.mapper";
import { deleteFabric, findAllFabricType, findById, saveFabricType, updateFabric } from "../services/fabricType.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

    export const findAll = async (req: Request, res: Response): Promise<Response<FabricType[]>> =>
    {
        const dtoList:IFabricType[] = [];
        try
        {
            let headerValue = req.headers["useraccountid"];
            console.log("useraccountid: ", headerValue);
            if(headerValue == undefined)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const fabricList = await findAllFabricType(headerValue);


            if (fabricList.length > 0)
            {
                fabricList.forEach((fabric: FabricType) =>{
                    dtoList.push(toDto(fabric));
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

    
    export const getById = async (req: Request, res: Response): Promise<Response<FabricType>> =>
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

    
    export const createFabricType = async (req: Request, res: Response): Promise<Response<FabricType>> =>
    {
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == null)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const entity = await toEntity(req.body, headerValue);
            const fabricType = await saveFabricType(entity);
            if (fabricType !== null || fabricType !== undefined)
            {
                const dto = toDto(fabricType);
                return res.json(ApiResponse.ok(dto));
            }
        } catch (error) 
        {
            console.log(`error: ${error}`);
        }
        return res.json(ApiResponse.ERROR({},'Error: record could not be created!'));
    }

    export const updateFabricType = async (req: Request, res: Response): Promise<Response<FabricType>> =>
    {
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == null)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const entity = await toEntity(req.body, headerValue);
            const fabricType = await updateFabric(req.params.id, entity, headerValue);
            if (fabricType)
            {
                const dto = toDto(fabricType);
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

    export const deleteFabricType = async (req: Request, res: Response): Promise<Response<FabricType>> =>
    {
        try 
        {
            let headerValue = req.headers["useraccountid"];
            if(headerValue == null)
            {
                return res.json(ApiResponse.ERROR({}, accountIdNotFound));
            }
            const result = await deleteFabric(req.params.id, headerValue);
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

