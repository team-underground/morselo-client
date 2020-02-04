<template>
    <div id="app">
        <the-navigation />

        <router-view/>
    </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';

export default {
    name: 'app',
    
    components: {
        TheNavigation
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
