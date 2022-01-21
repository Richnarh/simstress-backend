import { ICollectDress } from "../dto/collectDress.dto";
import { CollectDress } from "../entities/collectDress.entity";
import { findUserAccountById } from "../services/auth.service";

export const toEntity = async (iCollectDress:ICollectDress, userAccountId:string | string[] | undefined):Promise<CollectDress> =>{
    let collectDress:CollectDress = new CollectDress();

    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    collectDress.userAccount = userAccount;

    collectDress.collectedBy = iCollectDress.collectedBy;
    collectDress.phoneNumber = iCollectDress.phoneNumber;
    collectDress.location = iCollectDress.location;
    
    if(iCollectDress.valueDate == null){
        collectDress.valueDate = new Date();
    }
    
    return collectDress;
}

export const toDto = (collectDress:CollectDress):ICollectDress =>{
    let dto = {} as ICollectDress;

    dto.id = collectDress.id;
    dto.collectedBy = collectDress.collectedBy;
    dto.phoneNumber = collectDress.phoneNumber;
    dto.location = collectDress.location;
    dto.valueDate = collectDress.valueDate;
    
    return dto;
}