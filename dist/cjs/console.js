"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./util/index");
// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
// http://www.codebelt.com/typescript/typescript-singleton-pattern/
var Console = /** @class */ (function () {
    function Console() {
    }
    Console.getInstance = function () {
        if (!Console.log)
            Console.log = new Console();
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
        document.body.appendChild(li);
    };
    Console.prototype._createCommon = function (innerHTML) {
        var common = document.createElement('span');
        common.className = 'common';
        common.innerHTML = innerHTML;
        return common;
    };
    /* timeline: 时间线 */
    Console.prototype._createTimeLine = function () {
        var time = new Date();
        var timeSpan = document.createElement('span');
        timeSpan.className = '_timeLine';
        timeSpan.innerHTML = time.getHours() + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()) + "." + (time.getMilliseconds() < 10 ? '00' + time.getMilliseconds() : (time.getMilliseconds() < 100 ? '0' + time.getMilliseconds() : time.getMilliseconds())) + "&nbsp;";
        return timeSpan;
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
        console.log(fragment);
        return fragment;
    };
    return Console;
}());
exports.default = Console.getInstance();
//# sourceMappingURL=console.js.map