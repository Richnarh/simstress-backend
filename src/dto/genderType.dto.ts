import { BaseDto } from "./base/base.dto";

export interface IGenderType extends BaseDto{
    typeName:string;
    gender:string;
}