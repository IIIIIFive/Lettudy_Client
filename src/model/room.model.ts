import { CommonRes } from './common.model';

export interface RoomsRes extends CommonRes {
  count: number;
  rooms: RoomInfo[];
}

export interface RoomInfo {
  roomId: number;
  title: string;
}

export interface RoomDataRes extends CommonRes {
  roomId: string;
  title: string;
  code: string;
  notice: string;
  members: Members[];
  nextAttendance: NextAttendance;
  attendanceRecord: AttendanceRecord[];
  schedules: Schedules[];
}

export interface Members {
  profileNum: number;
  name: string;
  attendanceRate: number;
}

export interface NextAttendance {
  date: string;
  time: string;
}

export interface AttendanceRecord {
  date: string;
  time: string;
  status: boolean;
}

export interface Schedules {
  scheduleId: string;
  title: string;
  date: string;
  time: string;
  isAttendance: boolean;
}
