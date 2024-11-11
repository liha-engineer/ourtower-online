import towertable from '../../../assets/tower.json' with { type : json }

class Tower {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.towerdata = towertable.data[0]
    this.id = towerdata.id
    this.type = towerdata.type
    this.cost = towerdata.cost
    this.power = towerdata.attack_power
    this.range = towerdata.range
    this.cooldown = towerdata.cooldown
    this.beamDuration = towerdata.beamDuration
    this.upgradeCost = towerdata.upgradeCost;
  }

  attack(monster) {
    // 몬스터 hp < 0이면 false, 아니면 true 반환할 것 
    const monsterAlive = monster.attacked(this.power)
    return monsterAlive;
  }
}

export default Tower;
