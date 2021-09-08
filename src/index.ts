import fs from 'fs';
import readline from 'readline';
//@ts-ignore
import mwu from 'mann-whitney-utest';

const data: Array<Array<number>> = [];
const stream = readline.createInterface({ input: fs.createReadStream(process.argv[2]) });
stream
	.on('line', (line: string) => {
		const values = line.split('\t');
		values.forEach((v, i) => {
			if (data.length <= i) {
				data.push([]);
			}
			data[i].push(parseFloat(v));
		});
	})
	.on('close', () => {
		console.log('data', data);
		const u = mwu.test(data);
		console.log('u', u);
		console.log('check', mwu.check(u, data));
		console.log('z', mwu.criticalValue(u, data));
		console.log('significant', mwu.significant(u, data));
	});
