/*
* Raylib Visual Studio Code Extension
* Copyright (C) 2026  Make Classic Games
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
* 
* 
* License: GNU General Public License v3.0
* Author: Make Classic Games <https://makeclassicgames.dev>
* Date: 2026-09-10
* Version: 1.0.0
*/
import * as vscode from 'vscode';
import { CommandManager, CommandManagerDarwin, CommandManagerLinux, CommandManagerWindows } from './commandManager';


/**
 * This method is called when the extension is activated. The extension is activated when the editor is first opened or when a command is executed. It initializes the appropriate CommandManager based on the current platform (Windows, Linux, or Darwin) and registers commands for creating projects, building, cleaning, rebuilding, and compiling and running Raylib projects. It also adds status bar buttons for quick access to these commands.
 * @param context Vscode/codium extension context.
 */
export function activate(context: vscode.ExtensionContext) {

	//Command manager instance for the current platform
	let commandManager:CommandManager|null = null;
	
	switch(process.platform.toString()){
		case 'win32':
			commandManager = new CommandManagerWindows(); //Windows Platform
			break;
		case 'linux':
			commandManager = new CommandManagerLinux(); //Linux Platform
			break;
		case 'darwin':
			commandManager = new CommandManagerDarwin(); //Darwin Platform (macOs)
			break;
		default:
			throw new Error("Unsupported Platform");
	}


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "raylibextension" is now active!');

	// Create Project Command: Create a new Project calling Raylib Project Creator (rpc). Needs to configure the rpc path setting.
	const disposablecp = vscode.commands.registerCommand('raylibextension.createproject', () => {
		const rpcpath:string = vscode.workspace.getConfiguration().get("raylib.rpcpath","");
		
		vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`${rpcpath}`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
		
	});

	//Build Command: Compile the current project using the specified build paramters. 
	//On windows needs to configure the MinGW path in the extension settings.
	const disposablebuild = vscode.commands.registerCommand('raylibextension.build', () => {
	
		commandManager.buildCommand();
	});
	//Clean Command: Clean the build artifacts of the current project.
	//On windows needs to configure the MinGW path in the extension settings.
	const disposableclean = vscode.commands.registerCommand('raylibextension.clean', () => {
		
		commandManager.cleanCommand();
	});

	//Rebuild Command: Clean and then compile the current project using default settings.
	//On windows needs to configure the MinGW path in the extension settings.
	const disposablerebuild = vscode.commands.registerCommand('raylibextension.rebuild', () => {
		
		commandManager.rebuildCommand();
	});

	//Compile and Run Command: Compile the current project and run the resulting executable.
	//On windows needs to configure the MinGW path in the extension settings.
	const disposablecompileandrun = vscode.commands.registerCommand('raylibextension.compileandrun', () => {
		
		commandManager.compileAndRunCommand();
	});

	//Build With Extra Params Command: Compile the current project using the specified build paramters.
	//On windows needs to configure the MinGW path in the extension settings.
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

/**
 * Add status bar buttons for quick access to the Raylib Commands.
 */
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
