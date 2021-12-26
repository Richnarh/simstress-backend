import { getRepository } from "typeorm";
import { GenderType } from "../entities/GenderType.entity";

export const findAllGenderType = async(userAccountId:string|string[]|undefined) =>{
    return await getRepository(GenderType).find({ 
        where: {
            userAccount: userAccountId
        }
    });
 }

export const findGenderTypeById = async (genderTypeId:string)=>{
    return await getRepository(GenderType).findOne({ 
        where: {
            id: genderTypeId
        }
    });
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(GenderType).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
 }
 
 export const saveGenderType = async(genderType:GenderType) =>{
     const savedObj = getRepository(GenderType).create(genderType);
     return await getRepository(GenderType).save(savedObj);
 }
 
 export const updateGenderType = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
     if (result)
     {
         getRepository(GenderType).merge(result, obj);
         return await getRepository(GenderType).save(result);
     }
 }
 
 export const deleteGenderType = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(GenderType).delete(result.id);
    }
    return null;
 }