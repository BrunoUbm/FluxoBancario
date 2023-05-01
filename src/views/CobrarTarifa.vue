<template>
    <div>
        <button class="sair" @click="Sair">Sair</button>
        <div class="main">
            <h1>Valor da tarifa: <strong>R$ 19,90</strong></h1>
            <button class="btn" @click="CobrarTarifa">Cobrar tarifa</button>
            <ListarContas />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ListarContas from '@/components/login/ListarContas.vue';
export default{
    components: {
        ListarContas
    },
    methods: {
        Sair() {
            this.$router.push('/')
        },

        CobrarTarifa() {
            const date = new Date()
            const month = date.getMonth();
            const tarifa = 19.90

            axios.get('http://localhost:3000/usuarios')
            .then((res) => {
                return res.data
            })
            .then((data) => {
                data.forEach(el => {
                    if (el.month == month) {
                        console.log("Tarifa cobrada");
                        console.log(el);
                        axios.put(`http://localhost:3000/usuarios/${el.id}`, {
                            name: el.name,
                            cpf: el.cpf,
                            saldo: el.saldo - tarifa,
                            limiteConta: el.limiteConta,
                            month: el.month + 1
                        })
                    }
                    else {
                        console.log(`Sem cobranças para serem feitas para ${el.name}!`);
                    }
                });
                alert('Cobrança de tarifa feita com sucesso')
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.sair{
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 15px;
    background-color: rgb(51, 29, 59);
    border: none;
    color: white;
}

.sair:hover{
    background-color: rgb(29, 17, 34);
    transition: 0.2s;
}

.main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1{
    margin-top: 100px;
    margin-bottom: 50px;
}

.btn{
    font-size: 25px;
    padding: 15px 20px;
    background-color: rgb(168, 168, 168);
    border-radius: 5px;
    border: none;
}

.btn:hover{
    background-color: rgb(109, 109, 109);
    transform: scale(1.1);
    transition: 0.3s;
}

strong{
    color: rgb(129, 0, 0);
    border-bottom: solid;
}

</style>