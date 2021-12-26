import { Entity, Column} from "typeorm";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"collect_dress"})
export class CollectDress extends UserAccountRecord{
    @Column({name: "collected_by"})
    collectedBy:string;
    
    @Column({name: "phone_number"})
    phoneNumber:String;
    
    @Column({name: "location"})
    location:String;
}