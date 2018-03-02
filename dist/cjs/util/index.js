"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function typeOf(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
}
exports.typeOf = typeOf;
var IsType;
(function (IsType) {
    IsType[IsType["String"] = 0] = "String";
    IsType[IsType["Number"] = 1] = "Number";
    IsType[IsType["Boolean"] = 2] = "Boolean";
    IsType[IsType["Null"] = 3] = "Null";
    IsType[IsType["Undefined"] = 4] = "Undefined";
    IsType[IsType["Array"] = 5] = "Array";
    IsType[IsType["Object"] = 6] = "Object";
    IsType[IsType["Function"] = 7] = "Function";
})(IsType = exports.IsType || (exports.IsType = {}));
//# sourceMappingURL=index.js.map