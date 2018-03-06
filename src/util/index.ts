export function typeOf(variable: any): string{
  return Object.prototype.toString.call(variable).slice(8, -1);
}

export enum IsType{
  "String",/* 0 */
  "Number",/* 1 */
  "Boolean",/* 2 */
  "Null",/* 3 */
  "Undefined",/* 4 */
  "Array",/* 5 */
  "Object",/* 6 */
  "Function",/* 7 */
  "Window",/* 8 */
  "MouseEvent",/* 9 */
  "Error",/* 10 */
  "HTMLDocument",/* 11 */
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
  return Object.getOwnPropertyNames(obj).length > 0 ? false : true;
}