export interface StudyRoom {
  roomId: string;
  title: string;
  alarm: boolean;
  isOwner: boolean;
}

export interface User {
  name: string;
  email: string;
  rooms: StudyRoom[];
}
