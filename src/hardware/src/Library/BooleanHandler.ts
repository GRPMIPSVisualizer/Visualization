import { signalType } from "../Circuit/Signal";

export function bool2num(bool:signalType):number{
    if (bool)
        return 1;
    else
        return 0;
}

export function num2bool(num:signalType):boolean{
    if (num != 0)
        return true;
    else
        return false;
}