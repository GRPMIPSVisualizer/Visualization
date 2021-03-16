"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wirable = void 0;
var Wirable = /** @class */ (function () {
    function Wirable() {
        this.Wires = new Array();
    }
    Wirable.prototype.addWire = function (wire) {
        this.Wires.push(wire);
    };
    Wirable.prototype.updateChange = function () {
        this.Wires.forEach(function (element) {
            element.update();
        });
    };
    Wirable.prototype.getWireAt = function (index) {
        return this.Wires[index];
    };
    return Wirable;
}());
exports.Wirable = Wirable;
//# sourceMappingURL=Wirable.js.map