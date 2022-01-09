export interface IUserAccount{
    id:string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNumber: string;
    unit: string;
    shopName: string;
    username: string;
    password: string;
    valueDate:Date;
    token?:string;
}