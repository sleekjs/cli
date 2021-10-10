import {Args, ensureDirSync, existsSync} from '../deps.ts';
import {fail, prompt} from '../ui.ts';

export async function newHandler(argv: Args) {
	const name = argv.name ?? argv._[1] ?? await prompt('What is the name of the project');

	if (existsSync(name.replace(' ', '-'))) {
		fail('File/Folder already exists');
	}

	const nameSlug = name.replace(/\s|\/|\\/g, '-');

	ensureDirSync(`${nameSlug}/src/components`);
	Deno.writeTextFileSync(`${nameSlug}/src/App.sleek`, 'Todo');
	Deno.writeTextFileSync(`${nameSlug}/config.json`, JSON.stringify({
		entry: 'App.sleek'
	}, null, '	'));
	console.log('Initialized project', name);
}

