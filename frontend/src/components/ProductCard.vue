<script>
    export default {
        props: ['prodProp'],
        methods: {
            handleImageError(prodProp){
                prodProp.img = '/brokenImg.png'
            }
        }
    }
</script>

<template>
    <div class="bg-white md:w-72 h-[320px] md:mr-9 mt-11 md:mt-5 text-black text-center shadow-md hover:scale-105 transition-all duration-300" >
        <img :src="prodProp.img" @error="handleImageError(prodProp)" class="md:w-72 h-60 md:mr-9 w-full"/>
        <h3 class="pt-3">{{ prodProp.name }}</h3>
        <h4 class="text-primary font-medium pb-3">{{ prodProp.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}</h4>
    </div>
</template>