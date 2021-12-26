import { getRepository } from "typeorm";
import { CollectDress } from "../entities/collectDress.entity";

export const findAllCollectDress = async(userAccountId:string|string[]|undefined) =>{
    return await getRepository(CollectDress).find({ 
        where: {
            userAccount: userAccountId
        }
    });
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(CollectDress).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
}

export const saveCollectDress = async(collectDress:CollectDress) =>{
    const savedObj = getRepository(CollectDress).create(collectDress);
    return await getRepository(CollectDress).save(savedObj);
}

export const updateCollectDress = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(CollectDress).merge(result, obj);
        return await getRepository(CollectDress).save(result);
    }
}

export const deleteCollectDress = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(CollectDress).delete(result.id);
    }
    return null;
}