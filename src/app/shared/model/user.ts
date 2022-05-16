import { Lavozim } from "./lavozimlar";


export interface User{
    id: number;
    name: string;
    surname: string;
    fatherName: string;
    status:Boolean;
    phone:string;
    oxirgiUzgartiruvchi:User;
    roles: Array<Lavozim>;
    password:string;
    territory:number;
}
