/* console css style */
import './style/console'

import { IsType, typeOf } from './util/index';
import { ConsoleInDom } from './console';

const Console = ConsoleInDom.render(        //  const Console = ConsoleInDom.render()
  document.getElementById('console_output') //  default HTMLElement is body
);

Console.log('string');
console.log('string');

Console.log(123);
console.log(123);

Console.log(null);
console.log(null);

Console.log(undefined);
console.log(undefined);

var obj = {name: "jack", age: 23};
var arr = [,,1,,,,5,,"2", null, null, null, undefined, null,,,];

Console.log(arr);
console.log(arr);

Console.log({});
console.log({});
