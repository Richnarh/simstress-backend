import { BaseDto } from "./base/base.dto";

export interface ITrouser extends BaseDto{
    trouserWaist:number;
    trouserLength:number;
    arm:number;
    tie:number;
    bar:number;
    hip:number;
    waistKnee:number;
    aroundKnee:number;
    genderType:string;
    genderTypeId:string;
}