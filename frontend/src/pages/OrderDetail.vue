<script>    
    import { mapActions, mapWritableState } from 'pinia';
    import { useCounterStore } from '../stores/counter';    

    export default{
      computed: {
        ...mapWritableState(useCounterStore, ['orders']),
        grandTotal() {
            return this.orders.reduce((accumulator, prodProp) => accumulator + prodProp.total_price, 0);
        }
      },
      methods: {
        ...mapActions(useCounterStore, ['fetchOrder']),
        handleImageError(prodProp) {          
          prodProp.foto = '/brokenImg.png'
        }
      },
      mounted(){
        this.fetchOrder()        
      }
    }
</script>

<template>
  <div class="md:px-20 px-5 pt-9 w-full">
    <div class="w-full md:p-9 px-3 py-3 bg-white shadow-lg relative">      
      <div class="overflow-x-auto">
        <table class="w-full text-black">
          <thead>
            <tr class="bg-gray-300 text-left">
              <th class="px-4 py-2">#</th>
              <th class="px-4 py-2">Product Name</th>
              <th class="px-4 py-2">Image</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Amount</th>
              <th class="px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prodProp, i) in orders" :key="prodProp.id" class="even:bg-white odd:bg-gray-100">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ prodProp.name }}</td>
              <td class="md:px-4 py-2">
                <img :src="prodProp.img" @error="handleImageError(prodProp)" class="w-28 h-20 object-cover md:w-40 md:h-28"/>
              </td>
              <td class="md:px-4 px-2 text-sm md:text-base py-2">{{ prodProp.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}</td>
              <td class="px-4 py-2">{{ prodProp.amount }}</td>
              <td class="px-4 py-2">{{ prodProp.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}</td>              
            </tr>
            <tr class="bg-zinc-300">
                <td class="px-4 py-2 text-lg font-semibold">Grand Total</td>
                <td colspan="4"></td>
                <td class="px-4 py-2 font-semibold text-lg">{{ grandTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}</td>
            </tr>
          </tbody>
        </table>

        <button class="absolute right-9 bg-primary rounded-sm text-white px-11 text-lg mt-11">BUY</button>
      </div>
    </div>
  </div>
</template>
