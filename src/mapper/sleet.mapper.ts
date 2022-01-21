import { ISleet } from "../dto/sleet.dto";
import { Sleet } from "../entities/sleet.entity";
import { findGenderTypeById } from "../services/genderType.service";
import { findUserAccountById } from "../services/auth.service";

export const toEntity = async (isleet:ISleet, userAccountId:string | string[] | undefined):Promise<Sleet> =>{
    let sleet:Sleet = new Sleet();

    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    sleet.userAccount = userAccount;

    if(isleet.genderTypeId !== null)
    {
        const genderType = await findGenderTypeById(isleet.genderTypeId);
        if(genderType === undefined)
        {
            throw new Error('Please specify gender type');
        }
        
        sleet.genderType = genderType;
    }

    sleet.shirtLength = isleet.shirtLength;
    sleet.sleetLength = isleet.sleetLength;
    sleet.waist = isleet.waist;
    sleet.hip = isleet.hip;
    
    if(isleet.valueDate == null){
        sleet.valueDate = new Date();
    }
    
    return sleet;
}

export const toDto = (sleet:Sleet):ISleet =>{
    let dto = {} as ISleet;
    console.log(sleet);
    dto.id = sleet.id;
    dto.shirtLength = sleet.shirtLength;
    dto.sleetLength = sleet.sleetLength;
    dto.waist = sleet.waist;
    dto.hip = sleet.hip;
    dto.valueDate = sleet.valueDate;
    if(sleet.genderType !== undefined || sleet.genderType !== null){
        dto.genderType = sleet.genderType.typeName;
        dto.genderTypeId = sleet.genderType.id;
    }
    
    return dto;
}