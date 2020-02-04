<template>
    <div>
        <nav class="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <span class="font-semibold text-xl tracking-tight">JWT-Boil</span>
            </div>
             
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">
                    <router-link :to="{
                            name: 'home'
                        }"
                        class="block mt-4 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
                    >
                        Home
                    </router-link>
                       
                    <template v-if="authenticated">
                        
                        <router-link :to="{
                                name: 'dashboard'
                            }"
                            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
                        >
                            Dashboard
                        </router-link>
                    </template>

                    <template v-else>
                        <router-link :to="{
                                name: 'login'
                            }"
                            class="block mt-5 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
                        >
                            Login
                        </router-link>    
                    </template>
                </div>
            </div>

            <div>
                <a 
                    v-if="authenticated"
                    href="#"
                    @click.prevent="logout()"
                    class="block mt-4 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
                >
                    Logout
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },

        methods: {
            ...mapActions({
                logoutAction: 'auth/logout'
            }),

            logout () {
                this.logoutAction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
</script>

 