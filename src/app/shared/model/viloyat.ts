import { Tuman } from "./tuman";
import { User } from "./user";

export interface Viloyat{
id:number;
name:string;
admins:User;
tumans:Tuman[];

    
}