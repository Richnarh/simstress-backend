import { IUserAccount } from "../dto/userAccount.dto";
import { UserAccount } from "../entities/userAccount.entity";
import { hashPassword } from "../utils/validation.utils";


export const toEntity = (iUserAccount:IUserAccount):UserAccount =>{

    let userAccount:UserAccount = new UserAccount();

    userAccount.firstName = iUserAccount.firstName;
    userAccount.lastName = iUserAccount.lastName;
    userAccount.mobileNumber = iUserAccount.mobileNumber;
    userAccount.shopName = iUserAccount.shopName;
    userAccount.emailAddress = iUserAccount.emailAddress;
    userAccount.username = iUserAccount.username;
    userAccount.unit = iUserAccount.unit;
    userAccount.valueDate = new Date();
    userAccount.password = hashPassword(iUserAccount.password);
    console.log('hash password: ',userAccount.password);
    return userAccount;
}

export const toDto = (userAccount:UserAccount, token?:string):IUserAccount =>{
    let dto = {} as IUserAccount;

    dto.id = userAccount.id;
    dto.firstName = userAccount.firstName;
    dto.lastName = userAccount.lastName;
    dto.mobileNumber = userAccount.mobileNumber;
    dto.shopName = userAccount.shopName;
    dto.unit = userAccount.unit;
    dto.emailAddress = userAccount.emailAddress;
    dto.username = userAccount.username;
    dto.valueDate = new Date();
    dto.token = token;
    return dto;
}