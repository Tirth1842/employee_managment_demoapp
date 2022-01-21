<template>
    <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
       
         <div v-show="true ? err :false" class="alert alert-warning alert-dismissible fade show" role="alert">
             {{err}}
            
          </div>
        
          <div class="form-group">
            <label for="name">First_Name</label>
            <input
              type="name"
              id="name"
              name="first_name"
              class="form-control"
              placeholder="Enter Name"
              required="required"
              v-model="first_name"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="name">Last_Name</label>
              <input
                type="name"
                id="name"
                name="last_name"
                class="form-control"
                placeholder="Enter Name"
                required="required"
                v-model="last_name"
                value=""
              />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              required="required"
              v-model="email"
              value="   "
            />
          </div>
         
          
          <button @click="add_user" class="btn btn-primary btn-block">
            Add
          </button>
         
        
      </div>
    </div>
  </div>
</template>

<script>
    export default{
        name: 'Add',
        data () {
            return {
                first_name: '',
                last_name: '',
                email: '',
                err:''
            }
        },
        methods: {
            async add_user () {
                const newEmployee = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email
                }
                const res = await fetch('http://localhost:5000/dashboard/add',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newEmployee)
                })

                const data = await res.json()
                console.log(data)
                if(data.err){
                    this.err = data.err
                }else{
                    this.$router.push({path: '/dashboard'})
                }
                
            }
        },
        async created () {
             if(!sessionStorage.getItem('logout')){
            this.$router.push({path: '/'})
        }
        }
    }
</script>
