import { IGenderType } from "../dto/genderType.dto";
import { GenderType } from "../entities/GenderType.entity";
import { findUserAccountById } from "../services/userAccount.service";

export const toEntity = async (igenderType:IGenderType, userAccountId:string | string[] | undefined):Promise<GenderType> =>{
    let genderType:GenderType = new GenderType();
    genderType.typeName = igenderType.typeName;
    genderType.gender = igenderType.gender;

    if(userAccountId === undefined)
    {
        throw new Error('Please specify a valid userAccount');
    }
    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    
    genderType.userAccount = userAccount;
    if(genderType.valueDate == null){
        genderType.valueDate = new Date();
    }
        
    return genderType;
}

export const toDto = (genderType:GenderType):IGenderType =>{
    let dto = {} as IGenderType;

    dto.id = genderType.id;
    dto.typeName = genderType.typeName;
    dto.gender = genderType.gender;
    
    return dto;
}