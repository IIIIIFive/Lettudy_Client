import { CommonRes } from './common.model';

export interface ChatRes extends CommonRes {
  chatId: string;
  chats: Chats[];
}

export interface Chats {
  chatItemId: string;
  sender: string;
  content: string;
  createdAt: string;
  profileNum: number;
}
