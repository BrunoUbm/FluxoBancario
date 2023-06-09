<template>
  <div class="body" style="margin: 0px;">
    <header>
      <div class="cabecalho">
        <h2 class="nome space">{{ nome }}</h2>
        <h3 class="id space">Conta: {{ id }}</h3>
        <h4 class="saldo space">Saldo: R$ {{ saldo }}</h4>
        <h2 style="color: rgb(15, 125, 189); text-align: end; margin-right: 50px;">{{ horas }}: {{ minutos }}</h2>
      </div>
      <button class="return" @click="ReturnLogin">Sair</button>
    </header>

    <p class="limite"><strong>Seu limite é de: R$ {{ limite }}</strong></p>

    <div class="sub-header">
      <div class="sacar select" @click="Sacar">
        <p class="font-select">Sacar</p>
      </div>
      <div class="depositar select" @click="Depositar">
        <p class="font-select">Depositar</p>
      </div>
      <div class="transferir select" @click="Transferir">
        <p class="font-select">Transferir</p>
      </div>
    </div>
    <main class="content">
      <TransferirValor v-if="transferir" />
      <DepositarValor v-if="depositar" />
      <SacarValor v-if="sacar"/>
    </main>
  </div>
</template>

<script>
import TransferirValor from '@/components/Main/TransferirValor.vue';
import DepositarValor from '@/components/Main/DepositarValor.vue';
import SacarValor from '@/components/Main/SacarValor.vue'
import axios from 'axios'
export default{
  components: {
    TransferirValor,
    DepositarValor,
    SacarValor,
  },

  data() {
    return{
      nome: null,
      cpf: null,
      id: null,
      saldo: null,
      limite: null,

      transferir: false,
      depositar: false,
      sacar: false,

      horas: null,
      minutos: null
    }
  },

  props: {
    usuario: {
      type: [String],
    },

  },

  created() {
    const date = new Date()
    this.horas = date.getHours()
    this.minutos = date.getMinutes()

    const id = this.$route.params.id
    axios.get(`http://localhost:4000/usuarios`)
    .then((res) => {
      return res.data
    })
    .then((data) => {
      data.forEach(i => {
        if (i.id == id) {
          this.nome = i.name
          this.cpf = i.cpf
          this.saldo = i.saldo
          this.id = i.id
          this.limite = i.limiteConta
        }
      });
    })

    .catch((err) => {
      console.log(err);
    })
  },

  methods: {
    Transferir() {
      const renderElement = () => {
        this.transferir = true
        this.sacar = false
        this.depositar = false
      }
      renderElement()
    },
    Depositar() {
      const renderElement = () => {
        this.transferir = false
        this.sacar = false
        this.depositar = true
      }
      renderElement()
    },
    Sacar() {
      const renderElement = () => {
        this.transferir = false
        this.sacar = true
        this.depositar = false
      }
      renderElement()
    },
    ReturnLogin(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #e6e6e6;
  padding-bottom: 20px;
}

header{
  display: flex;
  flex-direction: row;
  background-color: #c9c9c9;
  box-shadow: 8px 8px 10px 0px #5e5e5e;
}
.limite{
  margin-top: 20px;
  font-size: 25px;
  border-bottom: solid;
  text-align: center;
}

.cabecalho{
  width: 100%;
  display: flex;
  color: rgb(0, 0, 0);
  flex-direction: column;
}

.sub-header{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
}

strong{
  color: rgb(0, 0, 0);
}
.font-select{
  font-size: 20px;
}
.select{
  text-align: center;
  width: 120px;
  padding: 40px 0px;
  background-color: rgb(224, 224, 224);
  color: rgb(20, 20, 20);
  border: solid;
  border-radius: 50%;
  margin: 20px 0px;
  cursor: pointer;
}

.select:hover{
  background-color: rgb(131, 131, 131);
  transition: 0.3s;
  transform: scale(1.1);
}

.nome{
  font-size: 45px;
}

.id{
  font-size: 45px;
}

.saldo{
  font-size: 45px;
}

.return{
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 15px;
  font-size: 20px;
  background-color:#0c0c0c;
  color: white;
  border: none;
  border-radius: 10px;
}
.return:hover{
  background-color: #342b35;
  transform: scale(1.02);
  transition: 0.3s;
}
.space{
  margin: 20px 20px;
  width: 40%;
  box-shadow: 8px 8px 10px 0px #242225;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
}

.content{
  width: 85%;
  border-radius: 20px;
  border: solid;
  margin: 0 auto;
  height: 500px;
}

@media screen and (max-width: 850px) {
  .cabecalho{
    width: 100%;
  }

  .content{
    height: 80vh;
  }

  .space{
    font-size: 20px;
  }
}

</style>
