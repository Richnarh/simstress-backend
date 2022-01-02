import { IFabricType } from "../dto/fabricType.dto";
import { FabricType } from "../entities/fabricType.entity";
import { findUserAccountById } from "../services/auth.service";

export const toEntity = async (ifabricType:IFabricType, userAccountId:string | string[] | undefined):Promise<FabricType> =>{
    let fabricType = {} as FabricType;
    fabricType.fabricName = ifabricType.fabricName;
    if(fabricType.valueDate == null){
        fabricType.valueDate = new Date();
    }

    if(userAccountId === undefined)
    {
        throw new Error('Please specify a valid userAccount');
    }
    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    fabricType.userAccount = userAccount;

    return fabricType;
}

export const toDto = (fabricType:FabricType):IFabricType =>{
    let dto = {} as IFabricType;

    dto.id = fabricType.id;
    dto.fabricName = fabricType.fabricName;
    dto.valueDate = fabricType.valueDate;
    
    return dto;
}