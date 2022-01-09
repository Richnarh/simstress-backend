import { getRepository } from "typeorm";
import { Customer } from "../entities/customer.entitis";

export const findAllCustomers = async(userAccountId:string|string[]|undefined) =>{

   return await getRepository(Customer)
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.fabricType", "fabricType")
                .where("customer.user_account = :userAccount", {userAccount:userAccountId})
                .getMany();
}

export const findById = async(id:any, userAccountId:string|string[]|undefined) =>{
    return await getRepository(Customer).findOne({ 
        where: {
            id:id,
            userAccount: userAccountId
        }
    });
}

export const saveCustomer = async(customer:Customer) =>{
    const savedObj = getRepository(Customer).create(customer);
    return await getRepository(Customer).save(savedObj);
}

export const updateCustomers = async(id:any, obj:Object, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if (result)
    {
        getRepository(Customer).merge(result, obj);
        return await getRepository(Customer).save(result);
    }
}

export const deleteCust = async(id:any, userAccountId:string|string[]|undefined) =>{
    const result = await findById(id, userAccountId);
    if(result){
        return await getRepository(Customer).delete(result.id);
    }
    return null;
}