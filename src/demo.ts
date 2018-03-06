/* console css style */
import './style/console'

import { ConsoleInDom } from './console';

const Console = ConsoleInDom.render(        //  const Console = ConsoleInDom.render()
  document.getElementById('console_output') //  default HTMLElement is body
);

Console.log('string');

Console.log(123);

Console.log(true);

Console.log(null);

Console.log(undefined);

Console.log(getElementById);

var obj = {name: "jack", age: 23};
var arr_obj = [1, 2, obj]
var arr_arr = [4, 5, 6, arr_obj, []]
function getElementById(id: string){
  var ss = 1
  return document.getElementById(id)
}

var arr = ['string',5, null,undefined,null,null,,,true,false,arr_arr,getElementById,obj];// ,1,1,,1,1,1,1,,1,1,1,11,1,1,,11,1,1,1,1,,11,1,1,1,1,1,,1,11,,1,1,,
var obj_test = {arr_obj, obj, name: "jack", age: 23, dom: getElementById, isMale: true,  class: 'senior 2'};

Console.log([]);

Console.log(arr);

Console.log({});

Console.log(obj_test);
// Console.log(window);
// document.addEventListener('dblclick',(e)=>{
//   Console.log(e)
// },false)
// Console.log(document);
// Console.log(new Error('i"m an Error'));
