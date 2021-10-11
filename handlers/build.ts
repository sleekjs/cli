import {parse, existsSync, ensureDirSync} from '../deps.ts';
import {fail} from '../ui.ts';

export function buildHandler() {
	if (!existsSync('config.json')) {
		fail('Not a sleek app!');
	}

	const config = JSON.parse(Deno.readTextFileSync('config.json'));

	ensureDirSync('dist');
	Deno.chdir('src');

	for (const path in config.entries || {}) {
		const entry = config.entries[path];
		let HTML = '', CSS = '', JS = '';

		try {
			({HTML, CSS, JS} = parse(Deno.readTextFileSync(entry))); // TODO HTML template customizable
		} catch {
			fail('File', entry, 'not found')
		}

		HTML = HTML.replace(/<%css|js%>/g, 'bundle');

		ensureDirSync(`../dist/${path}`)
		Deno.writeTextFileSync(`../dist/${path}/index.html`, HTML);
		Deno.writeTextFileSync(`../dist/${path}/bundle.css`, CSS);
		Deno.writeTextFileSync(`../dist/${path}/bundle.js`, JS);

		console.log('Built', entry);

		// TODO url params etc.
	}

	Deno.chdir('../');
}
