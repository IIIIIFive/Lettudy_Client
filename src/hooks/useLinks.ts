import { Links } from '@/model/link.model';
import { httpClient } from '@/api/http';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getLinks } from '@/api/links.api';

export const useLink = () => {
  const queryClient = useQueryClient();
  const { roomId } = useParams<{ roomId: string }>();

  const { data } = useQuery({
    queryKey: ['links', roomId],
    queryFn: () => getLinks(roomId!),
    enabled: !!roomId,
  });

  const links = data?.links || [];

  const addLink = async (newLink: Omit<Links, 'id'>) => {
    try {
      await httpClient.post(`/links/${roomId}`, newLink);
      queryClient.invalidateQueries({ queryKey: ['links', roomId] });
    } catch (error) {
      console.error('링크 추가 오류가 발생했습니다.');
    }
  };

  const removeLink = async (linkId: string) => {
    try {
      await httpClient.delete(`/links/${roomId}/${linkId}`);
      queryClient.invalidateQueries({ queryKey: ['links', roomId] });
    } catch (error) {
      console.error('링크 삭제 오류가 발생했습니다.');
    }
  };

  return {
    links,
    addLink,
    removeLink,
  };
};
