<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar size="64px">
            <v-img :src="avatarImage"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link @click="goTo({ name: 'clienteslist' })">
          <v-list-item-icon>
            <v-icon>mdi-office-building-marker-outline</v-icon>
          </v-list-item-icon>
          Clientes
        </v-list-item>
        <v-list-item link @click="goTo({ name: 'perfil' })">
          <v-list-item-icon>
            <v-icon>mdi-card-account-details</v-icon>
          </v-list-item-icon>
          Perfil
        </v-list-item>

        <v-list-item link @click="logOff">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  data: () => ({
    drawer: null,
    avatar: null,
  }),

  methods: {
    logOff() {
      this.$router.push("/clientes");
    },

    async getIcon() {
      // store avatar $store
      let img = this.$store.getters.getAvatar;
      if (img) {
        this.avatar = img;
      } else {
        try {
          let idUser = this.$store.getters.getUser.user.user_id;
          console.log(idUser);
          let response = await this.$http.get("user/image/" + idUser + "/");
          // console.log(idUser);
          // this.clientes = response.data;
          // console.log(response.data.avatar);
          // return response.data.avatar;
          this.avatar = response.data.avatar;
        } catch (error) {
          //redirect
          // this.$router.push({ name: "login" });
          console.log(error);
        }
      }
    },

    goTo(route) {
      this.$router.push(route).catch(() => {});
    },
  },

  computed: {
    avatarImage() {
      this.getIcon();
      return this.avatar === null
        ? "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        : this.avatar;
    },
  },
};
</script>

<style>
</style>