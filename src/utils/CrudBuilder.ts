import { DeepPartial, EntityTarget, getRepository } from "typeorm";

export async function save<T>(t:T, entity:EntityTarget<T>):Promise<T>{
    const data = getRepository(entity).create(t);
    return await getRepository(entity).save(data);
}
export async function findAll<T>(entity:EntityTarget<T>):Promise<T[]>{
    return await getRepository(entity).find();
}
export async function findById<T>(t:T, entity:EntityTarget<T>):Promise<T>{
    return await getRepository(entity).findOne({where: {data:t}});
}
export async function update<T>(t:T, entity:EntityTarget<T>, deep:DeepPartial<T>):Promise<T>{
    const data = await findById(t,entity);
    if(data) {
        const dataObj = getRepository(entity).merge(data, deep);
        return await getRepository(entity).save(dataObj);
    }
    return data;
}
export async function deleteObj<T>(id:T, entity:EntityTarget<T>):Promise<any>{
    const data = await findById(id,entity);
    if(data) {
        return await getRepository(entity).delete(data);
    }
    return data;
}
