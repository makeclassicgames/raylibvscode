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

/**
 * CommandManager is an abstract class that defines the interface for managing commands in the Raylib Visual Studio Code Extension. It provides methods for building, cleaning, rebuilding, and compiling and running commands. The specific implementations of these methods are provided by subclasses for different platforms (Linux, Windows, and Darwin).
 * @author Make Classic Games <https://makeclassicgames.dev>
 * @version 1.0.0
 * @since 2026-09-10
 */
export abstract class CommandManager {


    /** Default constructor */
    constructor() {
    }

    /**
     * Execute Build Command: Compile the current project using the specified build parameters. If extra parameters are provided, they will be appended to the build command.
     * @param extraParams Extra Build paramters (Optionals)
     */
    public abstract buildCommand(extraParams?:string|undefined): void;
    /**
     * Execute Clean Command: Clean the build artifacts of the current project.
     */
    public abstract cleanCommand(): void;

    /**
     * Execute Rebuild Command: Clean and then compile the current project using default settings.
     */
    public abstract rebuildCommand(): void;

    /**
     * Execute Compile and then run the generated executable.
     */
    public abstract compileAndRunCommand(): void;
}


/**
 * CommandManagerLinux is a concrete implementation of the CommandManager class for Linux platforms.
 * @author Make Classic Games <https://makeclassicgames.dev>
 * @version 1.0.0
 * @since 2026-09-10
 * @see CommandManager
 */
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

        vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'make', 'raylibextension', new vscode.ShellExecution(`make -j${compileThreads} ${extraMakeParams} && $(find . -type f -executable)`, { cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath + '/src' })));
    }
}

/**
 * CommandManagerWindows is a concrete implementation of the CommandManager class for Windows platforms.
 * Its uses MinGW to compile the project and execute the commands. Needs to be configured in extension configuration settings.
 * @author Make Classic Games <https://makeclassicgames.dev>
 * @version 1.0.0
 * @since 2026-09-10
 * @see CommandManager
 */
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

/**
 * CommandManagerDarwin is a concrete implementation of the CommandManager class for macOS (Darwin) platforms.
 * @author Make Classic Games <https://makeclassicgames.dev>
 * @version 1.0.0
 * @since 2026-09-10
 * @see CommandManager
 */
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