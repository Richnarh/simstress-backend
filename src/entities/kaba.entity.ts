import { Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import { GenderType } from "./GenderType.entity";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"kaba"})
export class Kaba extends UserAccountRecord{
   @Column({name:"burst"})
   burst:number;
   
   @Column({name:"waist"})
   waist:number;
   
   @ManyToOne(() => GenderType)
   @JoinColumn({ name:"gender_type", referencedColumnName:"id"})
   genderType:GenderType;
   
   @Column({name:"shoulder_to_waist"})
   shoulderToWaist:number;
   
   @Column({name:"blouse_length"})
   kabaLength:number;
   
   @Column({name:"sleeve_length"})
   sleeveLength:number;
   
   @Column({name:"shoulder_to_nipple"})
   shoulderToNipple:number;
   
   @Column({name:"nipple_to_nipple"})
   nippleToNipple:number;
   
   @Column({name:"shoulder_to_back"})
   shoulderToBack:number;
   
   @Column({name:"shoulder_to_cap"})
   shoulderToCap:number;
}