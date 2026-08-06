import * as vscode from 'vscode';


export class CommandManager {
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    public buildCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make',{cwd:vscode.workspace.workspaceFolders?.[0].uri.fsPath+'/src'})));
    }
    public cleanCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make clean',{cwd:vscode.workspace.workspaceFolders?.[0].uri.fsPath+'/src'})));
    }

    public rebuildCommand() {
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make clean && make',{cwd:vscode.workspace.workspaceFolders?.[0].uri.fsPath+'/src'})));
    }

    public compileAndRunCommand() {
        //TODO Search for a way to run the compiled program in the terminal and not in the output window
        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution('make && ./test3',{cwd:vscode.workspace.workspaceFolders?.[0].uri.fsPath+'/src'})));
    }
}
