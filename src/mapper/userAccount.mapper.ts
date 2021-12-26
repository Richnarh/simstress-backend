import { IUserAccount } from "../dto/userAccount.dto";
import { UserAccount } from "../entities/userAccount.entity";


export const toEntity = (iUserAccount:IUserAccount):UserAccount =>{

    let userAccount:UserAccount = new UserAccount();

    userAccount.firstName = iUserAccount.firstName;
    userAccount.lastName = iUserAccount.lastName;
    userAccount.mobileNumber = iUserAccount.mobileNumber;
    userAccount.shopName = iUserAccount.shopName;
    userAccount.unit = iUserAccount.unit;
    userAccount.valueDate = new Date();
    userAccount.password = iUserAccount.password;

    return userAccount;
}

export const toDto = (userAccount:UserAccount):IUserAccount =>{
    let dto = {} as IUserAccount;

    dto.id = userAccount.id;
    dto.firstName = userAccount.firstName;
    dto.lastName = userAccount.lastName;
    dto.mobileNumber = userAccount.mobileNumber;
    dto.shopName = userAccount.shopName;
    dto.unit = userAccount.unit;
    dto.valueDate = new Date();
    
    return dto;
}