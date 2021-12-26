import { Request, Response } from "express";
import { IUserAccount } from "../dto/userAccount.dto";
import { UserAccount } from "../entities/userAccount.entity";
import { toDto, toEntity } from "../mapper/userAccount.mapper";
import { findAllAccounts, saveUserAccount, updateAccount } from "../services/userAccount.service";
import ApiResponse from "../system/ApiResponse";
import { dataUpdated } from "../system/messages";

    export const accountList = async (req: Request, res: Response): Promise<Response<UserAccount[]>> =>  {
        try 
        {
            const dtoList:IUserAccount[] = [];

            const userAccountList = await findAllAccounts();
            if (userAccountList.length > 0)
            {
                userAccountList.forEach((account: UserAccount) =>{
                    dtoList.push(toDto(account));
                });
                return res.json(ApiResponse.ok(dtoList));
            }
        } catch (error)
        {
            console.log(`error: ${error}`);
        }
        return res.send(ApiResponse.cannotFind([]))
    }

    export const createUserAccount  = async (req: Request, res: Response): Promise<Response<UserAccount>> =>  {
        try 
        {
            const entity = toEntity(req.body);
            const userAccount = await saveUserAccount(entity);
            if (userAccount !== null || userAccount !== undefined)
            {
                const dto = toDto(userAccount);
                return res.json(ApiResponse.ok(dto));
            }
        } catch (error) 
        {
            console.log(`error: ${error}`);
        }
        return res.json(ApiResponse.ERROR({}, 'Error account could not be created!'));
    }

    export const updateUserAccount =  async (req: Request, res: Response): Promise<Response<UserAccount>> =>  {
        try 
        {
            const userAccount = await updateAccount(req.params.id, req.body);
            if (userAccount)
            {
                const dto = toDto(userAccount);
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
        return res.send(ApiResponse.cannotFind([]))
    }
