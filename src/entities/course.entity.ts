import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./models/entity.model";

@Entity({name:"course"})
export class Course extends EntityModel{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name:"title"})
    title:string;
    
    @Column({name:"description"})
    description:string;
}