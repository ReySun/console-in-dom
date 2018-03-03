declare class Console {
    private static log;
    private constructor();
    private static DOM_NODE;
    private ArrayFolders;
    private ArrayFolderCount;
    static render(node?: HTMLElement): Console;
    log(msg: any): void;
    private _createString(str);
    private _createNumber(num);
    private _createBoolean(bool);
    private _createNull(msg);
    private _createFunction(fun);
    private _createArray(arr, isFirst?);
    private _createFolder(arr);
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
