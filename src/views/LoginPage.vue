<template>
  <div>

    <div class="login" v-if="EnterRender">
      <h1 class="TextLogin">Entre em sua conta: </h1>
      <input class="user" type="text" v-model="access" placeholder="Digite seu CPF...">
      <button @click="EnterAcc" class="Enter-Button">Entrar</button>
      <h5 @click="AccessCreate" style="cursor: pointer;"><i>Criar conta</i></h5>
    </div>


    <div class="create" v-if="CreateRender">
      <div class="registro">
        <h1>Criar Conta</h1>
        <input v-model="name" class="inp-registro" type="text" placeholder="Digite seu nome...">
        <input v-model="cpf" class="inp-registro" type="text" placeholder="Digite seu CPF...">
        <input v-model="deposito" class="inp-registro" type="text" placeholder="Coloque o valor do seu primeiro depósito">
      </div>
      <button @click="CreateAcc" class="Create-Button">Criar</button>
    </div>

    <ListarContas v-if="EnterRender"/>

    <p class="tarifa" @click="Tarifa">Tarifa a ser cobrada</p>

  </div>
</template>

<script type="module" src="">
import ListarContas from '@/components/login/ListarContas.vue';
import axios from 'axios';
export default{

  components: {
    ListarContas
  },


  data() {
    return{
      EnterRender: true,
      CreateRender: false,
      name: null,
      cpf: null,
      deposito: null,
      access: null,
      month: null,
      day: null
    }
  },
  props: {
    usuario: {
      type: Object,
    }
  },
  methods: {
    EnterAcc() {
      const SearchUser = () => {
        axios.get('http://localhost:3000/usuarios')
        .then((res) => {
          return res.data
        })
        .then((data) => {
          return data.forEach(el => {
            if (el.cpf == this.access) {
              this.$router.push({name: 'usuario', params: {usuario: `${el.name}`, id: `${el.id}` }})
              const dados = {
                nome: el.name,
                saldo: el.saldo,
                id: el.id,
                cpf: el.cpf
              }
              this.$store.commit('AccessUser', dados)
            }
          });
          
        })
        .catch((err) => {
          console.log(err);
        })
      }
      SearchUser()
    },

    AccessCreate() {
      this.EnterRender = false
      this.CreateRender = true
    },

    CreateAcc() {
      const ValidationInfo = () => {
        const date = new Date()
        const day = date.getDay()
        const month = date.getMonth()

        const Reset = () => {
          this.name = null
          this.cpf = null
          this.deposito = null
        }
        const ConvertDeposit = parseFloat(this.deposito)

        if (ConvertDeposit > 0 && this.cpf.length == 11 && this.name != null) {
          this.EnterRender = true
          this.CreateRender = false

          const data = {
            name: this.name,
            cpf: this.cpf,
            saldo: ConvertDeposit,
            limiteConta: this.deposito * 0.10,
            day: day,
            month: month
          }
          axios.post('http://localhost:3000/usuarios', data)
          .then((res) => {
            alert('Conta Criada com sucesso!')
            return res
          })
          .catch((err) => {
            console.log(err);
          })

        Reset()
        }

        else{
          alert('Falha ao criar conta!')
        }

      }
      ValidationInfo()
    },
    Tarifa() {
      this.$router.push('/tarifa')
    }

  }
}

</script>

<style scoped>
.login{
  padding: 50px 0px;
  margin: 100px auto 0px;
  width: 30%;
  background-color: rgba(18, 0, 26, 0.7);
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.TextLogin{
  margin-bottom: 30px;
}
.create{
  padding: 50px 0px;
  margin: 100px auto 0px;
  width: 30%;
  background-color: rgba(18, 0, 26, 0.7);
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.user{
  width: 70%;
  margin: 0 auto;
  border-radius: 5px;
  border-color: none;
  padding: 10px 5px;
}

.Enter-Button{
  padding: 10px;
  font-size: 20px;
  margin: 20px auto;
  width: 30%;
}

button{
  background-color: rgb(155, 155, 155);
  border: solid;
  border-radius: 5px;
}

button:hover{
  background-color: rgb(107, 107, 107);
  transition: 0.3s;
}
.Create-Button{
  padding: 5px 20px;
  font-size: 20px;
  margin: 20px auto;
  width: 30%;
}

.registro{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    top: 0;
}

.tarifa{
  margin: 0 auto;
  text-align: center;
  border-bottom: solid;
  width: 10%;
  color: rgb(0, 36, 83);
  cursor: pointer;
}
.inp-registro{
    padding: 10px;
    margin: 5px auto;
    border-radius: 5px;
    width: 70%;
}
</style>