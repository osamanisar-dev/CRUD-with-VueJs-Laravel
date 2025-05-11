import axios from "axios";

const API_URL = 'https://e864-2400-adcc-2104-1c00-67db-cf52-4ffe-e289.ngrok-free.app/api/';

export default {
    async getUsers() {
        const response = await axios.post(API_URL + 'users');
        return response.data;
    },
    async saveUser(user) {
        const response = await axios.post(API_URL + 'user', user);
        return response.data;
    },
    async updateUser(user) {
        const response = await axios.patch(API_URL + 'user/' + user.id, user);
        return response.data;
    },
    async deleteUser(id) {
      const response = await axios.delete(API_URL + 'user/' + id);
      return response.data;
    }

}
