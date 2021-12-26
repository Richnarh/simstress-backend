import StatusCode from "./httpStatusCode";
import { dataCreated,dataNotFound,successAction, unknownError } from "./messages";

class ApiResponse
{
    static ok = (T:Object) => {
        return {
            success: true,
            status:StatusCode.OK,
            message:successAction,
            data:T
        }
    }
    
    static OK = (T:Object, message:string) => {
        return {
            success: true,
            status:StatusCode.OK,
            message:message,
            data:T
        }
    }

    static created = (T:Object) => {
        return {
            success: true,
            status:StatusCode.CREATED,
            message:dataCreated,
            data:T
        }
    }

    static error = (T:Object) => {
        return {
            success: false,
            status:StatusCode.BAD_REQUEST,
            message:unknownError,
            data:T
        }
    }

    static cannotFind = (T:Object) => {
        return {
            success: true,
            status:StatusCode.NOT_FOUND,
            message:dataNotFound,
            data:T
        }
    }

    static ERROR = (T:Object, message:string) => {
        return {
            success: false,
            status:StatusCode.BAD_REQUEST,
            message:message,
            data:T
        }
    }
}

export default ApiResponse;

