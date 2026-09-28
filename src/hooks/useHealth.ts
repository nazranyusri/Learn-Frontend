import { getHealth } from '@/apis';
import { useQueryTemplate } from './useQueryTemplate';

export function useHealth() {
  const healthKey = ['health'];

  const data = useQueryTemplate({
    queryKey: healthKey,
    queryFn: getHealth,
  });

  return {
    isHealthPending: data.isPending,
    isHealthError: data.isError,
    healthData: data.data,
  };
}
