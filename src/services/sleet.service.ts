import { getRepository } from "typeorm";
import { Sleet } from "../entities/sleet.entity";

export const findAllSleets = async(userAccountId:string|string[]|undefined) =>{
    // return await getRepository(Sleet).find({ 
    //     where: {
    //         userAccount: userAccountId
    //     }
    // });

   return await getRepository(Sleet)
                .createQueryBuilder("sleet")
                .leftJoinAndSelect("sleet.genderType", "genderType")
                .where("sleet.user_account = :userAccount", {userAccount:userAccountId})
                .getMany();
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(Sleet).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
}

export const saveSleet = async(sleet:Sleet) =>{
    const savedObj = getRepository(Sleet).create(sleet);
    return await getRepository(Sleet).save(savedObj);
}

export const updateSleet = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(Sleet).merge(result, obj);
        return await getRepository(Sleet).save(result);
    }
}

export const deleteSleet = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(Sleet).delete(result.id);
    }
    return null;
}