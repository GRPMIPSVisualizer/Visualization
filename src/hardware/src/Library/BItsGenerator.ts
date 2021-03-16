import { intArrayToString } from "./StringHandle";

export function init_bits(bitWidth:number):string{
    let bits:number[] = new Array<number>();
    for(let i:number=0;i<bitWidth;++i){
        bits.push(0);
    }
    return intArrayToString(bits);
}
