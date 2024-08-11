<template>
  <v-app>
    <TopBar v-show="access.token" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import TopBar from "@/components/TopBar";

export default {
  name: "App",

  data: () => ({}),
  components: {
    TopBar,
  },

  created() {
    this.$router.push("/clientes").catch(() => {});
  },

  computed: {
    ...mapGetters(["getAccess", "getUser"]),
    user: {
      get() {
        return this.$store.getters.getUser;
      },
      set(value) {
        this.$store.dispatch("setUser", value);
      },
    },
    access: {
      get() {
        return this.$store.getters.getAccess;
      },
      set(value) {
        this.$store.dispath("setAccess", value);
      },
    },
         
    //
  },
};
</script>
