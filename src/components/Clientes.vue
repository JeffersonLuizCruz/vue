

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
        <h1 class="display-1 font-weight-bold mb-3">Clientes</h1>
      </v-col>
      <v-col>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo Cliente
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.telefone"
                      label="Telefone"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="clientes"
          class="elevation-1"
          hide-default-footer
        >
          <!-- <template v-slot:no-data>
            <v-btn color="primary" > Recargar </v-btn>
          </template> -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "ClientesList",
  data: () => ({
    color: 'primary',
    message: '',         
    dialog: false,
    snackbar: false,
    clientes: [],
    editedIndex: -1,
    editedItem: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    },

    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
      },
      { text: "CPF", value: "cpf" },
      { text: "Email", value: "email" },
      { text: "Telefone", value: "telefone" },
      { text: "Ações", value: "actions", sortable: false },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Editando Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
   
    async getClientes() {

      try {
        let response = await this.$http.get("list/");
        this.clientes = response.data;       
      } catch (error) {
        //redirect
        this.$router.push({ name: "login" }).catch(() => {});
      }
              

      // this.$http.get("clientelist/").then((response) => {
      //   this.clientes = response.data;
      // });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clientes[this.editedIndex], this.editedItem);

        this.$http.patch("clienteupdate/" + this.editedItem.id + "/", {
          nome: this.editedItem.nome,
          cpf: this.editedItem.cpf,
          email: this.editedItem.email,
          telefone: this.editedItem.telefone,
        });
      } else {
        this.$http
          .post("clientecreate/", this.editedItem)
          .then(() => {
            this.clientes.push(this.editedItem);
            // this.clientes.push(response.data);
            // this.dialog = false;
            //success
            this.snackbar = true;
            this.message = "Cliente cadastrado com sucesso!";
            this.color = "success";
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.dialog = false;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    
    snackbarAlter(bool){
      this.snackbar = bool;
    },

    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.clientes.indexOf(item);
      confirm("Você tem certeza que deseja deletar este item?") &&
        this.clientes.splice(index, 1);

      this.$http({
        method: "delete",
        url: "clientedelete/" + item.id + "/",
      }).then((response) => {
        // cliente apagado com sucesso
        this.snackbar = true;
        this.message = "Cliente apagado com sucesso!";
        this.color = "success";
        console.log(response);
      });
    },
  },

  // initialize() {
  //   this.getClientes();
  // },
};
</script>
