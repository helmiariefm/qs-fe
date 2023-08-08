<script>
  import { mapActions, mapWritableState } from 'pinia';
  import { useCounterStore } from '../stores/counter';  
  import ProductCard from '../components/ProductCard.vue';

  export default{
      components: {          
          ProductCard
      },
      computed: {
        ...mapWritableState(useCounterStore, ['products', 'orders']),        
      },
      methods: {
        ...mapActions(useCounterStore, ['fetchProduct', 'fetchOrder', 'createOrder', 'clearCart']),
        handleOrder(id){
          this.createOrder(id)
        },
        handleClearCart(){
          this.clearCart()
        }       
      },
      mounted(){
        this.fetchProduct()
        this.fetchOrder()
      }
  }


</script>

<template>
    <div class="md:px-20 px-5 flex flex-col-reverse md:flex-row w-full">      
      <div class="md:w-4/6 grid grid-cols-1 md:grid-cols-3">
        <ProductCard v-for="prodProp in products" :key="prodProp.id" :prodProp="prodProp" v-on:click="$event => handleOrder(prodProp.id)"/>
      </div>
      
      <div class="md:w-2/6">
        <div class="bg-white w-full mr-9 mt-5 pt-7 pb-9 text-black text-center shadow-md">
          
          <div class="justify-center flex gap-2 mb-7">
            <img src="../assets/order.png" class="w-9"/>
            <h1 class="text-xl font-semibold">Your Order</h1>
          </div>
          
          <div v-for="Order in orders" :key="Order.id" class="mx-9 mb-5 flex justify-between">
            <div class="flex">
              <h4 class="my-auto ml-2">{{ Order.name }}</h4>
            </div>
            <div class="flex">
              <h4 class="my-auto mr-5">x{{ Order.amount }}</h4>              
            </div>
          </div>

          <div class="mt-9">
            <div class="mx-9 my-3">
              <button @click.prevent="handleClearCart()" class="text-red-600 font-semibold border-2 border-red-600 rounded-sm px-2 w-full">Clear Cart</button>
            </div>
  
            <div class="mx-9 my-3">
              <button class="text-white font-semibold bg-sky-500 hover:bg-sky-400 rounded-sm p-2 w-full">See Details</button>              
            </div>
          </div>          

        </div>
      </div>
    </div>
</template>