import { monstertable } from '../../../assets/monster.json' with { type : json }

class Monster {
    constructor () {
        this.monsterindex = monstertable.data[Math.floor(Math.random() * monstertable.data.length)]
        this.spawnTime = Date.now();
        this.id = this.monsterindex.id;
        this.hp = this.monsterindex.hp
        this.stageId = this.monsterindex.stage_id
        this.power = this.monsterindex.attackPower;
        this.gold = this.monsterindex.gold;
        this.score = this.monsterindex.score;
        this.speed = this.monsterindex.speed;
    }

    attacked (damage) {
        this.hp -= damage;
        if (hp < 0) {
            return false;
        }
        return true;
    }
}

export default Monster;