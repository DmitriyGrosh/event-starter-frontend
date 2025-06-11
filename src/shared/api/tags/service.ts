import { api } from '../api';
import { TagsResponse } from './types';

export const tagsService = {
    getPopularTags: async (limit: number = 10): Promise<TagsResponse> => {
        const { data } = await api.get<TagsResponse>(`/tags/popular?limit=${limit}`);
        return data;
    }
}; 