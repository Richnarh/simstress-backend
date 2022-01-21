import { findUserAccountById } from "../services/auth.service";
import { Customer } from "../entities/customer.entitis";
import { ICustomer } from "../dto/customer.dto";
import { findFabricTypeById } from "../services/fabricType.service";

export const toEntity = async (iCustomer:ICustomer, userAccountId:string | string[] | undefined):Promise<Customer> =>{
    let customer:Customer = new Customer();

    customer.initiateDate = iCustomer.initiateDate;
    customer.expectedDate = iCustomer.expectedDate;
    customer.customerName = iCustomer.customerName;
    customer.phoneNumber = iCustomer.phoneNumber;
    customer.email = iCustomer.email;
    customer.address = iCustomer.address;
    customer.cardStatus = iCustomer.cardStatus;
    customer.aboutCustomer = iCustomer.aboutCustomer;
    customer.isCollected = iCustomer.isCollected;
    customer.designDescription = iCustomer.designDescription;

    if(iCustomer.fabricTypeId !== null)
    {
        const fabricType = await findFabricTypeById(iCustomer.fabricTypeId);
        if(fabricType === undefined)
        {
            throw new Error('Please specify fabric type');
        }
        
        customer.fabricType = fabricType;
    }

    const userAccount = await findUserAccountById(userAccountId);
    
    if(userAccount === undefined)
    {
        throw new Error('User with the id: '+ userAccountId + ' not found');
    }
    customer.userAccount = userAccount;

    if(iCustomer.valueDate == null){
        customer.valueDate = new Date();
    }
    
    return customer;
}

export const toDto = (customer:Customer):ICustomer =>{
    let dto = {} as ICustomer;

    dto.id = customer.id;
    dto.initiateDate = customer.initiateDate;
    dto.expectedDate = customer.expectedDate;
    dto.customerName = customer.customerName;
    dto.phoneNumber = customer.phoneNumber;
    dto.email = customer.email;
    dto.address = customer.address;
    dto.cardStatus = customer.cardStatus;
    dto.aboutCustomer = customer.aboutCustomer;
    dto.isCollected = customer.isCollected;
    dto.designDescription = customer.designDescription;
    dto.valueDate = customer.valueDate;
    
    if(customer.fabricType !== undefined || customer.fabricType !== null){
        dto.fabricTypeName = customer.fabricType.fabricName;
        dto.fabricTypeId = customer.fabricType.id;
    }
    return dto;
}