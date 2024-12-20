<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-6">Users Management</h1>
        <h1 class="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p class="text-xl text-gray-600">Start building your amazing project here!</p>

        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="user in users" 
            :key="user.id" 
            class="bg-white shadow rounded-lg p-6"
          >
            <h2 class="text-xl font-semibold mb-2">{{ user.name }}</h2>
            <p class="text-gray-600 mb-4">{{ user.email }}</p>
            <div class="flex space-x-2">
              <button
                @click="updateUser(user.id, { name: 'Updated Name' })"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsers } from '@/composables/useUsers';

const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
</script>

<style>
/* Add custom styles here if needed */
</style>
