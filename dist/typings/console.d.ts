declare class Console {
    private static log;
    private constructor();
    private static DOM_NODE;
    static render(node?: HTMLElement): Console;
    log(msg: any): void;
    private _createString(str);
    private _createNumber(num);
    private _createNull(msg);
    private _createArray(arr);
    private _createObject(obj);
    private _isEmptyObject(obj);
    private _createTimeLine();
    private _createCommon(innerHTML);
    private _createComma();
    private _createSpace(times?);
}
export default Console;
declare let console: Console;
export { console, Console as ConsoleInDom };
