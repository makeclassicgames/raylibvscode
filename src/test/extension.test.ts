import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as raylibExtension from '../commandManager';
import { existsSync } from 'fs';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	//Prepare tests and tools
	//descargar raylib y mingw64
	
	//descargar un proyecto de prueba
	const commandManager = new raylibExtension.CommandManagerWindows();
	vscode.workspace.getConfiguration().update("raylib.mingwpath","C:\\raylib\\w64devkit\\bin\\");
	test('Build test', async () => {
	
		let result = await vscode.commands.executeCommand<boolean>("raylibextension.build");

		//Comprobar que existe .exe
		assert.equal(existsSync("C:\\raylib\\projects\\test_project2\\src\\test_project2.exe"), true);
	});
	test('Clean test', () =>{
		//clean command
		commandManager.cleanCommand();
		//comprobar que NO hay .exe
		assert.equal(!existsSync("C:\\raylib\\projects\\test_project2\\src\\test_project2.exe"), true);

	});
});
