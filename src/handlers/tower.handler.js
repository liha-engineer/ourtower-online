import { PACKET_TYPES } from "../constants/packetTypes.js";
import { getServerGameAssets } from "../init/assets.js";
import { getGame, getGameSessions } from "../session/game.session.js";
import { getUserBySocket } from "../session/user.session.js";
import { createResponse } from "../utils/response/createResponse.js";


export const towerPurchaseHandler = async ({ socket, userId, payload }) => {
    // 유저가 접속한 게임세션 찾기
    // 게임에 속한 유저 데이터 중 towers 배열에 구매요청한 타워 추가
    // 타워구매 응답패킷 만들어 클라이언트에 반환
    
    const { x, y } = payload;
    const { towers } = getServerGameAssets();

    // 게임세션 안에 있는 유저를 찾는 것
    const user = getUserBySocket(socket)
    if (!user) {
        console.error('유저가 존재하지 않습니다.')
    }
    const towerCost = towers.data[0].cost
    user.gold -= towerCost; 
    
    const gameSession = getGameSessions().find((game) => game.users.includes(user));
    
    const opponentId = gameSession.getOpponentUserId(user.id)
    const opponent = gameSession.getUser(opponentId)

    // 이때 잡아오는건 적의 소켓을 잡아와서 bindTower에 넣어줘야 적 소켓에다 노티를 쏠 수 있다
    const newTower = user.bindTower(opponent.socket, x, y);
    
    const towerPurchaseResponse = createResponse(PACKET_TYPES.TOWER_PURCHASE_RESPONSE, {
        towerId: newTower.id
    })

    socket.write(towerPurchaseResponse);
}

// 
export const attackEnemeyHandler = async ({ socket, userId, payload }) => {
    const { towerId, monsterId } = payload;
    const user = getUserBySocket(socket)
    const gameSession = getGame(user.gameId)

    const userTower = user.towers.find((tower) => tower.id === towerId);
    if (!userTower) {
      console.log('타워가 존재하지 않습니다');
    }
  
    const userMonster = user.monsters.find((monster) => monster.id === monsterId);
    if (!userMonster) {
      console.log('몬스터가 존재하지 않습니다');
    }
    
    let dieMonster;
    // hp < 0 이면 false를 반환
    const monsterAlive = userTower.attack(userMonster)
    if (!monsterAlive) {
        const monsterIndex = userMonster.getMonsterIndex(monsterId)
        dieMonster = userMonster.removeMonster(monsterIndex)
    }

    const attackEnemyReponse = createResponse(PACKET_TYPES.ENEMY_TOWER_ATTACK_NOTIFICATION, {
        towerId,
        monsterId
    })

    socket.write(attackEnemyReponse)

}