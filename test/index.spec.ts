import test from 'ava';
import sinon from 'sinon';

import crypto from 'node:crypto';
import chi2gof from '@stdlib/stats-chi2gof';

import GameDie from '@dice/GameDie';
import dice from '@dice/index';

const iterations = 10000000;
const delta = 0.05;
const significance = 0.05;

Object.values(dice).forEach((die: GameDie): void => {
	const average = Math.floor(die.num_sides / 2) + 0.5;
	const observed = new Array(die.num_sides).fill(0);

	test.serial(`${die} rolls results in range ${iterations.toLocaleString('en-us')} times`, async (t) => {
		for (let i = 0; i < iterations; i++) {
			observed[(await die.roll()) - 1]++;
		}

		t.true(observed.length === die.num_sides);
		t.true(observed.reduce((sum, each) => sum + each, 0) === iterations);
	});

	test.serial(`${die} results approximate an average value of ${average} ±${delta}`, (t) => {
		const result: number = observed
			.map((each, i) => each * (i + 1))
			.reduce((sum, each) => sum + each, 0) / iterations;

		const actual = result >= (average - delta) && result <= (average + delta);
		const message = `\r\n\ttrue average: ${average}\tactual: ${result}`;

		t.true(actual, message);
	});

	test.serial(`${die} results pass chi-squared goodness of fit test, P>${significance}`, (t) => {
		const expected = new Array(die.num_sides).fill(undefined).map((_) => iterations / die.num_sides);
		const result = chi2gof(observed, expected, { alpha: significance });
		const message = `\r\n\tfailed chi-squared goodness of fit test, P=${result.pValue}`;

		t.false(result.rejected, message);
	});

	test.serial(`parsing ${die} as a string returns the correct notation`, (t) => {
		t.true(die.toString() === `d${die.num_sides}`);
	});

	test.serial(`refilling the ${die} byte buffer fails when a system error occurs`, async (t) => {
		const exposed: any = die;
		const error: Error = new Error('error');
		const stub = sinon.stub(crypto, 'randomFill').callsArgWith(1, error);

		await t.throwsAsync(async () => {
			await exposed.refillBuffer();
		}, { instanceOf: Error });

		stub.restore();
	});
});
