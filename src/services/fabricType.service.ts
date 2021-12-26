import { getRepository } from "typeorm";
import { FabricType } from "../entities/fabricType.entity";

export const findAllFabricType = async(userAccountId:string|string[]|undefined) =>{
    return await getRepository(FabricType).find({ 
        where: {
            userAccount: userAccountId
        }
    });
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
   return await getRepository(FabricType).findOne({ 
    where: {
        id:id,
        userAccount: userAccountId
    }
});
}

export const saveFabricType = async(fabricType:FabricType) =>{
    const savedObj = getRepository(FabricType).create(fabricType);
    return await getRepository(FabricType).save(savedObj);
}

export const updateFabric = async(id:any, obj:FabricType, userAccountId:string|string[]|undefined) =>{
    const fabricType = await findById(id, userAccountId);
    if (fabricType)
    {
        getRepository(FabricType).merge(fabricType, obj);
        return await getRepository(FabricType).save(fabricType);
    }
}

export const deleteFabric = async(id:any, userAccountId:string|string[]|undefined) =>{
    const fabricType = await findById(id, userAccountId);
    if(fabricType){
        return await getRepository(FabricType).delete(fabricType.id);
    }
    return null;
}