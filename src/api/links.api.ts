import { LinkRes, Links } from '@/model/link.model';
import { httpClient } from './http';

export const getLinks = async (roomId: string) => {
  const response = await httpClient.get<LinkRes>(`/links/${roomId}`);
  return response.data;
};

export const postLink = async (roomId: string, link: Omit<Links, 'id'>) => {
  const response = await httpClient.post(`/links/${roomId}`, { link });
  return response.data;
};

export const deleteLink = async (roomId: string, linkId: string) => {
  const response = await httpClient.post(`/links/${roomId}/${linkId}`);
  return response.data;
};
