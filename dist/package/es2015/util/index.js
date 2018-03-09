export function typeOf(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
}
export var IsType;
(function (IsType) {
    IsType[IsType["String"] = 0] = "String";
    IsType[IsType["Number"] = 1] = "Number";
    IsType[IsType["Boolean"] = 2] = "Boolean";
    IsType[IsType["Null"] = 3] = "Null";
    IsType[IsType["Undefined"] = 4] = "Undefined";
    IsType[IsType["Array"] = 5] = "Array";
    IsType[IsType["Object"] = 6] = "Object";
    IsType[IsType["Function"] = 7] = "Function";
    IsType[IsType["Window"] = 8] = "Window";
    IsType[IsType["MouseEvent"] = 9] = "MouseEvent";
    IsType[IsType["Error"] = 10] = "Error";
    IsType[IsType["HTMLDocument"] = 11] = "HTMLDocument";
})(IsType || (IsType = {}));
export function _insertAfter(parent, newElement, targetElement) {
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextElementSibling);
    }
}
export function _listen(target, eventName, callback) {
    target.addEventListener(eventName, callback, false);
    return function () {
        target.removeEventListener(eventName, callback, false);
    };
}
export function _isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length > 0 ? false : true;
}
//# sourceMappingURL=index.js.map