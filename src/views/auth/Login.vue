<template>
  <div>
    <container-center>
      <div class="flex flex-wrap -mx-4">
        <div class="md:w-1/2 px-4 mx-auto">
          <div class="md:px-10">
            <form method="post" @submit.prevent="submit">
              <template>
                <heading size="heading" class="mb-5 text-center"
                  >Sign in to Vue-Bits</heading
                >
                <!-- <p
                  class="bg-red-200 text-red-700 text-sm rounded p-3 mb-4"
                  v-if="status && statuses.includes(status.status)"
                >
                  {{ status.message }}
                  It looks like you clicked on an invalid password reset link.
                  Please try again.
                </p> -->
                <card class="shadow-md py-3">
                  <template>
                    <div class="mb-4">
                      <text-input
                        v-model="form.email"
                        label="Email"
                        :errors="errors['username']"
                        @keydown="delete errors['username']"
                      ></text-input>
                    </div>

                    <div class="mb-3">
                      <text-input
                        v-model="form.password"
                        type="password"
                        label="Password"
                        :errors="errors['password']"
                        @keydown="delete errors['password']"
                      ></text-input>
                    </div>
                    <router-link
                      :to="{ name: 'forgotpassword' }"
                      class="text-gray-600 hover:text-blue-500 float-right text-sm"
                      >Forgot Password?</router-link
                    >

                    <loading-button class="mt-3 mb-6 w-full" ref="loginButton"
                      >Sign in</loading-button
                    >
                    <a
                      href="http://vue-bits-server.test/login/github"
                      class="w-full bg-black base-button inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-lg px-4 py-2 border border-black text-white bg-black"
                      ref="loginButton"
                      >Login using Github</a
                    >
                  </template>
                </card>
              </template>
            </form>
          </div>
        </div>
      </div>
    </container-center>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Heading from "@/components/ui/Heading";
import LoadingButton from "@/components/ui/LoadingButton";
import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";

export default {
  components: {
    Heading,
    LoadingButton,
    ContainerCenter,
    Card,
    TextInput,
    LoadingButton
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      errors: "errors"
    })
  },

  methods: {
    ...mapActions({
      login: "auth/login",
      setErrors: "setErrors"
    }),

    submit() {
      this.$refs.loginButton.startLoading();
      this.login(this.form)
        .then(() => {
          this.$refs.loginButton.stopLoading();
          this.$router.replace({
            name: "dashboard"
          });
        })
        .catch(({ graphQLErrors }) => {
          this.$refs.loginButton.stopLoading();

          let errorCategory = graphQLErrors[0].extensions.category;
          if (errorCategory == "authentication") {
            let errors = {
              username: [
                "The login credentials you have provided is incorrect."
              ]
            };
            this.setErrors(errors);
          }
          if (errorCategory == "validation") {
            this.setErrors(graphQLErrors[0].extensions.validation);
          }
        });
    }
  }
};
</script>
