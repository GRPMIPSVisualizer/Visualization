export function stringToIntArray(binaryString:string):number[]{
    let intArray:number[] = [];
        // need ES5 or higher version or right module import format
        // for(let signal of inSignalA){
        //     bitA.push(parseInt(signal));
        // }
        // for(let signal of inSignalB){
        //     bitB.push(parseInt(signal));
        // }
    for(var i = 0;i < binaryString.length;++i){
        intArray.push(parseInt(binaryString.charAt(i)));
    }
    return intArray;
} 

export function intArrayToString(intArray:number[]):string{
    return intArray.join("");
}

export function decToSignedBin32(dec:number):string{
    let bin32:string = (dec >>> 0).toString(2);
    if (dec >= 0){
        let binArr32:number[] = stringToIntArray(bin32);
        let i:number = 32;
        let out32:number[] = new Array(i);
        
        let j:number = bin32.length;
        while (i > 0){
            out32[--i] = binArr32[--j];
            if (j == 0)
                break;
        }
        while (i > 0){
            out32[--i] = 0;
        }
        return intArrayToString(out32);
    }
    lengthDetect(bin32);
    return bin32;
}

export function decToUnsignedBin32(dec:number):string{
    if (dec < 0)
        throw Error("Unsign number cannot less than zero!");
    let bin32:string = (dec >>> 0).toString(2);
    if (bin32.length < 32)
        return decToSignedBin32(dec);
    if (bin32.length == 32)
        return bin32;
    throw Error("Unsign Overflow!");
}

export function lengthDetect(binNum:string):void{
    if (binNum.length > 32)
        throw Error("binary length is longer than 32!");
}

export function bin2dec(bin:string,isUnsigned:boolean):number{
    if (bin.length != 32)
        throw Error("binary length is longer than 32!");

    let binArr:number[] = stringToIntArray(bin);
    let retNum:number = 0;
    
    if (isUnsigned)
        retNum += binArr[0]*Math.pow(2,31);
    else{
        retNum += -binArr[0]*Math.pow(2,31);
    }
    for (let i:number=1;i<bin.length;++i){
        retNum += binArr[i]*Math.pow(2,(31-i));
    }

    return retNum;
    
}

export function binaryDetect(bin:string):void{
    stringToIntArray(bin).forEach(
        bit =>{
            if (bit != 0 && bit != 1)
                throw Error("Binary data " + bin + " has invalid bit.");
        }
    );
}

export function bitsMapping(bits:string,from:number,to:number):string{
    let newFrom:number = 32 - to;
    let newTo:number = 32 - from;
    return bits.slice(newFrom,newTo);
}

export function shiftLeftBinary32Bits(binBits:string):string{
    return binBits.slice(2) + "00";
}

export function bin2hex(bin:string):string{
    return bin;
}

export function hex2bin(hex:string):string{
        return hex;
}