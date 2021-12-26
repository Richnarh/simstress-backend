import { Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import { GenderType } from "./GenderType.entity";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"trouser"})
export class Trouser extends UserAccountRecord{
    @Column({name:"trouser_waist"})
    trouserWaist:number;
    
    @Column({name:"trouser_length"})
    trouserLength:number;
    
    @Column({name:"arm"})
    arm:number;
    
    @Column({name:"tie"})
    tie:number;
    
    @Column({name:"bar"})
    bar:number;

    @Column({name:"hip"})
    hip:number;
    
    @Column({name:"waist_knee"})
    waistKnee:number;
    
    @Column({name:"around_knee"})
    aroundKnee:number;
    
    @ManyToOne(() => GenderType)
    @JoinColumn({name:"gender_type", referencedColumnName:"id"})
    genderType:GenderType;
}