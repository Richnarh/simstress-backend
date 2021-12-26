import {Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class EntityModel extends BaseEntity
{
    @Column({name: 'value_date', type: 'datetime', nullable: true})
    valueDate: Date;

    @CreateDateColumn({name: 'created_date', type: 'datetime', nullable: true})
    createdDate: Date;
   
    @UpdateDateColumn({name: 'updated_date', type: 'datetime', nullable: true})
    updatedDate: Date;

}