<script>
    import {RouterLink} from 'vue-router'
    import {mapActions, mapWritableState} from 'pinia';
    import { useCounterStore } from '../stores/counter';    

    export default{
        methods: {
            ...mapActions(useCounterStore, ['logout']),
            handleLogout(){
                this.logout()
            }
        },
        computed:{
            ...mapWritableState(useCounterStore, ['isLogin'])
        },
        mounted() {
            const storedIsLogin = localStorage.getItem('isLogin');
            if (storedIsLogin === 'true') {
                this.isLogin = true;
            }
        }
    }
</script>

<template>
    <div v-if="isLogin" class="w-full text-white">
        <div class="bg-primary flex px-20 py-2 justify-center md:justify-between">            
            <RouterLink to="/" class="self-center font-bold text-xl">Q-Commerce</RouterLink>
            <div class="flex px-14 py-2 justify-center md:justify-start font-semibold">
                <RouterLink to="/" active-class="active" class="mx-7">Products</RouterLink>
                <button @click="handleLogout">Logout</button>
            </div>
        </div>
    </div>
</template>

<style>
    .active {
        color: white;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 11px;
        font-weight: bold;
    }
</style>