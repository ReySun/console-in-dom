import { typeOf, IsType } from './util/index';

// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
class Console {
  private static log: Console;

  private constructor() {};

  private static DOM_NODE: HTMLElement = document.body;

  static render(node?: HTMLElement) {
    if (!Console.log) Console.log = new Console();
    if (node) Console.DOM_NODE = node;
    return Console.log;
  }

  log(msg: any) {
    let li = document.createElement('li');
    li.className = 'output-li';
    let timeLine = this._createTimeLine();
    li.appendChild(timeLine);

    if(typeOf(msg) === IsType[0]){
      let str = this._createString(msg);
      li.appendChild(str);
    }else if(typeOf(msg) === IsType[1]){
      let num = this._createNumber(msg);
      li.appendChild(num);
    }else if(typeOf(msg) === IsType[3] || typeOf(msg) === IsType[4]){
      let nulld = this._createNull(msg);
      li.appendChild(nulld);
    }else if(typeOf(msg) === IsType[5]){
      let array = this._createArray(msg);
      li.appendChild(array);
    }else if(typeOf(msg) === IsType[6]){
      let obj = this._createObject(msg);
      li.appendChild(obj);
    }

    Console.DOM_NODE.appendChild(li);
  }

  private _createString(str: string){
    let fragment = document.createDocumentFragment()
    let start = this._createCommon('"');
    let end = this._createCommon('"');
    let string = document.createElement('span');
    string.className = '_string';
    string.innerHTML = str;
    fragment.appendChild(start);
    fragment.appendChild(string);
    fragment.appendChild(end);
    return fragment;
  }

  private _createNumber(num: number){
    let number = document.createElement('span');
    number.className = '_number';
    number.innerHTML = `${num}`;
    return number;
  }

  private _createNull(msg: null|undefined){
    let nulld = document.createElement('span');
    nulld.className = '_null';
    if(typeOf(msg) === IsType[3]){
      nulld.innerHTML = 'null';
    }else if(typeOf(msg) === IsType[4]){
      nulld.innerHTML = 'undefined';
    }
    return nulld;
  }

  private _createArray(arr: any[]){
    let start = this._createCommon('[');
    let end = this._createCommon(']');
    let fragment = document.createDocumentFragment();
    fragment.appendChild(start);
    if(arr.length !== 0){
      let len = 0;
      let undefined_repeat_pos = -1;let  null_repeat_pos = -1;
      let undefined_repeat_times = 1;let null_repeat_times = 1;
      let undefined_hasRepeat = false;let null_hasRepeat = false;
      /* ergodic the Array's empty index*/
      for(let key of arr){ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
        len++;
        if(typeOf(key) === IsType[1]){
          let num = this._createNumber(key);
          fragment.appendChild(num);
        }else if(typeOf(key) === IsType[0]){
          let str = this._createString(key);
          fragment.appendChild(str);
        }else if(typeOf(key) === IsType[4]){
          let nulld = this._createNull(key);
          if(len -1 !== 0 && undefined_repeat_pos + 1 === len -1){
            undefined_repeat_times++;
          }
          if(undefined_repeat_times === 1 || undefined_repeat_pos === -1){
            fragment.appendChild(nulld);
            if(arr[len-1] === arr[len]){
              undefined_hasRepeat = true;
            }else{
              undefined_hasRepeat = false;
            }

          }else if(undefined_repeat_times !== 1 && (len === arr.length || arr[len-1] !== arr[len])){
            let repeatSpan = document.createElement('span');
            repeatSpan.className = 'null';
            repeatSpan.innerHTML = ` × ${undefined_repeat_times}`;
            repeatSpan.style.fontSize='12px'
            fragment.appendChild(repeatSpan);
            undefined_repeat_times = 1;
            undefined_hasRepeat = false;
          }
          undefined_repeat_pos = len - 1;
      }else if(typeOf(key) === IsType[3]){
          let nulld = this._createNull(key);
          if(len -1 !== 0 && null_repeat_pos + 1 === len -1){
            null_repeat_times++;
          }
          if(null_repeat_times === 1 || null_repeat_pos === -1){
            fragment.appendChild(nulld);
            if(arr[len-1] === arr[len]){
              null_hasRepeat = true;
            }else{
              null_hasRepeat = false;
            }
          }else if(null_repeat_times !== 1 && (len === arr.length || arr[len-1] !== arr[len])){
            let repeatSpan = document.createElement('span');
            repeatSpan.className = 'null';
            repeatSpan.innerHTML = ` × ${null_repeat_times}`;
            repeatSpan.style.fontSize='12px'
            fragment.appendChild(repeatSpan);
            null_repeat_times = 1;
            null_hasRepeat = false;
          }
          null_repeat_pos = len - 1;
        }
        if(len !== arr.length && undefined_repeat_times === 1 && !undefined_hasRepeat && null_repeat_times === 1 && !null_hasRepeat ){
          let comma = this._createComma();
          fragment.appendChild(comma);
        }
      }
    }
    fragment.appendChild(end);
    return fragment;
  }

  private _createObject(obj: object){
    let start = this._createCommon('[object Object] {');
    let spaceSpan = this._createSpace(7)
    let end = this._createCommon('}');
    let fragment = document.createDocumentFragment();
    fragment.appendChild(start);
    let br = document.createElement('br')
    for(let key in obj){
      fragment.appendChild(br)
      fragment.appendChild(spaceSpan)
    }

    fragment.appendChild(end);
    return fragment;
  }

  private _isEmptyObject(obj: object){
    return Object.getOwnPropertyNames(obj).length > 0 ? true : false;
  }

  /* timeline: 时间线 */
  private _createTimeLine(){
    let time = new Date();
    let timeSpan = document.createElement('span');
    timeSpan.className = '_timeLine';
    timeSpan.innerHTML = `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()}.${time.getMilliseconds() < 10 ? '00' + time.getMilliseconds() : (time.getMilliseconds() < 100 ? '0' + time.getMilliseconds() : time.getMilliseconds())}&nbsp;`;
    return timeSpan;
  }

  private _createCommon(innerHTML: string){
    let common = document.createElement('span');
    common.className = 'common';
    common.innerHTML = innerHTML;
    return common;
  }

  private _createComma(){
    let comma = document.createElement('span');
    comma.className = '_commom';
    comma.innerHTML = ', ';
    return comma;
  }

  private _createSpace(times = 1){
    let space = ''
    let spaceSpan = document.createElement('span');
    for(let i = 0;i < times; i++){
      space+='&nbsp;'
    }
    spaceSpan.innerHTML = space;
    return spaceSpan;
  }
}

export default Console
let console = Console.render()
export { console, Console as ConsoleInDom }