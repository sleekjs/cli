/*
 * Prompt for a response
 */
export async function prompt(message = '') {
	const buf = new Uint8Array(1024);
	await Deno.stdout.write(new TextEncoder().encode(`\u001b[33m?\u001b[36m ${message}?\u001b[0m `));
	const n = <number>await Deno.stdin.read(buf);
	return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

/*
 * Fail with error
 */
export const fail = (...why: unknown[])=> {
	console.error('Error:', ...why);
	Deno.exit(1);
}
