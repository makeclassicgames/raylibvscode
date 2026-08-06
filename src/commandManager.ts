import * as vscode from 'vscode';


export abstract class CommandManager {

    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }


    public abstract buildCommand(): void;
    public abstract cleanCommand(): void;

    public abstract rebuildCommand(): void;

    public abstract compileAndRunCommand(): void;
}

export class CommandManagerLinux extends CommandManager {

    constructor(context: vscode.ExtensionContext) {
        super(context);
    }

    public buildCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make', { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
    public cleanCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make clean', { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }

    public rebuildCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make clean && make', { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }

    public compileAndRunCommand() {
        //TODO Search for a way to run the compiled program in the terminal and not in the output window
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make && ./test3', { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
}


export class CommandManagerWindows extends CommandManager {
    public buildCommand(): void {
        const mingwpath:string = vscode.workspace.getConfiguration().get("raylib.mingwpath","");
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`${mingwpath}make`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));

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

export class CommandManagerDarwin extends CommandManager{
    public buildCommand(): void {
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