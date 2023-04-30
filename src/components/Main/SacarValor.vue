<template>
    <div class="body">
        <div class="main">
            <p>Digite a quantia que deseja sacar:</p>
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
            const router = this.$route.params.id;
            const ConvertSac = parseFloat(this.sac)
            const agora = new Date()
            const hora = agora.getHours();
            console.log(hora);


            axios.get(`http://localhost:3000/usuarios/${router}`)
            .then((res) => {
                return res.data
            })
            .then((dt) => {
                const data = {
                    name: dt.name,
                    cpf: dt.cpf,
                    saldo: dt.saldo,
                    limiteConta: dt.limiteConta
                }
                if (ConvertSac > 0 && ConvertSac <= data.limiteConta && data.saldo >= data.limiteConta  && hora >= 8 && hora <= 18) {
                    axios.put(`http://localhost:3000/usuarios/${router}`, {
                    name: data.name,
                    cpf: data.cpf,
                    saldo: data.saldo - ConvertSac,
                    limiteConta: data.limiteConta
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
}
input{
    font-size: 25px;
    padding: 5px 10px 10px 20px;
    border-radius: 5px;
    border: solid;
    width: 500px;
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
</style>