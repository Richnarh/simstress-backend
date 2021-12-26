import { Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import { GenderType } from "./GenderType.entity";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"sleeve"})
export class Sleeve extends UserAccountRecord{
    @Column({name:"cross_back"})
    crossBack:number;
    
    @Column({name:"sleeve_length"})
    sleeveLength:number;
    
    @Column({name:"arm"})
    arm:number;
    
    @Column({name:"wrist"})
    wrist:number;
    
    @Column({name:"chest"})
    chest:number;

    @Column({name:"shirt_length"})
    shirtLength:number;
    
    @ManyToOne(() => GenderType)
    @JoinColumn({ name: 'gender_type', referencedColumnName: 'id' })
    genderType:GenderType;
}