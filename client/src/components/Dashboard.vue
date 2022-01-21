<template>
    
    <div class="container">
        <h1 class="mt-4">Dashboard</h1>

<div>
    <a @click="logout" class="btn btn-primary" id="logout">Logout</a>
</div>
<br>
<div>
  <a @click="user_add" class="btn btn-primary">ADD</a>
</div>

<br>
<br>
<div>
    <table class="table table-hover">
        <thead>
          <tr class="table-info">
            
            <th scope="col">Employee_FirstName</th>
            <th scope="col">Employee_LastName</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            
          </tr>
        </thead>
        <tbody>
            <tr v-for="(user,index) in users" :key="index" class="table-light">
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td><a class="btn btn-primary" @click="edit(user.id)">Edit</a></td>
            </tr>
           
          
          
        </tbody>
      </table>
</div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            users : []
        }
    },
    methods:{
        async fetchUser () {
            const res = await fetch('http://localhost:5000/dashboard',{
                mode: 'cors'
            })
            const data = await res.json()
            return data
        },
        async logout () {
            const res = await fetch('http://localhost:5000/users/logout')
            const data = await res.json()

            console.log(data)
            sessionStorage.removeItem('logout')
            this.$router.push({path:'/'})
            
        },
        user_add () {
            this.$router.push({path: '/dashboard/add'})
        },
        edit (id) {
            this.$router.push({path:`/dashboard/edit/${id}`})
        }
        
        
    },
    async created() {
        if(!sessionStorage.getItem('logout')){
            this.$router.push({path: '/'})
        }else{
            this.users = await this.fetchUser()
            console.log(this.users)
        }
        
    }
    
    
}

</script>
