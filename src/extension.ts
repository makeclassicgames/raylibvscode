// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandManager, CommandManagerDarwin, CommandManagerLinux, CommandManagerWindows } from './commandManager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let commandManager:CommandManager|null = null;
	
	switch(process.platform.toString()){
		case 'win32':
			commandManager = new CommandManagerWindows();
			break;
		case 'linux':
			commandManager = new CommandManagerLinux();
			break;
		case 'darwin':
			commandManager = new CommandManagerDarwin();
			break;
		default:
			throw new Error("Unsupported Platform");
	}


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "raylibextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposablecp = vscode.commands.registerCommand('raylibextension.createproject', () => {
		const rpcpath:string = vscode.workspace.getConfiguration().get("raylib.rpcpath","");
		
		vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`${rpcpath}`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
		
	});
	const disposablebuild = vscode.commands.registerCommand('raylibextension.build', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		commandManager.buildCommand();
	});
	const disposableclean = vscode.commands.registerCommand('raylibextension.clean', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		commandManager.cleanCommand();
	});
	const disposablerebuild = vscode.commands.registerCommand('raylibextension.rebuild', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		commandManager.rebuildCommand();
	});
	const disposablecompileandrun = vscode.commands.registerCommand('raylibextension.compileandrun', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		commandManager.compileAndRunCommand();
	});

	const disposableBuildWithParams = vscode.commands.registerCommand('raylibextension.buildwithextra', () =>{
		vscode.window.showInputBox(
			{
				prompt: "Insert Extra Build Params"
			}
		).then(params =>{
			commandManager.buildCommand(params);
		});
	});

	context.subscriptions.push(disposablecp);
	context.subscriptions.push(disposablebuild);
	context.subscriptions.push(disposableclean);
	context.subscriptions.push(disposablecompileandrun);
	context.subscriptions.push(disposablerebuild);
	context.subscriptions.push(disposableBuildWithParams);

	addStatusBarButtons(context);

	
}

function addStatusBarButtons(context: vscode.ExtensionContext) {
	let buildWithParamsButton:vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,1);
		buildWithParamsButton.text="$(gear) Build...";
		buildWithParamsButton.tooltip = "Build Raylib project With Params";
		buildWithParamsButton.command = "raylibextension.buildwithextra";
		buildWithParamsButton.show();
	let buildButton:vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
       buildButton.text = "$(gear) Build";
       buildButton.tooltip = "Build Raylib Project";
       buildButton.command = "raylibextension.build";
       buildButton.show();
	let  cleanButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
        cleanButton.text = "$(trash) Clean";
        cleanButton.tooltip = "Clean Raylib Project";
        cleanButton.command = "raylibextension.clean";
        cleanButton.show();

	let  rebuildButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 4);
        rebuildButton.text = "$(refresh) Rebuild";
        rebuildButton.tooltip = "Rebuild Raylib Project";
        rebuildButton.command = "raylibextension.rebuild";
        rebuildButton.show();
	let compileAndRunButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
		compileAndRunButton.text = "$(play) Compile and Run";
		compileAndRunButton.tooltip = "Compile and Run Raylib Project";
		compileAndRunButton.command = "raylibextension.compileandrun";
		compileAndRunButton.show();
}


// This method is called when your extension is deactivated
export function deactivate() {}
