import bcrypt from "bcryptjs";

export const hashPassword = (password:string):string =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

 export const comparePassword = (password: string, hashString:string) =>{
    return bcrypt.compareSync(password, hashString);
  }