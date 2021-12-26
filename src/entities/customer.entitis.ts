import { Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import { FabricType } from "./fabricType.entity";
import UserAccountRecord from "./userAccountRecord";

@Entity({name:"customer"})
export class Customer extends UserAccountRecord{
   @Column({name:"customer_code"})
   customerCode:string;
   
   @Column({name:"initiate_date"})
   initiateDate:Date = new Date();
   
   @Column({name:"expected_date"})
   expectedDate:Date = new Date();
   
   @Column({name:"customer_name"})
   customerName:string;
   
   @Column({name:"phone_number"})
   phoneNumber:string;
   
   @Column({name:"email"})
   email:string;
   
   @Column({name:"address"})
   address:string;
   
   @Column({name:"card_status"})
   cardStatus:string;
   
   @Column({name:"about_customer"})
   aboutCustomer:string;
   
   @Column({name:"profile_pic"})
   profilePic:string;
   
   @Column({name:"is_collected"})
   isCollected:boolean;

   @Column({name:"design_description"})
   designDescription:string;
   
   @Column({name:"cloth_pic"})
   clothPic:string;

   @ManyToOne(() => FabricType)
   @JoinColumn({ name: 'fabric_type', referencedColumnName: 'id' })
   fabricType: FabricType;
}