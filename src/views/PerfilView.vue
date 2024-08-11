<template>
  <v-container>
    <v-snackbar v-model="snackbar" :color="color">
      {{ message }}
      <v-btn dark text absolute @click="snackbarAlter(false)"> 
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- image avatar -->
              <v-row>
                <v-col cols="12">
                  <!-- input file avatar variavel  -->

                  <!-- image avatar selected-->
                  <v-row>
                    <v-col cols="5">
                      Imagem:
                      <v-img
                        :src="avatarImage"
                        max-width="100%"
                        max-height="100%"
                        contain
                      ></v-img>
                      <v-file-input
                        v-model="files"
                        color="deep-purple accent-4"
                        counter
                        label="File input"
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                    <v-col cols="7">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.username"
                              label="Usuário"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.first_name"
                              label="Nome"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.last_name"
                              label="Último Nome"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.email"
                              label="Email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-row>
                              <v-checkbox
                                v-model="perfil.is_superuser"
                                disabled
                                label="Administrador"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="perfil.is_staff"
                                disabled
                                label="Membro"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="perfil.is_active"
                                disabled
                                label="Ativo"
                              >
                              </v-checkbox>
                            </v-row>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.date_joined"
                              label="Data de Cadastro"
                              disabled
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.last_login"
                              label="Último Login"
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <!-- save -->
                          <v-col cols="12">
                            <v-btn
                              color="success"
                              class="mr-4"
                              @click="save"
                              :disabled="!isChanged"
                            >
                              Salvar
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  props: {},

  user: {
    id: 0,
    user: "",
    avatar: null,
  },
  name: "PerfilView",
  data() {
    return {
      color: 'primary',
      message: '',  
      snackbar: false,
      dialog: false,
      avatar: null,
      files: [],
      perfil: {
        is_superuser: true,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false,
        is_active: false,
        date_joined: "",
        last_login: "",
      },
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    async getPerfil() {
      try {
        this.user = await this.$store.getters.getUser.user.user_id;
        if (this.user == undefined) {
          return;
        }
        let response = await this.$http.get("user/detail/" + this.user + "/");
        this.perfil = response.data;
        Vue.use(require("vue-moment"));
        this.perfil.date_joined = this.$moment(this.perfil.date_joined).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        this.perfil.last_login = this.$moment(this.perfil.last_login).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      } catch (error) {
        //redirect
        // this.$router.push({ name: "login" }).catch(() => {});
        // console.log(error);
      }
    },
    async getUserAvatar() {
      try {
        let idUser = await this.$store.getters.getUser.user.user_id;
        if (idUser == undefined) {
          return;
        }
        let response = await this.$http.get("user/image/" + idUser + "/");
        // this.$store.commit("setUser", response.data);
        // this.$store.dispatch("setAvatar", response.data.avatar);
        this.avatar = response.data.avatar;
        // console.log(this.avatar);
      } catch (error) {
        console.log(error);
      }
    },

    snackbarAlter(bool){
      this.snackbar = bool;
      // this.$router.push({ name: "clienteslist" }).catch(() => {});
      //reload app
      // this.$router.go();
      
    },

    save() {    
      if (this.files != []) {
        // upload image avatar
        // console.log('aham');
        let formData = new FormData();
        formData.append("avatar", this.files);
        this.$http
          .put("user/image-update/" + this.user + "/", formData)
          .then((response) => {
            this.snackbar = true;
            this.message = "Atualizado usuário com sucesso!";
            this.color = "success";
            // this.$store.dispatch("setAvatar", response.data.avatar);
            this.avatar = response.data.avatar;
            // update topbar image user
            this.$store.dispatch("setAvatar", this.avatar);
          })
          .catch((error) => {
            console.log(error);
          });

        


      }
      

      

      
      // console.log(this.perfil.email);
      this.$http
        .get("user/detail/" + this.perfil.id + "/", {
          first_name: this.perfil.first_name,
          last_name: this.perfil.last_name,
          email: this.perfil.email,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          console.log(error);
        });

      // try {
      //   console.log(this.perfil);
      //   console.log("user/detail/" + this.perfil.id + "/");
      //   let response = await this.$http.patch(
      //     "user/detail/" + this.perfil.id + "/",
      //     {
      //       "is_superuser": true,
      //       "username": "zeca",
      //       "first_name": "Zeca 123",
      //       "last_name": "1234",
      //       "email": "zeca@zeca.com.br",
      //       "is_staff": true,
      //       "is_active": true,
      //       "date_joined": "2022-11-14T21:22:10Z",
      //       "last_login": "2022-11-22T00:17:39.919909Z"
      //     }
      //   );
      //   alert("Dados atualizados com sucesso!");
      //   console.log(response);
      //   // this.$store.commit("setUser", response.data);
      //   // this.$router.push({ name: "perfil" })
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
  created() {
    this.getPerfil();
  },
  mounted() {
    this.getPerfil();
  },
  computed: {
    avatarImage() {
      this.getUserAvatar();
      return this.avatar === undefined
        ? "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        : this.avatar;
    },
    isChanged() {
      return (
        this.perfil.username !== "" &&
        this.perfil.first_name !== "" &&
        this.perfil.last_name !== "" &&
        this.perfil.email !== ""
      );
    },
  },
};
</script>

<style>
</style>