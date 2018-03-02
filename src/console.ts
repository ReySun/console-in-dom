import { typeOf, IsType } from './util/index'

// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
class Console {
  private static log: Console;
  private constructor() {}
  static getInstance() {
    if (!Console.log) Console.log = new Console();
    return Console.log;
  }
  log(msg: any) {
    var li = document.createElement('li');
    li.className = 'output-li';
    var timeLine = this._createTimeLine();
    li.appendChild(timeLine);

    if(typeOf(msg) === IsType[0]){
      var str = this._createString(msg);
      li.appendChild(str);
    }else if(typeOf(msg) === IsType[1]){
      var num = this._createNumber(msg);
      li.appendChild(num);
    }else if(typeOf(msg) === IsType[3] || typeOf(msg) === IsType[4]){
      var nulld = this._createNull(msg);
      li.appendChild(nulld);
    }

    document.body.appendChild(li);
  }

  private _createCommon(innerHTML: string){
    var common = document.createElement('span');
    common.className = 'common';
    common.innerHTML = innerHTML;
    return common;
  }

  /* timeline: 时间线 */
  private _createTimeLine(){
    var time = new Date();
    var timeSpan = document.createElement('span');
    timeSpan.className = '_timeLine';
    timeSpan.innerHTML = `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()}.${time.getMilliseconds() < 10 ? '00' + time.getMilliseconds() : (time.getMilliseconds() < 100 ? '0' + time.getMilliseconds() : time.getMilliseconds())}&nbsp;`;
    return timeSpan;
  }

  private _createString(str: string){
    var fragment = document.createDocumentFragment()
    var start = this._createCommon('"');
    var end = this._createCommon('"');
    var string = document.createElement('span');
    string.className = '_string';
    string.innerHTML = str;
    fragment.appendChild(start);
    fragment.appendChild(string);
    fragment.appendChild(end);
    return fragment;
  }

  private _createComma(){
    var comma = document.createElement('span');
    comma.className = '_commom';
    comma.innerHTML = ', ';
    return comma;
  }

  private _createNumber(num: number){
    var number = document.createElement('span');
    number.className = '_number';
    number.innerHTML = `${num}`;
    return number;
  }
  private _createNull(msg: null|undefined){
    var nulld = document.createElement('span');
    nulld.className = '_null';
    console.log(msg);
    if(typeOf(msg) === IsType[3]){
        nulld.innerHTML = 'null';
    }else if(typeOf(msg) === IsType[4]){
        nulld.innerHTML = 'undefined';
    }
    return nulld;
  }

//   private _createArray(arr: [any]){
//     var start = this._createCommon('[');
//     var end = this._createCommon(']');
//     var fragment = document.createDocumentFragment();
//     fragment.appendChild(start);
//     if(arr.length != `0`){
//         var len = 0;
//         var undefined_repeat_pos = -1;var  null_repeat_pos = -1;
//         var undefined_repeat_times = 1;var null_repeat_times = 1;
//         var undefined_hasRepeat = false;var null_hasRepeat = false;
//         /* ergodic the Array's empty index*/
//         for(var key of arr){ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//             len++;
//             if(util.type(key) === 'Number'){
//                 var num = this._createNumber(key);
//                 fragment.appendChild(num);
//             }else if(util.type(key) === 'String'){
//                 var str = this._createString(key);
//                 fragment.appendChild(str);
//             }else if(util.type(key) === 'Undefined'){
//                 var nulld = this._createNull(key);
//                 if(len -1 !== 0 && undefined_repeat_pos + 1 === len -1){
//                     undefined_repeat_times++;
//                 }
//                 if(undefined_repeat_times === 1 || undefined_repeat_pos === -1){
//                     fragment.appendChild(nulld);
//                     if(arr[len-1] === arr[len]){
//                         undefined_hasRepeat = true;
//                     }else{
//                         undefined_hasRepeat = false;
//                     }

//                 }else if(undefined_repeat_times !== 1 && (len === arr.length || arr[len-1] !== arr[len])){
//                     var repeatSpan = document.createElement('span');
//                     repeatSpan.className = 'null';
//                     repeatSpan.innerHTML = ` × ${undefined_repeat_times}`;
//                     repeatSpan.style.fontSize='12px'
//                     fragment.appendChild(repeatSpan);
//                     undefined_repeat_times = 1;
//                     undefined_hasRepeat = false;
//                 }
//                 undefined_repeat_pos = len - 1;
//             }else if(util.type(key) === 'Null'){
//                 var nulld = this._createNull(key);
//                 if(len -1 !== 0 && null_repeat_pos + 1 === len -1){
//                     null_repeat_times++;
//                 }
//                 if(null_repeat_times === 1 || null_repeat_pos === -1){
//                     fragment.appendChild(nulld);
//                     if(arr[len-1] === arr[len]){
//                         null_hasRepeat = true;
//                     }else{
//                         null_hasRepeat = false;
//                     }
//                 }else if(null_repeat_times !== 1 && (len === arr.length || arr[len-1] !== arr[len])){
//                     var repeatSpan = document.createElement('span');
//                     repeatSpan.className = 'null';
//                     repeatSpan.innerHTML = ` × ${null_repeat_times}`;
//                     repeatSpan.style.fontSize='12px'
//                     fragment.appendChild(repeatSpan);
//                     null_repeat_times = 1;
//                     null_hasRepeat = false;
//                 }
//                 null_repeat_pos = len - 1;
//             }
//             if(len !== arr.length && undefined_repeat_times === 1 && !undefined_hasRepeat && null_repeat_times === 1 && !null_hasRepeat ){
//                 var comma = this._createComma();
//                 fragment.appendChild(comma);
//             }
//         }
//     }
//     fragment.appendChild(end);
//     return fragment;
//   }
}

export default Console.getInstance()