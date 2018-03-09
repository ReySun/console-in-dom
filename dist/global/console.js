(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['console-in-dom'] = factory());
}(this, (function () { 'use strict';

function typeOf(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
}
var IsType;
(function (IsType) {
    IsType[IsType["String"] = 0] = "String";
    IsType[IsType["Number"] = 1] = "Number";
    IsType[IsType["Boolean"] = 2] = "Boolean";
    IsType[IsType["Null"] = 3] = "Null";
    IsType[IsType["Undefined"] = 4] = "Undefined";
    IsType[IsType["Array"] = 5] = "Array";
    IsType[IsType["Object"] = 6] = "Object";
    IsType[IsType["Function"] = 7] = "Function";
    IsType[IsType["Window"] = 8] = "Window";
    IsType[IsType["MouseEvent"] = 9] = "MouseEvent";
    IsType[IsType["Error"] = 10] = "Error";
    IsType[IsType["HTMLDocument"] = 11] = "HTMLDocument";
})(IsType || (IsType = {}));
function _listen(target, eventName, callback) {
    target.addEventListener(eventName, callback, false);
    return function () {
        target.removeEventListener(eventName, callback, false);
    };
}
function _isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length > 0 ? false : true;
}

// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
var Console = /** @class */ (function () {
    function Console() {
        this.Folders_listeners = [];
        this.array_tabs_count = 0;
        this.object_tabs_count = 0;
    }
    Console.render = function (node) {
        if (!Console.log)
            Console.log = new Console();
        if (node)
            Console.DOM_NODE = node;
        return Console.log;
    };
    Console.prototype.log = function (msg) {
        // console.log(typeOf(msg))
        console.log(msg);
        var li = document.createElement('li');
        li.className = 'output-li';
        var timeLine = this._createTimeLine();
        li.appendChild(timeLine);
        if (typeOf(msg) === IsType[0]) {
            var str = this._createString(msg);
            li.appendChild(str);
        }
        else if (typeOf(msg) === IsType[1]) {
            var num = this._createNumber(msg);
            li.appendChild(num);
        }
        else if (typeOf(msg) === IsType[2]) {
            var bool = this._createBoolean(msg);
            li.appendChild(bool);
        }
        else if (typeOf(msg) === IsType[3] || typeOf(msg) === IsType[4]) {
            var nulld = this._createNull(msg);
            li.appendChild(nulld);
        }
        else if (typeOf(msg) === IsType[5]) {
            this.array_tabs_count = 0;
            this.object_tabs_count = 0;
            var array = this._createArray(msg);
            li.appendChild(array);
        }
        else if (typeOf(msg) === IsType[6] || typeOf(msg) === IsType[8] || typeOf(msg) === IsType[9]) {
            this.array_tabs_count = 0;
            this.object_tabs_count = 0;
            var obj = this._createObject(msg);
            li.appendChild(obj);
        }
        else if (typeOf(msg) === IsType[7]) {
            var fun = this._createFunction(msg);
            li.appendChild(fun);
        } /* else if(typeOf(msg) === IsType[10]){// Error
          let str = this._createString('Error');
          li.appendChild(str);
        }else if(typeOf(msg) === IsType[11]){// HTMLDocument
          let str = this._createString('document 相关请直接查看浏览器自带Elements面板');
          li.appendChild(str);
        } */
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
        if (typeOf(msg) === IsType[3]) {
            nulld.innerHTML = 'null';
        }
        else if (typeOf(msg) === IsType[4]) {
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
    Console.prototype._createArray = function (arr) {
        var start = this._createCommon('[');
        var end = this._createCommon(']');
        var folderSpan = document.createElement('span');
        var fragment = document.createDocumentFragment();
        folderSpan.className = '_ArrayFolder';
        var triangle;
        if (arr.length !== 0) {
            triangle = this._createTriangle();
        }
        else {
            triangle = document.createElement('span');
            triangle.innerHTML = 'Array';
        }
        var arrLen = document.createElement('span');
        arrLen.className = '_public';
        arrLen.innerHTML = "(" + arr.length + ") ";
        folderSpan.appendChild(triangle);
        folderSpan.appendChild(arrLen);
        folderSpan.appendChild(start);
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
                if (typeOf(key) === IsType[0]) {
                    var str = this._createString(key);
                    folderSpan.appendChild(str);
                }
                else if (typeOf(key) === IsType[1]) {
                    var num = this._createNumber(key);
                    folderSpan.appendChild(num);
                }
                else if (typeOf(key) === IsType[2]) {
                    var bool = this._createBoolean(key);
                    folderSpan.appendChild(bool);
                }
                else if (typeOf(key) === IsType[3]) {
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
                else if (typeOf(key) === IsType[4]) {
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
                else if (typeOf(key) === IsType[5]) {
                    var span = document.createElement('span');
                    span.className = '_common';
                    span.innerHTML = "Array(" + key.length + ")";
                    folderSpan.appendChild(span);
                }
                else if (typeOf(key) === IsType[6]) {
                    var span = document.createElement('span');
                    span.className = '_public';
                    span.title = 'Object';
                    span.innerHTML = "{\u2026}";
                    folderSpan.appendChild(span);
                }
                else if (typeOf(key) === IsType[7]) {
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
            var Array_listener = _listen(folderSpan, 'click', function (event) {
                var targetElement;
                if (event.srcElement.parentElement.className.indexOf('_ArrayFolder') >= 0) {
                    targetElement = event.srcElement.parentElement.parentElement;
                    targetElement.classList.toggle('_toggle-div');
                    folderSpan.classList.toggle('_toggle-folder');
                }
            });
            this.Folders_listeners.push(Array_listener);
        }
        folderSpan.appendChild(end);
        fragment.appendChild(folderSpan);
        var folder_div = this._createFolder(arr);
        fragment.appendChild(folder_div);
        if (arr.length > 0)
            this.array_tabs_count--;
        return fragment;
    };
    Console.prototype._createFolder = function (arr) {
        var folder_div = document.createElement('div');
        folder_div.className = '_folder-div';
        for (var key in arr) {
            var div = document.createElement('div');
            var tabs = this._createTabs((this.array_tabs_count + this.object_tabs_count));
            var timeLine = this._createSpace(8);
            timeLine.className = '_timeLine';
            /* TODO: ADD Miult Array */
            var variable = this._createVariable(key);
            var colon = this._createCommon(': ');
            var value = void 0;
            if (typeOf(arr[key]) === IsType[0]) {
                value = this._createString(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[1]) {
                value = this._createNumber(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[2]) {
                value = this._createBoolean(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[3] || typeOf(arr[key]) === IsType[4]) {
                value = this._createNull(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[5]) {
                if (arr[key].length > 0)
                    this.array_tabs_count++;
                value = this._createArray(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[6]) {
                if (!_isEmptyObject(arr[key]))
                    this.object_tabs_count++;
                value = this._createObject(arr[key]);
            }
            else if (typeOf(arr[key]) === IsType[7]) {
                value = this._createFunction(arr[key]);
            }
            else {
                value = document.createDocumentFragment();
            }
            div.appendChild(timeLine);
            div.appendChild(tabs);
            div.appendChild(variable);
            div.appendChild(colon);
            div.appendChild(value);
            folder_div.appendChild(div);
        }
        return folder_div;
    };
    Console.prototype._createTabs = function (tabs) {
        if (tabs === void 0) { tabs = 0; }
        var spaces = document.createDocumentFragment();
        for (var tab = 0; tab < tabs; tab++) {
            var space = document.createElement('span');
            space.innerHTML = '&nbsp;&nbsp;';
            space.className = '_tabs';
            spaces.appendChild(space);
        }
        return spaces;
    };
    Console.prototype._createVariable = function (innerHTML) {
        var variable = document.createElement('span');
        variable.className = '_variable';
        variable.innerHTML = "" + innerHTML;
        return variable;
    };
    Console.prototype._createObject = function (obj) {
        var fragment = document.createDocumentFragment();
        var folderSpan = document.createElement('span');
        folderSpan.className = '_ObjectFolder';
        var start = this._createCommon(' Object {');
        var end = this._createCommon('}');
        if (!_isEmptyObject(obj)) {
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
            var value = void 0;
            if (typeOf(obj[key]) === IsType[0]) {
                value = this._createString(obj[key]);
            }
            else if (typeOf(obj[key]) === IsType[1]) {
                value = this._createNumber(obj[key]);
            }
            else if (typeOf(obj[key]) === IsType[2]) {
                value = this._createBoolean(obj[key]);
            }
            else if (typeOf(obj[key]) === IsType[3] || typeOf(obj[key]) === IsType[4]) {
                value = this._createNull(obj[key]);
            }
            else if (typeOf(obj[key]) === IsType[5]) {
                value = document.createElement('span');
                value.className = '_common';
                value.innerHTML = "Array(" + obj[key].length + ")";
            }
            else if (typeOf(obj[key]) === IsType[6]) {
                value = document.createElement('span');
                value.className = '_public';
                value.title = 'Object';
                value.innerHTML = "{\u2026}";
            }
            else if (typeOf(obj[key]) === IsType[7]) {
                value = document.createElement('span');
                value.className = '_public';
                value.title = 'Function';
                value.innerHTML = "\u2231";
            }
            else {
                value = document.createDocumentFragment();
            }
            var comma = this._createComma();
            folderSpan.appendChild(keySpan);
            folderSpan.appendChild(value);
            if (objKeys[objKeys.length - 1] !== key)
                folderSpan.appendChild(comma);
        }
        if (!_isEmptyObject(obj) && loopCount == 6) {
            var ellipsis = document.createElement('span');
            ellipsis.className = '_public';
            ellipsis.innerHTML = '…';
            folderSpan.appendChild(ellipsis);
        }
        folderSpan.appendChild(end);
        fragment.appendChild(folderSpan);
        var div = this._createFolder(obj);
        fragment.appendChild(div);
        var Object_listener = _listen(folderSpan, 'click', function (event) {
            var targetElement;
            if (event.srcElement.parentElement.className.indexOf('_ObjectFolder') >= 0) {
                targetElement = event.srcElement.parentElement.parentElement;
                targetElement.classList.toggle('_toggle-div');
                folderSpan.classList.toggle('_toggle-folder');
            }
        });
        this.Folders_listeners.push(Object_listener);
        if (!_isEmptyObject(obj)) {
            this.object_tabs_count--;
        }
        return fragment;
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
        folder.className = '_folder-triangle';
        return folder;
    };
    Console.DOM_NODE = document.body;
    return Console;
}());

return Console;

})));
//# sourceMappingURL=console.js.map
