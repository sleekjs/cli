import {parseArgs} from './args.ts';
import {CLI_VERSION, ENGINE_VERSION} from './deps.ts';

import {newHandler} from './handlers/new.ts';
import {devHandler} from './handlers/dev.ts';
import {buildHandler} from './handlers/build.ts';

parseArgs(Deno.args, {})
	.defaultCommand(() => {
		console.log('sleek cli', CLI_VERSION, 'running sleek engine', ENGINE_VERSION);
		console.log('To view help, run `sleek help`');
	})
	.command('new', newHandler)
	.command('dev', devHandler)
	.command('build', buildHandler)
