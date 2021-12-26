import { BaseDto } from "./base/base.dto";

export interface ISleet extends BaseDto{
    sleetLength:number;
    hip:number;
    waist:number;
    shirtLength:number;
    genderType:string;
    genderTypeId:string;
}