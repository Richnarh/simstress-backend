import { IKaba } from "../dto/kaba.dto";
import { Kaba } from "../entities/kaba.entity";
import { findGenderTypeById } from "../services/genderType.service";
import { findUserAccountById } from "../services/userAccount.service";

export const toEntity = async (ikaba:IKaba, userAccountId:string | string[] | undefined):Promise<Kaba> =>{
    let kaba:Kaba = new Kaba();

    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    kaba.userAccount = userAccount;

    if(ikaba.genderTypeId !== null)
    {
        const genderType = await findGenderTypeById(ikaba.genderTypeId);
        if(genderType === undefined)
        {
            throw new Error('Please specify gender type');
        }
        
        kaba.genderType = genderType;
    }
    
    kaba.burst = ikaba.burst;
    kaba.waist = ikaba.waist;
    kaba.shoulderToWaist = ikaba.shoulderToWaist;
    kaba.kabaLength = ikaba.kabaLength;
    kaba.sleeveLength = ikaba.sleeveLength;
    kaba.shoulderToNipple = ikaba.shoulderToNipple;
    kaba.nippleToNipple = ikaba.nippleToNipple;
    kaba.shoulderToBack = ikaba.shoulderToBack;
    kaba.shoulderToCap = ikaba.shoulderToCap;
    
    if(ikaba.valueDate == null){
        kaba.valueDate = new Date();
    }
    
    return kaba;
}

export const toDto = (kaba:Kaba):IKaba =>{
    let dto = {} as IKaba;
    
    dto.id = kaba.id;
    dto.burst = kaba.burst;
    dto.waist = kaba.waist;
    dto.shoulderToWaist = kaba.shoulderToWaist;
    dto.kabaLength = kaba.kabaLength;
    dto.sleeveLength = kaba.sleeveLength;
    dto.shoulderToNipple = kaba.shoulderToNipple;
    dto.nippleToNipple = kaba.nippleToNipple;
    dto.shoulderToBack = kaba.shoulderToBack;
    dto.shoulderToCap = kaba.shoulderToCap;
    dto.valueDate = kaba.valueDate;
    if(kaba.genderType !== undefined || kaba.genderType !== null){
        dto.genderType = kaba.genderType.typeName;
        dto.genderTypeId = kaba.genderType.id;
    }
    return dto;
}