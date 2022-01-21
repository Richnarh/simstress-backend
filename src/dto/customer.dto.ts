import { BaseDto } from "./base/base.dto";

export interface ICustomer extends BaseDto{
    initiateDate:Date;
    expectedDate:Date;
    customerName:string;
    phoneNumber:string;
    email:string;
    address:string;
    cardStatus:string;
    aboutCustomer:string;
    profilePic:string;
    isCollected:boolean;
    designDescription:string;
    clothPic:string;
    fabricTypeName: string;
    fabricTypeId: string;
}