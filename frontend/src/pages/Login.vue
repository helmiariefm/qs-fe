<script>
    import { mapActions } from 'pinia'
    import { useCounterStore } from '../stores/counter'

    export default{
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            ...mapActions(useCounterStore, ['login']),            
            handleLogin(){
                this.login({
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<template>
    <div class='md:flex md:flex-row flex flex-col-reverse'>
    <div class='md:w-7/12 md:h-screen py-3 md:py-0 bg-gradient-to-r from-[#32ae1e] to-[#1e8d91] flex items-center text-white text-center'>
      <div class='md:mx-auto px-9'>
        <img src='../assets/ilus.png' alt='ilustration' class='md:w-[494px] w-72 mx-auto'/>
        <h1 class='md:text-3xl text-xl md:w-[440px] my-3 md:mx-auto mx-9 font-bold'>Q-Commerce is an online shop</h1>
        <p class='md:w-[494px] font-thin'>Since its establishment in 2009, Q-Commerce has transformed into a unicorn that is influential not only in Indonesia but also in Southeast Asia.</p>
      </div>
    </div>
    
    <div class='md:w-5/12 md:h-screen text-center md:py-36 py-5'>
      <div class='flex md:mx-40 mx-11 pt-5'>
        <div class='font-bold text-white bg-gradient-to-r from-primary to-[#1e8d91] px-2 h-6 my-auto rounded-full mr-2'>
          <span class='text-base'>Q</span>
        </div>
        <h1 class='text-lg font-semibold'>Q-Commerce</h1>
      </div>
      <form class='text-left mx-auto w-80' @submit.prevent="handleLogin">
        <h1 class='text-xl font-bold my-5'>Login to your account</h1>
        <div class='relative'>
          <font-awesome-icon icon="envelope" class='absolute left-3 top-2 text-gray-400'/>
          <input v-model="email" type='email' class='pl-10 border w-full rounded-md p-1 mb-5'/>
        </div>
        <div class='flex flex-col'>
          <label class='font-semibold text-sm mb-1'>Password</label>
          <div class='relative'>
            <font-awesome-icon icon="lock" class='absolute left-3 top-2 text-gray-400'/>
            <input v-model="password" type="password" class='pl-10 border w-full rounded-md p-1 pr-8 mb-5'/>            
          </div>
        </div>        
        <button class='rounded-md hover:bg-[#37ba23] bg-primary text-white text-sm w-full py-1 mb-3 font-semibold' type='submit'>Login</button>        
      </form>      
    </div>      
  </div>
</template>