import { Lavozim } from "./lavozimlar";




export interface Xodim {
    id: number;
    pasportId:string;
    ism:string;
    familiya:string;
    jins:string;
    boshVaqt:Date;
    tugashVaqt:Date;
    lavozim:Lavozim;

}

