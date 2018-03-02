"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./util/index");
// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
var Console = /** @class */ (function () {
    function Console() {
    }
    ;
    Console.render = function (node) {
        if (!Console.log)
            Console.log = new Console();
        if (node)
            Console.DOM_NODE = node;
        return Console.log;
    };
    Console.prototype.log = function (msg) {
        var li = document.createElement('li');
        li.className = 'output-li';
        var timeLine = this._createTimeLine();
        li.appendChild(timeLine);
        if (index_1.typeOf(msg) === index_1.IsType[0]) {
            var str = this._createString(msg);
            li.appendChild(str);
        }
        else if (index_1.typeOf(msg) === index_1.IsType[1]) {
            var num = this._createNumber(msg);
            li.appendChild(num);
        }
        else if (index_1.typeOf(msg) === index_1.IsType[3] || index_1.typeOf(msg) === index_1.IsType[4]) {
            var nulld = this._createNull(msg);
            li.appendChild(nulld);
        }
        else if (index_1.typeOf(msg) === index_1.IsType[5]) {
            var array = this._createArray(msg);
            li.appendChild(array);
        }
        else if (index_1.typeOf(msg) === index_1.IsType[6]) {
            var obj = this._createObject(msg);
            li.appendChild(obj);
        }
        Console.DOM_NODE.appendChild(li);
    };
    Console.prototype._createString = function (str) {
        var fragment = document.createDocumentFragment();
        var start = this._createCommon('"');
        var end = this._createCommon('"');
        var string = document.createElement('span');
        string.className = '_string';
        string.innerHTML = str;
        fragment.appendChild(start);
        fragment.appendChild(string);
        fragment.appendChild(end);
        return fragment;
    };
    Console.prototype._createNumber = function (num) {
        var number = document.createElement('span');
        number.className = '_number';
        number.innerHTML = "" + num;
        return number;
    };
    Console.prototype._createNull = function (msg) {
        var nulld = document.createElement('span');
        nulld.className = '_null';
        if (index_1.typeOf(msg) === index_1.IsType[3]) {
            nulld.innerHTML = 'null';
        }
        else if (index_1.typeOf(msg) === index_1.IsType[4]) {
            nulld.innerHTML = 'undefined';
        }
        return nulld;
    };
    Console.prototype._createArray = function (arr) {
        var start = this._createCommon('[');
        var end = this._createCommon(']');
        var fragment = document.createDocumentFragment();
        fragment.appendChild(start);
        if (arr.length !== 0) {
            var len = 0;
            var undefined_repeat_pos = -1;
            var null_repeat_pos = -1;
            var undefined_repeat_times = 1;
            var null_repeat_times = 1;
            var undefined_hasRepeat = false;
            var null_hasRepeat = false;
            /* ergodic the Array's empty index*/
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var key = arr_1[_i];
                len++;
                if (index_1.typeOf(key) === index_1.IsType[1]) {
                    var num = this._createNumber(key);
                    fragment.appendChild(num);
                }
                else if (index_1.typeOf(key) === index_1.IsType[0]) {
                    var str = this._createString(key);
                    fragment.appendChild(str);
                }
                else if (index_1.typeOf(key) === index_1.IsType[4]) {
                    var nulld = this._createNull(key);
                    if (len - 1 !== 0 && undefined_repeat_pos + 1 === len - 1) {
                        undefined_repeat_times++;
                    }
                    if (undefined_repeat_times === 1 || undefined_repeat_pos === -1) {
                        fragment.appendChild(nulld);
                        if (arr[len - 1] === arr[len]) {
                            undefined_hasRepeat = true;
                        }
                        else {
                            undefined_hasRepeat = false;
                        }
                    }
                    else if (undefined_repeat_times !== 1 && (len === arr.length || arr[len - 1] !== arr[len])) {
                        var repeatSpan = document.createElement('span');
                        repeatSpan.className = 'null';
                        repeatSpan.innerHTML = " \u00D7 " + undefined_repeat_times;
                        repeatSpan.style.fontSize = '12px';
                        fragment.appendChild(repeatSpan);
                        undefined_repeat_times = 1;
                        undefined_hasRepeat = false;
                    }
                    undefined_repeat_pos = len - 1;
                }
                else if (index_1.typeOf(key) === index_1.IsType[3]) {
                    var nulld = this._createNull(key);
                    if (len - 1 !== 0 && null_repeat_pos + 1 === len - 1) {
                        null_repeat_times++;
                    }
                    if (null_repeat_times === 1 || null_repeat_pos === -1) {
                        fragment.appendChild(nulld);
                        if (arr[len - 1] === arr[len]) {
                            null_hasRepeat = true;
                        }
                        else {
                            null_hasRepeat = false;
                        }
                    }
                    else if (null_repeat_times !== 1 && (len === arr.length || arr[len - 1] !== arr[len])) {
                        var repeatSpan = document.createElement('span');
                        repeatSpan.className = 'null';
                        repeatSpan.innerHTML = " \u00D7 " + null_repeat_times;
                        repeatSpan.style.fontSize = '12px';
                        fragment.appendChild(repeatSpan);
                        null_repeat_times = 1;
                        null_hasRepeat = false;
                    }
                    null_repeat_pos = len - 1;
                }
                if (len !== arr.length && undefined_repeat_times === 1 && !undefined_hasRepeat && null_repeat_times === 1 && !null_hasRepeat) {
                    var comma = this._createComma();
                    fragment.appendChild(comma);
                }
            }
        }
        fragment.appendChild(end);
        return fragment;
    };
    Console.prototype._createObject = function (obj) {
        var start = this._createCommon('[object Object] {');
        var spaceSpan = this._createSpace(7);
        var end = this._createCommon('}');
        var fragment = document.createDocumentFragment();
        fragment.appendChild(start);
        var br = document.createElement('br');
        for (var key in obj) {
            fragment.appendChild(br);
            fragment.appendChild(spaceSpan);
        }
        fragment.appendChild(end);
        return fragment;
    };
    Console.prototype._isEmptyObject = function (obj) {
        return Object.getOwnPropertyNames(obj).length > 0 ? true : false;
    };
    /* timeline: 时间线 */
    Console.prototype._createTimeLine = function () {
        var time = new Date();
        var timeSpan = document.createElement('span');
        timeSpan.className = '_timeLine';
        timeSpan.innerHTML = time.getHours() + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()) + "." + (time.getMilliseconds() < 10 ? '00' + time.getMilliseconds() : (time.getMilliseconds() < 100 ? '0' + time.getMilliseconds() : time.getMilliseconds())) + "&nbsp;";
        return timeSpan;
    };
    Console.prototype._createCommon = function (innerHTML) {
        var common = document.createElement('span');
        common.className = 'common';
        common.innerHTML = innerHTML;
        return common;
    };
    Console.prototype._createComma = function () {
        var comma = document.createElement('span');
        comma.className = '_commom';
        comma.innerHTML = ', ';
        return comma;
    };
    Console.prototype._createSpace = function (times) {
        if (times === void 0) { times = 1; }
        var space = '';
        var spaceSpan = document.createElement('span');
        for (var i = 0; i < times; i++) {
            space += '&nbsp;';
        }
        spaceSpan.innerHTML = space;
        return spaceSpan;
    };
    Console.DOM_NODE = document.body;
    return Console;
}());
exports.ConsoleInDom = Console;
exports.default = Console;
var console = Console.render();
exports.console = console;
//# sourceMappingURL=console.js.map