import { useQuery } from '@tanstack/react-query';
import { LargeCatItem } from '../apis/types/types';
import { instance } from '../apis/axios';

const fetchWorkSpaceData = async (checklistId: number) => {
  const { data } = await instance.get<LargeCatItem[]>(`/checklist/large-cat-item/${checklistId}`);
  return data;
};

export const useWorkSpaceData = (checklistId: number) => {
  return useQuery({
    queryKey: ['workspace', checklistId],
    queryFn: () => fetchWorkSpaceData(checklistId),
    enabled: !!checklistId,
  });
};