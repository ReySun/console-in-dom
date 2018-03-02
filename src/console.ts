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
    console.log(fragment);
    return fragment;
  }
}

export default Console.getInstance()