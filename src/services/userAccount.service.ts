import { getRepository } from "typeorm"
import { UserAccount } from "../entities/userAccount.entity"

export const findUserAccountById = async (userAccountId:string | string[] | undefined)=>{
    return await getRepository(UserAccount).findOne({ 
        where: {
            id: userAccountId
        }
    });
}

export const findAllAccounts = async() =>{
    return await getRepository(UserAccount).find();
 }

export const saveUserAccount = async(userAccount:UserAccount) =>{
    const savedObj = getRepository(UserAccount).create(userAccount);
    return await getRepository(UserAccount).save(savedObj);
}


export const updateAccount = async(id:any, obj:Object) =>{
    const userAccount = await findUserAccountById(id);
    if (userAccount)
    {
        getRepository(UserAccount).merge(userAccount, obj);
        return await getRepository(UserAccount).save(userAccount);
    }
}