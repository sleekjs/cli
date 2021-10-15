import {Args, basename, dirname} from '../deps.ts';
import {fail} from '../ui.ts';
import {failWhenNotProject} from '../utils/failWhenNotProject.ts';

export function generateHandler(argv: Args) {
	failWhenNotProject();

	const [, schema, name] = argv._;

	if (!schema || !name) fail('missing arguments');
	const handler = schemas[schema.toString().toLowerCase()];

	const realName = basename(name.toString());
	const path = dirname(name.toString());

	if (handler) handler(realName, path);
}

type Schema = (name: string, path: string) => void;

const schemas: Record<string, Schema> = {
	component: (name: string, path: string) => {
		Deno.writeTextFile(`${path}/${name}.sleek`, `<p>${name} works!</p>`);
	},
	service: (name: string, path: string) => {
		Deno.writeTextFile(
			`${path}/${name}.js`,
			`export const ${name} = () => console.log('${name} works!');`
		);
	},

	c: (this as unknown as Record<string, Schema>).component as Schema,
	s: (this as unknown as Record<string, Schema>).service as Schema,
}
