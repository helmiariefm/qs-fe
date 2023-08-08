import {defineStore} from 'pinia'
import axios from 'axios'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const useCounterStore = defineStore('counter', {
    state(){
        return {
          server: 'http://localhost:3000',
          isLogin: false,
          products: [],
          orders: []
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
        },

        async fetchProduct(){
            const { data } = await axios({
                method: "get",
                url: `${this.server}/products/get-products`,
            });            
            this.products = data;
        },

        async fetchOrder(){
            const { data } = await axios({
                method: "get",
                url: `${this.server}/orders/list`
            })       
            this.orders = data
        },

        async createOrder(id){
            // console.log(id, "<<<< coming from COUNTER STORE")
            try {
                const {data}= await axios({
                    method: "post",
                    url: `${this.server}/orders/${id}`,
                })
                const existingOrder = this.orders.find(ord => ord.id === data.id)
                if (existingOrder) {
                    existingOrder.amount = data.amount
                    existingOrder.total_price = data.total_price
                } else {
                    this.orders.push(data)
                }                
                this.products = this.products.map(prod => prod.id === id ? { ...prod, selected: false } : prod)
                this.router.push("/");
            } catch (err) {
                console.log(err)
            }
        },
        
        async clearCart(){
            try {
                const {data} = await axios({
                    method: 'delete',
                    url: `${this.server}/orders/clear-cart`
                })
                this.orders = []
            } catch (err) {
                console.log(err)
            }
        } 
    }
})