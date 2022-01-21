import { getRepository } from "typeorm";
import { Trouser } from "../entities/trouser.entity";

export const findAllTrouser = async(userAccountId:string|string[]|undefined) =>{
   return await getRepository(Trouser)
                .createQueryBuilder("trouser")
                .leftJoinAndSelect("trouser.genderType", "genderType")
                .where("trouser.user_account = :userAccount", {userAccount:userAccountId})
                .getMany();
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(Trouser)
                .createQueryBuilder("trouser")
                .leftJoinAndSelect("trouser.genderType", "genderType")
                .where("trouser.user_account = :userAccount", {userAccount:userAccountId})
                .andWhere({id:id})
                .getOne();
}

export const saveTrouser = async(trouser:Trouser) =>{
    const savedObj = getRepository(Trouser).create(trouser);
    return await getRepository(Trouser).save(savedObj);
}

export const updateTrouser = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(Trouser).merge(result, obj);
        return await getRepository(Trouser).save(result);
    }
}

export const deleteTrouser = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(Trouser).delete(result.id);
    }
    return null;
}