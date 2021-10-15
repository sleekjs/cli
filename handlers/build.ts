import {parse, ensureDirSync} from '../deps.ts';
import {fail} from '../ui.ts';
import {failWhenNotProject} from '../utils/failWhenNotProject.ts';

export function buildHandler() {
	failWhenNotProject();

	const config = JSON.parse(Deno.readTextFileSync('config.json'));

	ensureDirSync('dist');
	Deno.chdir('src');

	for (const path in config.routes || {}) {
		const entry = config.routes[path];
		let HTML = '', CSS = '', JS = '';

		try {
			({HTML, CSS, JS} = parse(Deno.readTextFileSync(entry))); // TODO HTML template customizable
		} catch {
			fail('File', entry, 'not found')
		}

		HTML = HTML.replace(/<%(css|js)%>/g, 'bundle');

		ensureDirSync(`../dist/${path}`)
		Deno.writeTextFileSync(`../dist/${path}/index.html`, HTML);
		Deno.writeTextFileSync(`../dist/${path}/bundle.css`, CSS);
		Deno.writeTextFileSync(`../dist/${path}/bundle.js`, JS);

		console.log('Built', entry);

		// TODO url params etc.
	}

	Deno.chdir('../');
}
