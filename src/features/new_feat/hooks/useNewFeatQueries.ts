import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateNewFeatData,
  newFeatApi,
  UpdateNewFeatData,
} from '../services/newFeat.api';

// Query Keys
export const NEW_FEAT_QUERY_KEYS = {
  all: ['newFeat'] as const,
  lists: () => [...NEW_FEAT_QUERY_KEYS.all, 'list'] as const,
  list: (params: any) => [...NEW_FEAT_QUERY_KEYS.lists(), params] as const,
  details: () => [...NEW_FEAT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...NEW_FEAT_QUERY_KEYS.details(), id] as const,
  active: () => [...NEW_FEAT_QUERY_KEYS.all, 'active'] as const,
};

// Queries
export const useNewFeatList = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: NEW_FEAT_QUERY_KEYS.list(params),
    queryFn: () => newFeatApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useNewFeatDetail = (id: string) => {
  return useQuery({
    queryKey: NEW_FEAT_QUERY_KEYS.detail(id),
    queryFn: () => newFeatApi.getById(id),
    enabled: !!id,
  });
};

export const useActiveNewFeatItems = () => {
  return useQuery({
    queryKey: NEW_FEAT_QUERY_KEYS.active(),
    queryFn: () => newFeatApi.getActiveItems(),
    staleTime: 5 * 60 * 1000,
  });
};

// Mutations
export const useCreateNewFeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewFeatData) => newFeatApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.active() });
    },
  });
};

export const useUpdateNewFeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNewFeatData }) =>
      newFeatApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: NEW_FEAT_QUERY_KEYS.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.active() });
    },
  });
};

export const useDeleteNewFeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => newFeatApi.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.active() });
    },
  });
};

export const useBulkDeleteNewFeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => newFeatApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: NEW_FEAT_QUERY_KEYS.active() });
    },
  });
};
