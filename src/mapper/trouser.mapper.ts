import { ITrouser } from "../dto/trouser.dto";
import { Trouser } from "../entities/trouser.entity";
import { findGenderTypeById } from "../services/genderType.service";
import { findUserAccountById } from "../services/userAccount.service";

export const toEntity = async (iTrouser:ITrouser, userAccountId:string | string[] | undefined):Promise<Trouser> =>{
    let trouser:Trouser = new Trouser();
    
    trouser.trouserWaist = iTrouser.trouserWaist;
    trouser.trouserLength = iTrouser.trouserLength;
    trouser.arm = iTrouser.arm;
    trouser.tie = iTrouser.tie;
    trouser.bar = iTrouser.bar;
    trouser.hip = iTrouser.hip;
    trouser.waistKnee = iTrouser.waistKnee;
    trouser.aroundKnee = iTrouser.aroundKnee;
   
    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    trouser.userAccount = userAccount;

    if(iTrouser.genderTypeId !== null)
    {
        const genderType = await findGenderTypeById(iTrouser.genderTypeId);
        if(genderType === undefined)
        {
            throw new Error('Please specify gender type');
        }
         
        trouser.genderType = genderType;
    }
    
    if(iTrouser.valueDate == null){
        trouser.valueDate = new Date();
    }
    
    return trouser;
}

export const toDto = (trouser:Trouser):ITrouser =>{
    let dto = {} as ITrouser;
    dto.id = trouser.id;
    dto.trouserWaist = trouser.trouserWaist;
    dto.trouserLength = trouser.trouserLength;
    dto.arm = trouser.arm;
    dto.tie = trouser.tie;
    dto.bar = trouser.bar;
    dto.hip = trouser.hip;
    dto.waistKnee = trouser.waistKnee;
    dto.aroundKnee = trouser.aroundKnee;
    dto.valueDate = trouser.valueDate;
    
    if(trouser.genderType !== undefined || trouser.genderType !== null){
        dto.genderType = trouser.genderType.typeName;
        dto.genderTypeId = trouser.genderType.id;
    }
    return dto;
}