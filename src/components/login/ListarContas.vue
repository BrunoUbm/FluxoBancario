<template>
    <div class="face">
        <div class="data" v-for="i in data" :key="i">
            <p class="name inp">
                Nome: {{ i.name }}
            </p>
            <p class="cpf inp">
                CPF: {{ i.cpf }}
            </p>
            <p class="saldo inp">
                Saldo: {{ i.saldo }}
            </p>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            data: []
        }
    },

    created() {
        axios.get('http://localhost:3000/usuarios')
            .then((res) => {
                return res.data
            })
            .then((dt) => {
                dt.forEach(element => {
                    // const dados = {
                    //     nome: element.name,
                    //     cpf: element.cpf,
                    //     id: element.id
                    // }
                    this.data.push(element)
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    


}
</script>

<style scoped>
.data{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px 0px;
    padding: 10px 0px;
    background-color: rgb(163, 163, 163);
    border: solid;
}

.face{
    width: 60%;
    max-height: 300px;
    overflow-y: auto;
    margin: 50px auto;
}

@media screen and (max-width: 850px) {

    .face{
        width: 100%;
    }

}
</style>