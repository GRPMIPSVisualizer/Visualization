import { AND } from "../Logic/AND";
import { NOT } from "../Logic/NOT"
import {OR} from "../Logic/OR"
/**
 * This is not Logic
 */
export class Mux{
    inPin1:number;
    inPin2:number;
    sel:number;
    outPin:number;
    constructor(inPin1:number,inPin2:number,Select:number){
        this.inPin1 = inPin1;
        this.inPin2 = inPin2;
        this.sel = Select;
        this.outPin =  Mux.Mux(this.inPin1,this.inPin2,this.sel);
    }

    public static Mux(inPin1:number,inPin2:number,Select:number):number{
        let nots:NOT = new NOT(Select);
        let and1:AND = new AND(inPin2,Select);
        let and2:AND = new AND(inPin1,nots.outpin);
        return OR.Or(and1.outpin,and2.outpin);
    }
}