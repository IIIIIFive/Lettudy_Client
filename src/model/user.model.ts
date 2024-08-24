export interface StudyRoom {
  roomId: string;
  title: string;
  alarm: boolean;
  isOwner: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  rooms: StudyRoom[];
}
