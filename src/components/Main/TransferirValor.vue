<template>
    <div class="body">
        <div class="main">
            <div class="inputs">
                <section>
                    <p>Para quem você deseja transferir?</p>
                    <input class="inp" type="text" placeholder="Digite o CPF...">
                </section>
                <section>
                    <p>Qual valor deseja transferir?</p>
                    <input class="inp" type="text" placeholder="Digite o valor...">
                </section>
                <button class="button">Transferir</button>
            </div>
            <div class="list">
                <ListarContas class="widthList"/>
            </div>
        </div>
    </div>
</template>

<script>
import ListarContas from '../login/ListarContas.vue';

export default{
    component: {
        ListarContas
    },
    components: { ListarContas }
}
</script>

<style scoped>
.body{
    width: 100%;
    border-radius: 20px;
}

.main{
    margin: 0 auto;
    display: flex;
    flex-direction: row;
}
.inputs{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    font-size: 20px;
}

.button{
    width: 150px;
    margin: 0 auto;
    padding: 7px 9px;
    font-size: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: solid;
}

.button:hover{
    background-color: rgb(197, 172, 202);
    transition: .3s;
    transform: scale(1.1);
}
.inp{
    margin-top: 5px;
    font-size: 15px;
    padding: 10px 45px 10px 10px;
    border-radius: 5px;
    border: solid;
}

.widthList{
    width: 80%;
}
.list{
    width: 50%;
}

</style>