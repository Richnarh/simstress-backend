import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IUserAccount } from "../dto/userAccount.dto";
import { UserAccount } from "../entities/userAccount.entity";
import { toDto, toEntity } from "../mapper/userAccount.mapper";
import { findAllAccounts, login, saveUserAccount, updateAccount } from "../services/auth.service";
import ApiResponse from "../system/ApiResponse";
import { dataUpdated } from "../system/messages";
import { comparePassword, hashPassword } from "../utils/validation.utils";

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

    export const signup  = async (req: Request, res: Response): Promise<Response<UserAccount>> =>  {
        try 
        {
            const entity = toEntity(req.body);
            const userAccount = await saveUserAccount(entity);
            if (userAccount !== null || userAccount !== undefined)
            {
                const dto = toDto(userAccount);

                const token = jwt.sign(
                    { userId: userAccount.id, username: userAccount.username }, process.env.SECRET || "somesecretehere",
                    { expiresIn: "1h" } 
                  );
        
                return res.header("auth-token", token).json(ApiResponse.ok(dto));
            }
            else
            {
                return res.json(ApiResponse.ERROR({}, 'Username/Email taken'));  
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

    export const doLogin = async (req:Request, res:Response) =>{
        console.log(req.body);

        let { username, password } = req.body;
        
        if (!(username && password)) 
        {
          res.status(400).send();
        }  

        const singleUser = await login(username);
        console.log("singleUser: ", singleUser);

        const checkPassword:boolean = comparePassword(password, singleUser.password);

        if(checkPassword){
            console.log("Password matched");
            const token = jwt.sign(
                { userId: singleUser.id, username: singleUser.username },
                process.env.SECRET || "somesecretehere",
                { expiresIn: "1h" } 
              );
    
             return res.header("auth-token", token).json(singleUser);
        }
        if(!checkPassword)
        {
            console.log("password do not match");
            return res.json(ApiResponse.ERROR([], "Password do not match"));
        }

        if(!singleUser){
            return res.json(ApiResponse.ERROR([], "Incorrect username/password"));
        }
    }
