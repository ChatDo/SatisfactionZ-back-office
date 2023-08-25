<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-32 w-auto" src="../assets/satisfactionZ_no_round.svg"
           alt="SatisfactionZ"/>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
        <div class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connectez-vous à votre compte
        </div>
        <form class="space-y-6">
          <div class="mt-5">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Addresse email</label>
            <div class="mt-2">
              <input ref="email" id="email" name="email" type="email" autocomplete="email" required=""
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            <div class="mt-2">
              <input ref="password" id="password" name="password" :type="this.showPassword ? 'text' : 'password'" autocomplete="current-password" required=""
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            </div>
          </div>
          <button type="button" @click="togglePassword" class="text-blue-300 hover:text-blue-400">
            Show password
          </button>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                     class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm leading-6">
              <a href="contact" class="font-semibold text-indigo-600 hover:text-indigo-400">Forgot password?</a>
            </div>
          </div>

          <div>
            <button @click="setAuthCookie" type="button"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <!--        <a href="CONTACT COMPONENT">-->
        <!--          Ask a devis-->
        <!--        </a>-->
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  data() {
    return{
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
    async setAuthCookie() {
      console.log("setAuthCookie")
      console.log(this.$refs.email.value)
      console.log(this.$refs.password.value)
      await fetch(`${HOST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.$refs.email.value,
          password: this.$refs.password.value,
        })
      }).then(async (result) => {
        document.cookie = "accessToken" + "=" + `${(await result.json()).accessToken}` + ";";
        this.$router.push('/dashboard')
      })
    },
  },
}
</script>