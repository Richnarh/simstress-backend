import { BaseDto } from "./base/base.dto";

export interface IKaba extends BaseDto{
    burst:number;
    waist:number;
    genderType:string;
    genderTypeId:string;
    shoulderToWaist:number;
    kabaLength:number;
    sleeveLength:number;
    shoulderToNipple:number;
    nippleToNipple:number;
    shoulderToBack:number;
    shoulderToCap:number;
}