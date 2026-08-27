import * as vscode from 'vscode';


export abstract class CommandManager {


    constructor() {
    }


    public abstract buildCommand(extraParams?:string|undefined): void;
    public abstract cleanCommand(): void;

    public abstract rebuildCommand(): void;

    public abstract compileAndRunCommand(): void;
}

export class CommandManagerLinux extends CommandManager {

    constructor() {
        super();
    }

    public buildCommand(extraParams?:string|undefined) {
        if(!extraParams)
            extraParams="";
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");
        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`make -j${compileThreads} ${extraMakeParams} ${extraParams}`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
    public cleanCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make clean', { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }

    public rebuildCommand() {
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");
        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);

        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`make clean && make -j${compileThreads} ${extraMakeParams}`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }

    public compileAndRunCommand() {
        //TODO Search for a way to run the compiled program in the terminal and not in the output window
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");

        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);

        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`make -j${compileThreads} ${extraMakeParams} && ./test3`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
}


export class CommandManagerWindows extends CommandManager {
    public buildCommand(extraParams?:string|undefined): void {
        if(!extraParams)
            extraParams="";
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");
        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);
        const mingwpath:string = vscode.workspace.getConfiguration().get("raylib.mingwpath","");
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`/c ${mingwpath}make -j${compileThreads} ${extraMakeParams} ${extraParams}`, {executable:"cmd", cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
    public cleanCommand(): void {
        const mingwpath:string = vscode.workspace.getConfiguration().get("raylib.mingwpath","");
        const setPath:string = `set %PATH%='%PATH%;${mingwpath}'`;
        const delcommand:string = `del *.o *.exe /s`;
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`/c ${setPath} && ${delcommand}`, {executable:"cmd", cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
    public rebuildCommand(): void {
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");
        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);
        const mingwpath:string = vscode.workspace.getConfiguration().get("raylib.mingwpath","");
        const setPath:string = `set %PATH%='%PATH%;${mingwpath}'`;
        const delcommand:string = `del *.o *.exe /s`;
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`/c ${setPath} && ${delcommand} && ${mingwpath}make -j${compileThreads} ${extraMakeParams}`, {executable:"cmd", cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
    public compileAndRunCommand(): void {
        const extraMakeParams:string= vscode.workspace.getConfiguration().get("raylib.extrabuildparams","");
        const compileThreads:number = vscode.workspace.getConfiguration().get("raylib.compilethreads",1);
        const mingwpath:string = vscode.workspace.getConfiguration().get("raylib.mingwpath","");
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`/c ${mingwpath}make -j${compileThreads} ${extraMakeParams} && for /f %i in ('dir /b /s *.exe') do set variable=%i && %i`, {executable:"cmd", cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }

}

export class CommandManagerDarwin extends CommandManager{
    public buildCommand(extraParams?:string|undefined): void {
        throw new Error('Method not implemented.');
    }
    public cleanCommand(): void {
        throw new Error('Method not implemented.');
    }
    public rebuildCommand(): void {
        throw new Error('Method not implemented.');
    }
    public compileAndRunCommand(): void {
        throw new Error('Method not implemented.');
    }

}