export declare function typeOf(variable: any): string;
export declare enum IsType {
    "String" = 0,
    "Number" = 1,
    "Boolean" = 2,
    "Null" = 3,
    "Undefined" = 4,
    "Array" = 5,
    "Object" = 6,
    "Function" = 7,
    "Window" = 8,
    "MouseEvent" = 9,
    "Error" = 10,
    "HTMLDocument" = 11,
}
export declare function _insertAfter(parent: HTMLElement, newElement: HTMLElement, targetElement: HTMLElement): void;
export declare function _listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): Function;
export declare function _isEmptyObject(obj: object): boolean;
