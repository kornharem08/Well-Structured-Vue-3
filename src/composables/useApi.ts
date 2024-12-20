import { ref } from 'vue';
import api from '@/lib/axios';
import type { AxiosResponse, AxiosError } from 'axios';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T>() {
  const state = ref<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = async (url: string, options = {}) => {
    state.value.loading = true;
    state.value.error = null;
    
    try {
      const response: AxiosResponse<T> = await api.get(url, options);
      state.value.data = response.data;
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      state.value.error = axiosError.message;
      throw error;
    } finally {
      state.value.loading = false;
    }
  };

  const postData = async (url: string, payload: any, options = {}) => {
    state.value.loading = true;
    state.value.error = null;
    
    try {
      const response: AxiosResponse<T> = await api.post(url, payload, options);
      state.value.data = response.data;
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      state.value.error = axiosError.message;
      throw error;
    } finally {
      state.value.loading = false;
    }
  };

  const updateData = async (url: string, payload: any, options = {}) => {
    state.value.loading = true;
    state.value.error = null;
    
    try {
      const response: AxiosResponse<T> = await api.put(url, payload, options);
      state.value.data = response.data;
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      state.value.error = axiosError.message;
      throw error;
    } finally {
      state.value.loading = false;
    }
  };

  const deleteData = async (url: string, options = {}) => {
    state.value.loading = true;
    state.value.error = null;
    
    try {
      const response: AxiosResponse<T> = await api.delete(url, options);
      state.value.data = response.data;
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      state.value.error = axiosError.message;
      throw error;
    } finally {
      state.value.loading = false;
    }
  };

  return {
    ...state.value,
    fetchData,
    postData,
    updateData,
    deleteData,
  };
}