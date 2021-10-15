import {existsSync} from '../deps.ts';
import {fail} from '../ui.ts';

export const failWhenNotProject = (): never | void => {
	if (!existsSync('config.json')) {
		fail('Not a sleek app!');
	}
}
