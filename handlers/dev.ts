import {Args} from '../deps.ts';
import {buildHandler} from './build.ts';

import {Application, HttpError, Status} from 'https://deno.land/x/oak@v9.0.1/mod.ts';

export async function devHandler(argv: Args) {
	buildHandler();

	const app = new Application();
	const port = argv.port || 4242;

	const watcher = Deno.watchFs(['src/', 'config.json']);

	for await (const event of watcher) {
		buildHandler();
	}

	app.use(async (context: any, next: any) => {
		try {
			await next();
		} catch (e) {
			if (e instanceof HttpError) {
				context.response.status = e.status as any;
				if (e.expose) {
					context.response.body = `
					<!DOCTYPE html>
					<html>
						<body>
							<h1>${e.status} - ${e.message}</h1>
						</body>
					</html>`;
				} else {
					context.response.body = `
					<!DOCTYPE html>
					<html>
						<body>
							<h1>${e.status} - ${Status[e.status]}</h1>
						</body>
					</html>`;
				}
			} else if (e instanceof Error) {
				context.response.status = 500;
				context.response.body = `
				<!DOCTYPE html>
				<html>
					<body>
						<h1>500 - Internal Server Error</h1>
					</body>
				</html>`;
				console.log('Unhandled Error:', e.message);
				console.log(e.stack);
			}
		}
	});

	app.use(async (context: any, next: any) => {
		await next();
		const rt = context.response.headers.get('X-Response-Time');
		console.log(
			`${context.request.method} ${context.request.url.pathname} - ${String(rt)}`,
		);
	});

	app.use(async (context: any, next: any) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		context.response.headers.set('X-Response-Time', `${ms}ms`);
	});

	app.use(async (context: any) => {
		await context.send({
			root: Deno.cwd() + '/dist',
			index: 'index.html',
		});
	});

	app.addEventListener('listen', ({hostname, port, serverType}) => {
		console.log(`Start listening on ${hostname}:${port}`);

		console.log('  using HTTP server:', serverType);
	});

	await app.listen({hostname: '127.0.0.1', port});
}
