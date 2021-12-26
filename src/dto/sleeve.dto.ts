import { BaseDto } from "./base/base.dto";

export interface ISleeve extends BaseDto{
    crossBack:number;
    sleeveLength:number;
    arm:number;
    wrist:number;
    chest:number;
    shirtLength:number;
    genderType:string;
    genderTypeId:string;
}   