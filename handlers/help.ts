import {Args} from '../deps.ts';
import {fail} from '../ui.ts';

export function helpHandler(argv: Args) {
	const what = argv._[1];

	if (what) {
		if (typeof helpMessages[what] === 'string') console.log(helpMessages[what] as string);
		else fail('No such command!');
	} else console.log(helpMessages._default);
}

const helpMessages: Record<string, string> = {
	_default: `
Available commands:
	new      Generate a new sleek project
	dev      Start a development server
	build    Build the app
	generate Scaffold a new part of your app
	help     Show this help

For more detailed help, run \`sleek help [command-name]\`
	`.trim(),
	new: `
sleek new: Generate a new sleek project

arguments:
	name
		The name of the new project
	`.trim(),
	dev: `
sleek dev: Start a new dev server at a provided port or the default 4242

options:
	--port
		The port at which to serve. Defaults to 4242
	`.trim(),
	build: 'sleek build: build the code and write it to the dist folder',
	generate: `
sleek generate: Scaffold a part of your current project

arguments:
	schema
		The schema of the thing to generate. Can be one of:
		- component
		- service

	name
		The path to write at, relative to the srv directory.
		The basename of the string will be used as the name.

	`.trim()
};
