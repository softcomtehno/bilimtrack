import { useQuery } from '@tanstack/react-query';
import { getCategory, getMakalas } from './makalabox.api';

const keys = {
  root: () => ['makalabox'],
  byCategory: () => [...keys.root(), 'category'],
};

export function useGetMakalas(categoryId?: number | 'all') {
  return useQuery({
    queryKey: [...keys.root(), categoryId],
    queryFn: () => getMakalas(categoryId),
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: keys.byCategory(),
    queryFn: getCategory,
  });
}

