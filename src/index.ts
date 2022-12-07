import GameDie from '@dice/GameDie';

export default {
	d4: new GameDie(4, 1, 7),
	d6: new GameDie(6, 1, 15),
	d8: new GameDie(8, 1, 15),
	d10: new GameDie(10, 1, 31),
	d12: new GameDie(12, 1, 31),
	d20: new GameDie(20, 1, 63),
	d100: new GameDie(100, 1, 255)
};
