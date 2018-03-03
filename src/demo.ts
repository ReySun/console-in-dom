/* console css style */
import './style/console'

import { ConsoleInDom } from './console';

const Console = ConsoleInDom.render(        //  const Console = ConsoleInDom.render()
  document.getElementById('console_output') //  default HTMLElement is body
);

Console.log('string');
console.log('string');

Console.log(123);
console.log(123);

Console.log(true);
console.log(false);

Console.log(null);
console.log(null);

Console.log(undefined);
console.log(undefined);

var obj = {name: "jack", age: 23};
var arr1 = [1, 2, obj]
var arr2 = [4, 5, 6, arr1]
function     getElementById(id: string){
  var ss = 1
  return document.getElementById(id)
}
var arr = [,true,1,'string',5, null,undefined,arr2,,1,getElementById,1,1,];// ,1,1,,1,1,1,1,,1,1,1,11,1,1,,11,1,1,1,1,,11,1,1,1,1,1,,1,11,,1,1,,

Console.log(arr);
Console.log(arr);
console.log(arr);

Console.log({});
console.log({});

Console.log(getElementById);
console.log(getElementById.toString());

Console.log(obj);
console.log(obj);
