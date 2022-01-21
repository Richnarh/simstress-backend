import { Request, Response } from "express";
import { ICustomer } from "../dto/customer.dto";
import { Customer } from "../entities/customer.entitis";
import { toDto, toEntity } from "../mapper/customer.mapper";
import { deleteCust, findAllCustomers, findById, saveCustomer, updateCustomers } from "../services/customer.service";
import ApiResponse from "../system/ApiResponse";
import { accountIdNotFound, dataRemoved, dataUpdated } from "../system/messages";

export const findAll = async (req: Request, res: Response): Promise<Response<Customer>> =>
{
    const dtoList:ICustomer[] = [];
    try
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const customerList = await findAllCustomers(headerValue);
        if (customerList.length > 0)
        {
            customerList.forEach((customer: Customer) =>{
                dtoList.push(toDto(customer));
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

    
export const getById = async (req: Request, res: Response): Promise<Response<Customer>> =>
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

export const createCustomer = async (req: Request, res: Response): Promise<Response<Customer>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await saveCustomer(entity);
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

export const updateCustomer = async (req: Request, res: Response): Promise<Response<Customer>> =>{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const entity = await toEntity(req.body, headerValue);
        const result = await updateCustomers(req.params.id, entity, headerValue);
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

export const deleteCustomer = async (req: Request, res: Response): Promise<Response<Customer>> =>
{
    try 
    {
        let headerValue = req.headers["useraccountid"];
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const result = await deleteCust(req.params.id, headerValue);
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