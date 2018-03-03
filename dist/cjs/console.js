"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./util/index");
// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
var Console = /** @class */ (function () {
    function Console() {
        this.ArrayFolders = [];
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
        else if (index_1.typeOf(msg) === index_1.IsType[2]) {
            var bool = this._createBoolean(msg);
            li.appendChild(bool);
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
        else if (index_1.typeOf(msg) === index_1.IsType[7]) {
            var fun = this._createFunction(msg);
            li.appendChild(fun);
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
    Console.prototype._createBoolean = function (bool) {
        var boolean = document.createElement('span');
        boolean.className = '_boolean';
        boolean.innerHTML = "" + bool;
        return boolean;
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
    Console.prototype._funcToString = function (fun) {
        var str = fun.toString()
            .replace(/\r/g, '')
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .replace(/( ){2,}/g, '');
        return str;
    };
    Console.prototype._createFunction = function (fun) {
        var fragment = document.createDocumentFragment();
        var funcMark = document.createElement('span');
        funcMark.className = '_function';
        var spaces = this._createSpace(8);
        spaces.className = '_timeLine';
        var str = this._funcToString(fun);
        funcMark.innerHTML = "" + str.slice(0, 8);
        var funcSpan = document.createElement('span');
        funcSpan.className = 'common';
        funcSpan.innerHTML = " " + str.slice(9, str.indexOf('{'));
        funcSpan.title = " " + str;
        fragment.appendChild(funcMark);
        fragment.appendChild(funcSpan);
        return fragment;
    };
    Console.prototype._createArray = function (arr, isFirst) {
        var _this = this;
        if (isFirst === void 0) { isFirst = true; }
        var start = this._createCommon('[');
        var end = this._createCommon(']');
        var folderSpan = document.createElement('span');
        folderSpan.className = '_ArrayFolder';
        var triangle;
        if (isFirst && arr.length !== 0) {
            triangle = this._createTriangle();
        }
        else {
            triangle = document.createElement('span');
            triangle.innerHTML = 'Array';
        }
        ;
        var arrLen = document.createElement('span');
        arrLen.className = '_public';
        arrLen.innerHTML = "(" + arr.length + ") ";
        folderSpan.appendChild(triangle);
        folderSpan.appendChild(arrLen);
        folderSpan.appendChild(start);
        var hasClick = false;
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
                if (index_1.typeOf(key) === index_1.IsType[0]) {
                    var str = this._createString(key);
                    folderSpan.appendChild(str);
                }
                else if (index_1.typeOf(key) === index_1.IsType[1]) {
                    var num = this._createNumber(key);
                    folderSpan.appendChild(num);
                }
                else if (index_1.typeOf(key) === index_1.IsType[2]) {
                    var bool = this._createBoolean(key);
                    folderSpan.appendChild(bool);
                }
                else if (index_1.typeOf(key) === index_1.IsType[3]) {
                    var nulld = this._createNull(key);
                    if (len - 1 !== 0 && null_repeat_pos + 1 === len - 1) {
                        null_repeat_times++;
                    }
                    if (null_repeat_times === 1 || null_repeat_pos === -1) {
                        folderSpan.appendChild(nulld);
                        if (arr[len - 1] === arr[len]) {
                            null_hasRepeat = true;
                        }
                        else {
                            null_hasRepeat = false;
                        }
                    }
                    else if (null_repeat_times !== 1 && (len === arr.length || arr[len - 1] !== arr[len])) {
                        var repeatSpan = document.createElement('span');
                        repeatSpan.className = '_null _count';
                        repeatSpan.innerHTML = " \u00D7 " + null_repeat_times;
                        folderSpan.appendChild(repeatSpan);
                        null_repeat_times = 1;
                        null_hasRepeat = false;
                    }
                    null_repeat_pos = len - 1;
                }
                else if (index_1.typeOf(key) === index_1.IsType[4]) {
                    var nulld = this._createNull(key);
                    if (len - 1 !== 0 && undefined_repeat_pos + 1 === len - 1) {
                        undefined_repeat_times++;
                    }
                    if (undefined_repeat_times === 1 || undefined_repeat_pos === -1) {
                        folderSpan.appendChild(nulld);
                        if (arr[len - 1] === arr[len]) {
                            undefined_hasRepeat = true;
                        }
                        else {
                            undefined_hasRepeat = false;
                        }
                    }
                    else if (undefined_repeat_times !== 1 && (len === arr.length || arr[len - 1] !== arr[len])) {
                        var repeatSpan = document.createElement('span');
                        repeatSpan.className = '_null _count';
                        repeatSpan.innerHTML = " \u00D7 " + undefined_repeat_times;
                        folderSpan.appendChild(repeatSpan);
                        undefined_repeat_times = 1;
                        undefined_hasRepeat = false;
                    }
                    undefined_repeat_pos = len - 1;
                }
                else if (index_1.typeOf(key) === index_1.IsType[5]) {
                    var span = document.createElement('span');
                    span.className = '_common';
                    span.innerHTML = "Array(" + key.length + ")";
                    folderSpan.appendChild(span);
                }
                else if (index_1.typeOf(key) === index_1.IsType[6]) {
                    var span = document.createElement('span');
                    span.className = '_public';
                    span.title = 'Object';
                    span.innerHTML = "{\u2026}";
                    folderSpan.appendChild(span);
                }
                else if (index_1.typeOf(key) === index_1.IsType[7]) {
                    var span = document.createElement('span');
                    span.className = '_public';
                    span.title = 'Function';
                    span.innerHTML = "\u2231";
                    folderSpan.appendChild(span);
                }
                if (len !== arr.length && undefined_repeat_times === 1 && !undefined_hasRepeat && null_repeat_times === 1 && !null_hasRepeat) {
                    var comma = this._createComma();
                    folderSpan.appendChild(comma);
                }
            }
        }
        folderSpan.appendChild(end);
        var ArrayFolder = index_1._listen(folderSpan, 'click', function (event) {
            var targetElement;
            if (event.srcElement.parentElement.className === '_ArrayFolder') {
                targetElement = event.srcElement.parentElement.parentElement;
                targetElement.classList.toggle('_folder-toggle');
                if (!hasClick && isFirst) {
                    hasClick = true;
                    var div = _this._createFolder(arr);
                    // _insertAfter(Console.DOM_NODE, div, targetElement)
                    targetElement.appendChild(div);
                }
            }
        });
        this.ArrayFolders.push(ArrayFolder);
        return folderSpan;
    };
    Console.prototype._createFolder = function (arr) {
        var folder_div = document.createElement('div');
        folder_div.className = '_folder-div';
        for (var key in arr) {
            var div = document.createElement('div');
            var timeLine = this._createSpace(8);
            timeLine.className = '_timeLine';
            /* TODO: ADD Miult Array */
            var variable = this._createVariable(key);
            var colon = this._createCommon(': ');
            div.appendChild(timeLine);
            div.appendChild(variable);
            div.appendChild(colon);
            var value = void 0;
            if (index_1.typeOf(arr[key]) === index_1.IsType[0]) {
                value = this._createString(arr[key]);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[1]) {
                value = this._createNumber(arr[key]);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[2]) {
                value = this._createBoolean(arr[key]);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[3] || index_1.typeOf(arr[key]) === index_1.IsType[4]) {
                value = this._createNull(arr[key]);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[5]) {
                value = this._createArray(arr[key], false);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[6]) {
                value = this._createObject(arr[key], false);
            }
            else if (index_1.typeOf(arr[key]) === index_1.IsType[7]) {
                value = this._createFunction(arr[key]);
            }
            else {
                value = document.createDocumentFragment();
            }
            div.appendChild(value);
            folder_div.appendChild(div);
        }
        return folder_div;
    };
    Console.prototype._createVariable = function (innerHTML) {
        var variable = document.createElement('span');
        variable.className = '_variable';
        variable.innerHTML = "" + innerHTML;
        return variable;
    };
    Console.prototype._createObject = function (obj, isFirst) {
        var _this = this;
        if (isFirst === void 0) { isFirst = true; }
        var folderSpan = document.createElement('span');
        folderSpan.className = '_ObjectFolder';
        var start = this._createCommon(' Object {');
        var end = this._createCommon('}');
        if (!index_1._isEmptyObject(obj) && isFirst) {
            var triangle = this._createTriangle();
            folderSpan.appendChild(triangle);
        }
        folderSpan.appendChild(start);
        var loopCount = 0;
        var objKeys = Object.keys(obj);
        for (var key in obj) {
            if (++loopCount >= 6)
                break;
            var keySpan = document.createElement('span');
            keySpan.innerHTML = key + ": ";
            keySpan.className = '_public';
            var valueSpan = void 0;
            if (index_1.typeOf(obj[key]) === index_1.IsType[0]) {
                valueSpan = this._createString(obj[key]);
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[1]) {
                valueSpan = this._createNumber(obj[key]);
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[2]) {
                valueSpan = this._createBoolean(obj[key]);
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[3] || index_1.typeOf(obj[key]) === index_1.IsType[4]) {
                valueSpan = this._createNull(obj[key]);
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[5]) {
                valueSpan = document.createElement('span');
                valueSpan.className = '_common';
                valueSpan.innerHTML = "Array(" + obj[key].length + ")";
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[6]) {
                valueSpan = document.createElement('span');
                valueSpan.className = '_public';
                valueSpan.title = 'Object';
                valueSpan.innerHTML = "{\u2026}";
            }
            else if (index_1.typeOf(obj[key]) === index_1.IsType[7]) {
                valueSpan = document.createElement('span');
                valueSpan.className = '_public';
                valueSpan.title = 'Function';
                valueSpan.innerHTML = "\u2231";
            }
            else {
                valueSpan = document.createDocumentFragment();
            }
            var comma = this._createComma();
            folderSpan.appendChild(keySpan);
            folderSpan.appendChild(valueSpan);
            if (objKeys[objKeys.length - 1] !== key)
                folderSpan.appendChild(comma);
        }
        if (!index_1._isEmptyObject(obj) && loopCount == 6) {
            var ellipsis = document.createElement('span');
            ellipsis.className = '_public';
            ellipsis.innerHTML = '…';
            folderSpan.appendChild(ellipsis);
        }
        folderSpan.appendChild(end);
        // folderSpan.addEventListener('click', ()=>{
        //   console.log(22222)
        // }, false)
        var hasClick = false;
        var ArrayFolder = index_1._listen(folderSpan, 'click', function (event) {
            var targetElement;
            if (event.srcElement.parentElement.className === '_ObjectFolder') {
                targetElement = event.srcElement.parentElement.parentElement;
                targetElement.classList.toggle('_folder-toggle');
                if (!hasClick && isFirst) {
                    hasClick = true;
                    var div = _this._createFolder(obj);
                    // _insertAfter(Console.DOM_NODE, div, targetElement)
                    targetElement.appendChild(div);
                }
            }
        });
        this.ArrayFolders.push(ArrayFolder);
        return folderSpan;
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
    Console.prototype._createTriangle = function () {
        var folder = document.createElement('span');
        folder.innerHTML = '▶';
        folder.className = '_folder';
        return folder;
    };
    Console.DOM_NODE = document.body;
    return Console;
}());
exports.ConsoleInDom = Console;
exports.default = Console;
//# sourceMappingURL=console.js.map