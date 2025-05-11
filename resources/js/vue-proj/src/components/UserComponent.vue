<template>
<div class="container text-center pt-4">
    <div class="row mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="flex-grow-1 w-120 text-center mb-0">User List</h2>
            <button class="btn btn-primary ms-auto" data-toggle="modal" data-target="#addUserModal" @click="addUserModal">
                <i class="fa-solid fa-plus"></i> Add User
            </button>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody v-if="users.length">
        <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ new Date(user.created_at).toLocaleString() }}</td>
            <td>
                <i class="fa-solid fa-pen-to-square text-primary me-2" data-toggle="modal" data-target="#addUserModal" @click="updateUserModal(user)"></i>
                <i class="fa-solid fa-trash text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="passDate(user.id)"></i>
            </td>
        </tr>
        </tbody>
        <div v-else>
            <LoaderComponent/>
        </div>
    </table>

<!--    Add User Modal-->
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addUserModalLabel">
                        {{addUserForm ? 'Add User' : 'Update User'}}
                    </h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <input v-model="name" name="name" type="text" class="form-control" placeholder="Enter name">
                        </div>
                        <div class="form-group">
                            <input v-model="email" name="email" type="email" class="form-control mt-3" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <input v-model="password" name="password" :type="addUserForm ? 'password' : 'hidden'" class="form-control mt-3" placeholder="Enter password">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary closeModal" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="addUserForm ? saveUser() : updateUser()" :disabled="isSaving">
                        <template v-if="isSaving">
                            <div class="spinner-grow spinner-grow-sm text-light" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </template>
                        <template v-else>
                            {{ addUserForm ? 'Save User' : 'Update User' }}
                        </template>
                    </button>
                </div>
            </div>
        </div>
    </div>

<!--    Delete Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Alert!</h5>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete the user ?
                    <input v-model="userId" value="" type="hidden">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" @click="deleteUser" :disabled="isSaving">
                        <template v-if="isSaving">
                            <div class="spinner-grow spinner-grow-sm text-light" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </template>
                        <template v-else>
                            Delete
                        </template>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* global $ */
import UserService from "@/services/UserService";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    name: 'UserComponent',
    components: {LoaderComponent},
    data() {
        return {
            users: [],
            userId: '',
            name: '',
            email: '',
            password: '',
            isSaving: false,
            addUserForm: true,
        }
    },
    async created() {
        $('.modal-backdrop').remove();
        this.users = await UserService.getUsers();
    },
    methods:{
        showToast(message, type){
            toast(message,{
                type: type,
                    autoClose:3000,
            });
        },
        passDate(userId){
            this.userId = userId;
        },
        async deleteUser(){
            this.isSaving = true;
            const response = await UserService.deleteUser(this.userId);
            this.showToast(response.message, 'success');
            this.isSaving = false;
            $('#exampleModal').modal('hide');
            this.users = await UserService.getUsers();
        },

        async saveUser(){
            console.log('saveUser');
            this.isSaving = true;
          const user = {
              name: this.name,
              email: this.email,
              password: this.password,
          }
          try{
              const response = await UserService.saveUser(user);
              this.showToast(response.message, 'success');
              this.isSaving = false;
              $('.closeModal').trigger('click');
              this.users = await UserService.getUsers();
          }
          catch (e) {
              this.isSaving = false;
              const errors = e.response?.data?.errors;
              const firstError = Object.values(errors).flat()[0];
              this.showToast(firstError, 'error');
          }

        },

        async updateUser(){
            this.isSaving = true;
            const user = {
                id: this.userId,
                name: this.name,
                email: this.email,
                password: this.password,
            }
            try {
                const response = await UserService.updateUser(user)
                this.showToast(response.message, 'success');
                this.isSaving = false;
                $('.closeModal').trigger('click');
                this.users = await UserService.getUsers();
            }
            catch (e) {
                this.isSaving = false;
                const errors = e.response?.data?.errors;
                const firstError = Object.values(errors).flat()[0];
                this.showToast(firstError, 'error');
            }

        },
        updateUserModal(user){
            console.log(user);
            this.isSaving = false;
            this.addUserForm = false;
            this.userId = user.id;
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
        },
        addUserModal(){
            console.log('addUserModal');
            this.addUserForm = true;
            this.name = '';
            this.email = '';
            this.password = '';
        }
    }


}
</script>

<style>
i.fa-trash,
i.fa-pen-to-square{
    cursor: pointer;
}
</style>
