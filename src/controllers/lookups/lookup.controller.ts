import { Request, Response } from "express";
import { LookupItem } from "../../lookup-obj/lookup.dto";
import { CardStatus, DressTypes, Gender, Relationship, TypeName, Units } from "../../lookup-obj/lookup.object";
import { findAllFabricType } from "../../services/fabricType.service";
import ApiResponse from "../../system/ApiResponse";
import { accountIdNotFound } from "../../system/messages";

    export const units = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let unit of Units)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = unit.id;
            lookupItem.itemName = unit.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const relationship = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let relationship of Relationship)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = relationship.id;
            lookupItem.itemName = relationship.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const cardStatus = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let cards of CardStatus)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = cards.id;
            lookupItem.itemName = cards.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const dressType = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let dressType of DressTypes)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = dressType.id;
            lookupItem.itemName = dressType.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const fabricType = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        let headerValue = req.headers["useraccountid"];
        
        if(headerValue == undefined)
        {
            return res.json(ApiResponse.ERROR({}, accountIdNotFound));
        }
        const fabricList = await findAllFabricType(headerValue);

        for(let fabric of fabricList)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = fabric.id;
            lookupItem.itemName = fabric.fabricName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const gender = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let gender of Gender)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = gender.id;
            lookupItem.itemName = gender.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }

    export const typeName = async (req: Request, res: Response): Promise<Response> => {
       try 
       {
        
        let lookupItemList = [];
        for(let gtype of TypeName)
        {
            let lookupItem = {} as LookupItem<string,string>;

            lookupItem.id = gtype.id;
            lookupItem.itemName = gtype.itemName;

            lookupItemList.push(lookupItem);
        }

        return res.json(ApiResponse.ok(lookupItemList));

       } catch (error) 
       {
        console.log(`error: ${error}`);
       }
       return res.json(ApiResponse.cannotFind([]));
    }
