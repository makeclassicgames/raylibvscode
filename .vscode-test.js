const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([{
	label: "Mistests",
	files: 'out/test/**/*.test.js',
	version: 'insiders',
	workspaceFolder: 'C:/raylib/projects/test_project2/',
	mocha:{
		ui: 'tdd',
		timeout: 2000
	},
	launchArgs:['--disable-workspace-trust'],
	
}]);
