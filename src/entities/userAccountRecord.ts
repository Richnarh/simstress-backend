import { JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "./models/base.model";
import { UserAccount } from "./userAccount.entity";

class UserAccountRecord extends BaseModel
{
    @ManyToOne(() => UserAccount)
    @JoinColumn({ name: 'user_account', referencedColumnName: 'id' })
    userAccount: UserAccount;
}
export default UserAccountRecord;


