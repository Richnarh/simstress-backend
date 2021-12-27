import { ISleeve } from "../dto/sleeve.dto";
import { Sleeve } from "../entities/sleeve.entity";
import { findGenderTypeById } from "../services/genderType.service";
import { findUserAccountById } from "../services/userAccount.service";

export const toEntity = async (isleeve:ISleeve, userAccountId:string | string[] | undefined):Promise<Sleeve> =>{
    let sleeve:Sleeve = new Sleeve();

    sleeve.crossBack = isleeve.crossBack;
    sleeve.sleeveLength = isleeve.sleeveLength;
    sleeve.arm = isleeve.arm;
    sleeve.wrist = isleeve.wrist;
    sleeve.chest = isleeve.chest;
    sleeve.shirtLength = isleeve.shirtLength;

    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    sleeve.userAccount = userAccount;

    if(isleeve.genderTypeId !== null)
    {
        const genderType = await findGenderTypeById(isleeve.genderTypeId);
        if(genderType === undefined)
        {
            throw new Error('Please specify gender type');
        }
         
        sleeve.genderType = genderType;
    }
    
    if(isleeve.valueDate == null){
        sleeve.valueDate = new Date();
    }
    
    return sleeve;
}

export const toDto = (sleeve:Sleeve):ISleeve =>{
    let dto = {} as ISleeve;
    dto.id = sleeve.id;
    dto.crossBack = sleeve.crossBack;
    dto.sleeveLength = sleeve.sleeveLength;
    dto.arm = sleeve.arm;
    dto.wrist = sleeve.wrist;
    dto.chest = sleeve.chest;
    dto.shirtLength = sleeve.shirtLength;
    dto.valueDate = sleeve.valueDate;
    
    if(sleeve.genderType !== undefined || sleeve.genderType !== null){
        dto.genderType = sleeve.genderType.typeName;
        dto.genderTypeId = sleeve.genderType.id;
    }
    return dto;
}