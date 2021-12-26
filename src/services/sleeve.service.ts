import { getRepository } from "typeorm";
import { Sleeve } from "../entities/sleeve.entity";

export const findAllSleeve = async(userAccountId:string|string[]|undefined) =>{
   return await getRepository(Sleeve)
                .createQueryBuilder("sleeve")
                .leftJoinAndSelect("sleeve.genderType", "genderType")
                .where("sleeve.user_account = :userAccount", {userAccount:userAccountId})
                .getMany();
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(Sleeve).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
}

export const saveSleeve = async(sleeve:Sleeve) =>{
    const savedObj = getRepository(Sleeve).create(sleeve);
    return await getRepository(Sleeve).save(savedObj);
}

export const updateSleeve = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(Sleeve).merge(result, obj);
        return await getRepository(Sleeve).save(result);
    }
}

export const deleteSleeve = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(Sleeve).delete(result.id);
    }
    return null;
}