export function typeOf(variable: any): string{
  return Object.prototype.toString.call(variable).slice(8, -1);
}

export enum IsType{
  "String",
  "Number",
  "Boolean",
  "Null",
  "Undefined",
  "Array",
  "Object",
  "Function",
}

export function _insertAfter(parent: HTMLElement ,newElement: HTMLElement,targetElement: HTMLElement){
  if(parent.lastChild==targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextElementSibling);
  }
}

export function _listen(target: 'window'|'document'|'body'|any, eventName: string, callback: (event: any) => boolean | void): Function{
  target.addEventListener(eventName, callback, false);
  return ()=>{
    target.removeEventListener(eventName, callback, false);
  }
}

export function _isEmptyObject(obj: object){
  return Object.getOwnPropertyNames(obj).length > 0 ? true : false;
}