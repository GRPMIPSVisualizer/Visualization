"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.num2bool = exports.bool2num = void 0;
function bool2num(bool) {
    if (bool)
        return 1;
    else
        return 0;
}
exports.bool2num = bool2num;
function num2bool(num) {
    if (num != 0)
        return true;
    else
        return false;
}
exports.num2bool = num2bool;
//# sourceMappingURL=BooleanHandler.js.map