import { Entity, Column} from "typeorm";
import { BaseModel } from "./models/base.model";

@Entity({name:"user_accounts"})
export class UserAccount extends BaseModel{

    @Column({name:"first_name", nullable:true})
    firstName: string;

    @Column({name:"last_name", nullable:true})
    lastName: string;

    @Column({name:"email_address", nullable:true})
    emailAddress: string;

    @Column({name:"mobile_number", nullable:true})
    mobileNumber: string;

    @Column({name:"unit", nullable:true})
    unit: string;

    @Column({name:"shop_name", nullable:true})
    shopName: string;

    @Column({name:"password", nullable:true})
    password: string;
}