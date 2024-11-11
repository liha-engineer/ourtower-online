import { addEnemyTowerNotification } from '../../utils/notification/game.notification.js';
import Tower from './tower.class.js';
import { config } from '../../config/config.js';

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();

    this.towers = [];
    this.monsters = [];
    this.score = 0;
    this.baseHp = config.game.initData.baseHp;
    this.gold = config.game.initData.gold;

    this.gameId = null;
    this.state = config.game.state.waiting;
  }

  getNextSequence() {
    return ++this.sequence;
  }

  init = () => {
    this.towers = [];
    this.monsters = [];
    this.score = 0;
    this.baseHp = config.game.initData.baseHp;
    this.gold = config.game.initData.gold;

    this.gameId = null;
    this.state = config.game.state.waiting;
  };

  getAllTowers = () => {
    return this.towers;
  };

  towerNumber = () => {
    return this.towers.length;
  };

  getUserMonsterIndex(monsterId) {
    const monsterIndex = this.monsters.findIndex((monster) => monster.id === monsterId);
    return monsterIndex;
  }

  removeMonster(monsterIndex) {
    const removedMonster = this.monsters.splice(monsterIndex, 1)[0];
    return removedMonster;
  }

  //
  bindTower = (socket, x, y) => {
    const tower = new Tower(x, y, this.towerUniqueId++);
    this.towers.push(tower);

    console.log('towerId?:', this.towerUniqueId);

    socket.write(addEnemyTowerNotification(this.towerUniqueId, x, y));
    return tower;
  };
}

export default User;
