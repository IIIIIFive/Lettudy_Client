import { CommonRes } from './common.model';

export interface LinkRes extends CommonRes {
  links: Links[];
}

export interface Links {
  id: string;
  title: string;
  link: string;
}
