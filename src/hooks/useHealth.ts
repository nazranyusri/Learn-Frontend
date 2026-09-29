import { getHealth } from '@/apis';
import { useQueryTemplate } from './useQueryTemplate';

export function useHealth(enabled = true) {
  const healthKey = ['health'];

  const data = useQueryTemplate({
    queryKey: healthKey,
    queryFn: getHealth,
    enabled,
  });

  return {
    isHealthPending: data.isPending,
    isHealthError: data.isError,
    healthData: data.data,
  };
}
