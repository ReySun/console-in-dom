declare class Console {
    private static log;
    private constructor();
    private static DOM_NODE;
    private Folders_listeners;
    private array_tabs_count;
    private object_tabs_count;
    static render(node?: HTMLElement): Console;
    log(msg: any): void;
    private _createString(str);
    private _createNumber(num);
    private _createBoolean(bool);
    private _createNull(msg);
    private _funcToString(fun);
    private _createFunction(fun);
    private _createArray(arr);
    private _createFolder(arr);
    private _createTabs(tabs?);
    private _createVariable(innerHTML);
    private _createObject(obj);
    private _createTimeLine();
    private _createCommon(innerHTML);
    private _createComma();
    private _createSpace(times?);
    private _createTriangle();
}
export default Console;
export { Console as ConsoleInDom };
