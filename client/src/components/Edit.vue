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
              v-model="first_name"
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
                
                v-model="last_name"
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
              
              v-model="email"
            />
          </div>
         
          
          <button @click="editUser(id)" class="btn btn-primary btn-block">
            Edit
          </button>
          <a  class=" btns btn btn-primary btn-block"   @click="deleteEmploye(id)">
            Delete
          </a>
         
       
      </div>
    </div>
  </div>
</template>

<script>


export default {
   name: 'Edit',
   data () {
       return {
           id:null,
           first_name: '',
           last_name: '',
           email: '',
           err: ''
       }
   },
   methods:{
       async fetchEmplolyedetail (id) {
           const res = await fetch(`http://localhost:5000/dashboard/${id}`)
           const data = await res.json()
           console.log(data)
           return data
       },
       async editUser (id) {
           const editedUser = {
               id: this.id,
               first_name: this.first_name,
               last_name: this.last_name,
               email: this.email
           }

           const res = await fetch(`http://localhost:5000/dashboard/${id}`,{
               method: 'POST',
               mode: 'cors',
               headers:{
                   'Content-type': 'application/json'
               },
               body: JSON.stringify(editedUser)
           })
           const data = await res.json()
           console.log(data)
           if(!data.err){
               this.$router.push({path:'/dashboard'})
           }else{
               this.err = data.err
           }
       },

       async deleteEmploye (id) {
         id = this.id
         const res = await fetch(`http://localhost:5000/dashboard/${id}`,{
           method: 'DELETE'
         })
         const data = await res.json()
         console.log(data)
         if(data.msg) {
           this.$router.push({path:'/dashboard'})
         }

       }
   },
    async created () {
         if(!sessionStorage.getItem('logout')){
            this.$router.push({path: '/'})
        }else{
            this.id=this.$route.params.id
            const employee = await this.fetchEmplolyedetail(this.id)
            this.first_name = employee.first_name
            this.last_name = employee.last_name
            this.email = employee.email
        }
        
       
       
   }
}
</script>
