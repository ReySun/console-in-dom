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
function _insertAfter(parent, newElement, targetElement) {
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextElementSibling);
    }
}
exports._insertAfter = _insertAfter;
function _listen(target, eventName, callback) {
    target.addEventListener(eventName, callback, false);
    return function () {
        target.removeEventListener(eventName, callback, false);
    };
}
exports._listen = _listen;
function _isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length > 0 ? true : false;
}
exports._isEmptyObject = _isEmptyObject;
//# sourceMappingURL=index.js.map