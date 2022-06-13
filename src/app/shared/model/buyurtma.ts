import { Xona } from './xona';
import { Xodim } from './xodim';
import { Mijoz } from './mijoz';
export interface Buyurtma{
 id:number;
 xona:Xona;
 xodim:Xodim;
 mijoz:Mijoz;
 buyurtmaYaratilganVaqt:Date;
 buyurtmaYopilganVaqt:Date;
   
}