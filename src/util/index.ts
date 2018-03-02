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
