import { ref, onMounted } from 'vue';
import { useApi } from './useApi';

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsers() {
  const { fetchData, postData, updateData, deleteData, loading, error } = useApi<User[]>();
  const users = ref<User[]>([]);

  const getUsers = async () => {
    try {
      const data = await fetchData('/users');
      users.value = data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async (userData: Partial<User>) => {
    try {
      const newUser = await postData('/users', userData);
      users.value.push(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const updateUser = async (id: number, userData: Partial<User>) => {
    try {
      const updatedUser = await updateData(`/users/${id}`, userData);
      const index = users.value.findIndex(user => user.id === id);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await deleteData(`/users/${id}`);
      users.value = users.value.filter(user => user.id !== id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  onMounted(() => {
    getUsers();
  });

  return {
    users,
    loading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}