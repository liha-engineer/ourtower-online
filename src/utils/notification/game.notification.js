import { getProtoMessages } from '../../init/proto.js';
import { PACKET_TYPE_NAMES, PACKET_TYPES } from '../../constants/packetTypes.js';
import { createHeader } from '../header/createHeader.js';

const makeNotification = (message, type) => {
  const headerBuffer = createHeader(type, message, 1);

  return Buffer.concat([headerBuffer, message]);
};

export const gameStartNotification = (initialGameState, playerData, opponentData) => {
  const protoMessages = getProtoMessages();
  const gamePacket = protoMessages.GamePacket;

  const startPacketTypeName = PACKET_TYPE_NAMES[PACKET_TYPES.MATCH_START_NOTIFICATION];

  const payload = {};
  payload[startPacketTypeName] = { initialGameState, playerData, opponentData };

  const startPacket = gamePacket.encode(payload).finish();

  return makeNotification(startPacket, PACKET_TYPES.MATCH_START_NOTIFICATION);
};

export const addEnemyTowerNotification = (towerId, x, y) => {
  const protoMessages = getProtoMessages();
  const gamePacket = protoMessages.GamePacket;

  const packetTypeName = PACKET_TYPE_NAMES[PACKET_TYPES.ADD_ENEMY_TOWER_NOTIFICATION];

  const payload = {};
  payload[packetTypeName] = { towerId, x, y };

  const addEnemyTowerPacket = gamePacket.encode(payload).finish();

  return makeNotification(addEnemyTowerPacket, PACKET_TYPES.ADD_ENEMY_TOWER_NOTIFICATION);
};
