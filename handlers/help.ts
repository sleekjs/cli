import {Args} from '../deps.ts';
import {fail} from '../ui.ts';

export async function helpHandler(argv: Args) {
	const what = argv._[1];

	if (what) {
		if (typeof helpMessages[what] === 'string') console.log(helpMessages[what] as string);
		else fail('No such command!');
	} else console.log(helpMessages._default);
}

const helpMessages: Record<string, string> = {
	_default: `
Available commands:
	new     Generate a new sleek project
	dev     Start a development server
	build   Build the app
	help    Show this help

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
	build: 'sleek build: build the code and write it to the dist folder'
};
