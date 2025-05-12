import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

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
