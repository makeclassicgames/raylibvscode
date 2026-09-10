# Raylib VScode Extension

 Raylib Visual Studio Code extension is a tool that allows you to interact with Raylib projects directly from the Visual Studio Code interface Without the need to use the command line. It provides a set of commands that can be executed from the command palette or through status bar buttons, allowing you to create, build, clean, rebuild, and run Raylib projects with ease.

 ## Features

 Commands provided by the Raylib Visual Studio Code extension include:

 * Create a new Raylib project using the Raylib Project Creator (rpc) tool.
* Build the current Raylib project using the specified build parameters.
* Clean the build artifacts of the current Raylib project.
* Rebuild the current Raylib project using default settings.
* Compile and run the current Raylib project.

Extension Settings:

* RPC Path: The path to the Raylib Project Creator (rpc) tool. This setting is required for the "Create Project" command to work.
* MinGW Path: The path to the MinGW compiler. This setting is required for the "Build", "Clean", "Rebuild", and "Compile and Run" commands to work on Windows.
* Compile Threads: The number of threads to use for compilation. This setting is optional and can be set to a value greater than 1 to speed up the compilation process.
* Extra parameters: Additional parameters to pass to the build command. This setting is optional and can be used to customize the build process.

## Requirements

- Raylib Project Creator (rpc) tool must be installed and accessible from the command line.
- MinGW compiler must be installed and accessible from the command line (for Windows users).
- GCC or Clang compiler must be installed and accessible from the command line (for Linux and macOS users).

## Extension Settings

* **RPC Path**: The path to the Raylib Project Creator (rpc) tool. This setting is required for the "Create Project" command to work.
* **MinGW Path**: The path to the MinGW compiler. This setting is required for the "Build", "Clean", "Rebuild", and "Compile and Run" commands to work on Windows.
* **Compile Threads**: The number of threads to use for compilation. This setting is optional and can be set to a value greater than 1 to speed up the compilation process.
* **Extra parameters**: Additional parameters to pass to the build command. This setting is optional and can be used to customize the build process.

## Extension Commands

- **Create Project**: Creates a new Raylib project using the Raylib Project Creator (rpc) tool. Requires the RPC Path setting to be configured.
- **Build**: Compiles the current Raylib project using the specified build parameters. Requires the MinGW Path setting to be configured on Windows.
* **Build With Extra Params**: Compiles the current Raylib project using the specified build parameters. Requires the MinGW Path setting to be configured on Windows.
- **Clean**: Cleans the build artifacts of the current Raylib project. Requires the MinGW Path setting to be configured on Windows.
- **Rebuild**: Cleans and then compiles the current Raylib project using default settings. Requires the MinGW Path setting to be configured on Windows.
- **Compile and Run**: Compiles the current Raylib project and runs the resulting executable. Requires the MinGW Path setting to be configured on Windows.

## Known Issues

This is an alpha version of the Raylib Visual Studio Code extension, and there may be some known issues or limitations. Please report any issues you encounter on the extension'srepository.

## Release Notes

### 1.0.0 - alpha

* Initial release of the Raylib Visual Studio Code extension. Provides basic functionality for creating, building, cleaning, rebuilding, and running Raylib projects.

## Documentation



## License

This software is released under the GPL-3.0 License. See the LICENSE file for more information.