import { Sektor } from "./sektor";
import { Viloyat } from "./viloyat";

export interface Tuman{
    id: number;
    name: string;
   sektors:Sektor[];
}