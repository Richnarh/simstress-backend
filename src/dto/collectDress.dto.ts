import { BaseDto } from "./base/base.dto";

export interface ICollectDress extends BaseDto{
    collectedBy:string;
    phoneNumber:String;
    location:String;
}