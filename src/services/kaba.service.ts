import { getRepository } from "typeorm";
import { Kaba } from "../entities/kaba.entity";

export const findAllKaba = async(userAccountId:string|string[]|undefined) =>{
   return await getRepository(Kaba)
                .createQueryBuilder("kaba")
                .leftJoinAndSelect("kaba.genderType", "genderType")
                .where("kaba.user_account = :userAccount", {userAccount:userAccountId})
                .getMany();
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(Kaba).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
}

export const saveKaba = async(kaba:Kaba) =>{
    const savedObj = getRepository(Kaba).create(kaba);
    return await getRepository(Kaba).save(savedObj);
}

export const updateKaba = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(Kaba).merge(result, obj);
        return await getRepository(Kaba).save(result);
    }
}

export const deleteKaba = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(Kaba).delete(result.id);
    }
    return null;
}