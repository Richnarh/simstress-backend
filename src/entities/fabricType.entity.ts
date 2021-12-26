import { Entity, Column} from "typeorm";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"fabric_types"})
export class FabricType extends UserAccountRecord{
    @Column({name:"fabric_name"})
    fabricName:string;      
}