import { BaseApi } from '@/shared/utils/api/core';

// Types
export interface NewFeatItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewFeatData {
  name: string;
  description: string;
}

export interface UpdateNewFeatData {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

class NewFeatApi extends BaseApi {
  constructor() {
    super('/new-feat');
  }

  // CRUD Operations
  async getList(params?: { page?: number; limit?: number; search?: string }) {
    const queryString = params
      ? `?${new URLSearchParams(params as any).toString()}`
      : '';
    return this.get<NewFeatItem[]>(`/${queryString}`);
  }

  async getById(id: string) {
    return this.get<NewFeatItem>(`/${id}`);
  }

  async create(data: CreateNewFeatData) {
    return this.post<NewFeatItem>('/', data);
  }

  async update(id: string, data: UpdateNewFeatData) {
    return this.put<NewFeatItem>(`/${id}`, data);
  }

  async deleteItem(id: string) {
    return this.delete(`/${id}`);
  }

  // Custom methods
  async getActiveItems() {
    return this.get<NewFeatItem[]>('/active');
  }

  async bulkDelete(ids: string[]) {
    return this.post('/bulk-delete', { ids });
  }
}

export const newFeatApi = new NewFeatApi();
