import {Hero_Attribute} from "./hero_attr";

export class Hero{
    id: number;
    gender:string;
    hero_name:string;
    real_name:string;
    attributes: Hero_Attribute;
    powers:string[]=[];
    weaknesses:string[]=[];

    constructor(){
        this.attributes=new Hero_Attribute();
        this.gender="Male";
    }
}
