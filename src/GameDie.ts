import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

export default class GameDie {
	private readonly buffer: Buffer = Buffer.alloc(256);
	private position = 0;

	readonly bitmask: number;
	readonly num_sides: number;
	readonly size: number;

	constructor(num_sides: number, size: number, bitmask: number) {
		this.bitmask = bitmask;
		this.num_sides = num_sides;
		this.size = size;
	}

	async roll(): Promise<number> {
		const result: number = (await this.getRandomByte()) & this.bitmask;

		if (result <= (this.num_sides - 1)) {
			return result + 1;
		}

		return this.roll();
	}

	toString(): string {
		return `d${this.num_sides}`;
	}

	private async getRandomByte(): Promise<number> {
		if (this.position >= 256) {
			await this.refillBuffer();

			this.position = 0;
		}

		return this.buffer.at(this.position++) as number;
	}

	private async refillBuffer(): Promise<void> {
		await new Promise((resolve: (value: unknown) => void, reject: (reason: Error) => void): void => {
			crypto.randomFill(this.buffer, (error: Error | null, buffer: Buffer): void => {
				if (error) {
					reject(error);
				}

				resolve(buffer);
			});
		});
	}
}
