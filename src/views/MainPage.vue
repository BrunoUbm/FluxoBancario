<template>
  <div class="body" style="margin: 0px;">
    <header class="cabecalho">
      <h2 class="nome space">{{ nome }}</h2>
      <h3 class="id space">Número da conta: {{ id }}</h3>
      <p class="saldo space">Saldo: R$ {{ saldo }}</p>
    </header>
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
    SacarValor
  },

  data() {
    return{
      nome: null,
      cpf: null,
      id: null,
      saldo: null,

      transferir: false,
      depositar: false,
      sacar: false
    }
  },

  props: {
    usuario: {
      type: [String],
    },

  },

  created() {
    const id = this.$route.params.id
    axios.get(`http://localhost:3000/usuarios`)
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
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #957599;
  padding-bottom: 20px;
}

.cabecalho{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2a0030;
  box-shadow: 8px 8px 10px 0px #38003f;
  color: white;
}

.sub-header{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
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

.space{
  margin: 20px 20px;
  width: 40%;
  box-shadow: 8px 8px 10px 0px #c89bdd;
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

</style>
