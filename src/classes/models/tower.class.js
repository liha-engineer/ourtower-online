class Tower {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.beamDuration = 0;
    this.tartget = null;
  }

  attack(monster) {
    if (this.cooldown <= 0) {
      monster.hp -= this.attackPower; // 몬스터의 HP 감소
      this.cooldown = 180; // 3초  60 당 1 초
      this.beamDuration = 30; // 광선 지속 시간
      this.target = monster; // 광선의 목표 설정
    }
  }

  updateCooldown() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }
}

export default Tower;
