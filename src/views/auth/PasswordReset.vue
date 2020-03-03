<template>
  <div>
    <container-center>
      <div class="flex flex-wrap -mx-4">
        <div class="md:w-1/2 px-4 mx-auto">
          <div class="md:px-10">
            <ApolloMutation
              :mutation="
                require('../../graphql/mutations/passwordreset.gql').default
              "
              :variables="{
                email: this.email,
                token: this.token,
                password: this.password,
                password_confirmation: this.password_confirmation
              }"
              @done="onDone"
              @error="onError"
            >
              <template v-slot="{ mutate, loading }">
                <heading size="heading" class="mb-5 text-center"
                  >Change password for <br />{{ email }}</heading
                >
                <!-- <p class="bg-red-200 text-red-700 text-sm rounded p-3 mb-4">It looks like you clicked on an invalid password reset link. Please try again.</p> -->
                <card class="shadow-md py-3">
                  <template>
                    <div class="mb-4">
                      <text-input
                        v-model="password"
                        type="password"
                        label="Password"
                        :errors="errors['password']"
                        @keydown="delete errors['password']"
                      ></text-input>
                    </div>

                    <div class="mb-4">
                      <text-input
                        v-model="password_confirmation"
                        type="password"
                        label="Confirm Password"
                      ></text-input>
                    </div>

                    <loading-button
                      class="mt-2 w-full"
                      :disabled="loading"
                      @click="mutate()"
                      :class="{ 'base-spinner': loading }"
                      >Change password</loading-button
                    >
                  </template>
                </card>
              </template>
            </ApolloMutation>
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
      email: this.$route.query.email,
      token: this.$route.params.token,
      password: null,
      password_confirmation: null
    };
  },

  computed: {
    ...mapGetters({
      errors: "errors"
    })
  },

  methods: {
    ...mapActions({
      setStatus: "reset/setStatus",
      setErrors: "setErrors"
    }),
    onDone({ data: { updateForgottenPassword } }) {
      if (updateForgottenPassword.status == "PASSWORD_NOT_UPDATED") {
        this.$router.replace({
          name: "forgotpassword"
        });
        this.$snack.danger({
          text: `It looks like you clicked on an invalid password reset link. Please try again.`,
          button: "Ok",
          action: this.clickAction
        });
      }
      if (updateForgottenPassword.status == "PASSWORD_UPDATED") {
        this.$router.replace({
          name: "login"
        });
        this.$snack.danger({
          text: `${updateForgottenPassword.message} Please login using new credentials.`,
          button: "Ok",
          action: this.clickAction
        });
      }
    },
    onError({ graphQLErrors }) {
      let errorCategory = graphQLErrors[0].extensions.category;
      if (errorCategory == "validation") {
        this.setErrors(graphQLErrors[0].extensions.validation);
      }
    }
  }
};
</script>
