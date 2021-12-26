import { Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import { GenderType } from "./GenderType.entity";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"sleet"})
export class Sleet extends UserAccountRecord{
    @Column({name: "sleet_length"})
    sleetLength:number;
    
    @Column({name:"hip"})
    hip:number;
    
    @Column({name:"waist"})
    waist:number;
    
    @Column({name:"shirt_length"})
    shirtLength:number;
    
    @ManyToOne(() => GenderType)
    @JoinColumn({ name: 'gender_type', referencedColumnName: 'id' })
    genderType:GenderType;
}