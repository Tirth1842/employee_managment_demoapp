<template>
    <div class="container">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
        <div v-show="true ? err :false" class="alert alert-warning alert-dismissible fade show" role="alert">
             {{err}}
            
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="password"
            />
          </div>
           <button  @click="login_user" class="btn btn-primary btn-block" id="login">Login</button>
           
          
           
        
      </div>
    </div>
    </div>
  
</template>

<script>

export default {
    name: 'Login',
    data () {
        return{
            email: '',
            password: '',
            err:''
        }
    },
    methods: {
        async login_user() {
            const newUser = {
                email: this.email,
                password: this.password
            }
            const res = await fetch('http://localhost:5000/users/login',{
                method: 'POST',
                mode:'cors',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            const data = await res.json()
            console.log(data)
            this.email=''
            this.password=''
            this.err = data.err
            if(!this.err){
              this.$router.push({ path:'dashboard'})
              sessionStorage.setItem("logout","normal");
            }
           
            
        }
    },
    
    
}
</script>
