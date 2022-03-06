import { Request, Response, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import ApiResponse from "../system/ApiResponse";
require('dotenv').config();

export const checkJwt = (req:Request, res:Response, next:NextFunction) =>{
    console.log("checkJwt payload: ", req.body);
    console.log("checkJwt headers: ", req.headers);
    const token = <string> req.headers["auth-token"];
    console.log("token: ", token);
    let jwtPayload;

    try
    {
        jwtPayload = <any>jwt.verify(token, process.env.SECRET_KEY || "somesecretehere");
        res.locals.jwtPayload = jwtPayload;

        console.log("payload: ", jwtPayload);
        console.log("res.locals.jwtPayload: ", res.locals.jwtPayload);
    }
    catch(e)
    {
        console.log(`error: ${e}`);
        return res.json(ApiResponse.NOT_AUTHORISED({}));
    }

    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username}, process.env.SECRET_KEY || "somesecretehere", {
        expiresIn: "1h"
    })
    console.log("newToken: ", newToken);
    res.setHeader("token", newToken);

    next();
};