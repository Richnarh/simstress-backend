import { Entity, Column} from "typeorm";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"gender_type"})
export class GenderType extends UserAccountRecord{
    @Column({name: "type_name"})
    typeName:string;
    
    @Column({name: "gender"})
    gender:string;
    
}