import { CommonRes } from './common.model';

export interface RoomsRes extends CommonRes {
  count: number;
  rooms: RoomInfo[];
}

export interface RoomInfo {
  roomId: number;
  titles: string;
}
