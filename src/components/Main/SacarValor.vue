<template>
    <div class="body">
        <div class="main">
            <p>Digite o valor do saque:</p>
            <input type="text" v-model="sac" placeholder="Digite o valor...">
            <button @click="SacValue">Sacar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data() {
        return{
            sac: null
        }
    },
    methods: {
        SacValue() {
            const agora = new Date()
            const hora = agora.getHours();
            console.log(hora);
            const ConvertSac = parseFloat(this.sac)
            const router = this.$route.params.id;


            axios.get(`http://localhost:4000/usuarios/${router}`)
            .then((res) => {
                return res.data
            })
            .then((dt) => {
                const data = {
                    name: dt.name,
                    cpf: dt.cpf,
                    saldo: dt.saldo,
                    limiteConta: dt.limiteConta,
                    month: dt.month
                }
                if (ConvertSac > 0 && ConvertSac <= (data.saldo + data.limiteConta) && data.saldo >= -data.limiteConta  && hora >= 8 && hora <= 22) {
                    axios.put(`http://localhost:4000/usuarios/${router}`, {
                    name: data.name,
                    cpf: data.cpf,
                    saldo: data.saldo - ConvertSac,
                    limiteConta: data.limiteConta,
                    month: data.month
                    })
                    .then((res) => {
                        return res
                    })
                    .then((data) => {
                        return data
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    alert('Saque efetuado com sucesso!')
                }
                else{
                    alert('Erro ao sacar! Verifique novamente o valor')
                }
            })
            .catch((error) => {
                console.log(error);
            })

            this.sac = null
        }
    }
}
</script>

<style scoped>
.body{
    border-radius: 20px;
}

.main{
    padding: 100px 0px;
    display: flex;
    flex-direction: column;

}

p{
    font-size: 30px;
    margin-bottom: 10px;
    margin: 0 auto;
    color: white;
}
input{
    font-size: 25px;
    padding: 5px 10px 10px 20px;
    border-radius: 5px;
    border: solid;
    width: 30%;
    margin: 10px auto;
}

button{
    width: 100px;
    padding: 7px 13px;
    font-size: 20px;
    margin: 0 auto;
    background-color: white;
    border: solid;
    border-radius: 5px;
}
button:hover{
    background-color: rgb(197, 172, 202);
    transition: .3s;
    transform: scale(1.1);
}

@media screen and (max-width: 850px) {
  p{
    font-size: 25px;
  }

  input{
    width: 60%;
  }
}

</style>