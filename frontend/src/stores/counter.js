import {defineStore} from 'pinia'
import axios from 'axios'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const useCounterStore = defineStore('counter', {
    state(){
        return {
          server: 'http://localhost:3000',
          isLogin: false          
        }
    },
    actions: {
        async login(form){
            try {
              const {data} = await axios({
                method: 'post',
                url: `${this.server}/users/login`,
                data: form
              })
              localStorage.setItem('access_token', data.access_token)
              localStorage.setItem('isLogin', true)
              this.isLogin = true
              this.router.push('/')
              Toastify({
                text: "Logged in",
                duration: 3000                
              }).showToast();
              this.router.replace({name: 'home'})
            } catch (err) {
              const errMsg = err.response.data.message[0].message        
              Toastify({
                text: `${err.response.status} ${err.code}: ${errMsg}`,
                duration: 5000,
                close: true,
                style: {
                    background: "linear-gradient(to right, #d45353, #ed9daa)",
                  }
              }).showToast();
            }
        },

        logout(){
            localStorage.clear('access_token')
            localStorage.removeItem('isLogin')
            this.isLogin = false
            this.router.replace('/login')
            Toastify({
              text: "Logged out",
              duration: 3000                
            }).showToast();
            this.router.replace({name: 'login'})
          }
    }
})