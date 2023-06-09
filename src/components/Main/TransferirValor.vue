<template>
    <div class="body">
        <div class="main">
            <div class="inputs" v-if="list">
                <section>
                    <p>Para quem você deseja transferir?</p>
                    <input class="inp" type="text" v-model="cpf" placeholder="Digite o CPF...">
                </section>
                <section>
                    <p>Qual valor deseja transferir?</p>
                    <input class="inp" type="text" v-model="transfer" placeholder="Digite o valor...">
                </section>
                <button class="button" @click="TransferValue">Transferir</button>
            </div>

            <div class="confirmar" v-if="confirmar">
                <ConfirmarTransfer />
                <input type="text" v-model="InitCpf" class="validationInp" placeholder="Digite os 3 primeiros dígitos do CPF...">
                <button @click="TransferCancel" class="btnVal">Cancelar</button>
                <button @click="TransferConfirm" class="btnVal">Confirmar</button>
            </div>
            
            <div class="list" v-if="list">
                <ListarContas class="widthList"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ListarContas from '../login/ListarContas.vue';
import ConfirmarTransfer from './ConfirmarTransfer.vue';

export default{
    components: {
        ListarContas,
        ConfirmarTransfer
    },
    data() {
        return {
            cpf: null,
            transfer: null,
            list:true,
            confirmar: false,
            InitCpf: null,
            cpfSub: null
        }
    },
    methods: {
        TransferValue() {
            const ConvertTransfer = parseFloat(this.transfer)
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
                this.cpfSub = data.cpf
                if (ConvertTransfer > 0 && ConvertTransfer <= data.saldo && ConvertTransfer < 1000 && this.cpf != this.cpfSub) {
                    const TransferirSaldo = () => {
                        if (this.cpf != data.cpf) {
                            axios.put(`http://localhost:4000/usuarios/${router}`, {
                            name: data.name,
                            cpf: data.cpf,
                            saldo: data.saldo - ConvertTransfer,
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
                        }
                        else{
                            return
                        }
                    }

                    const ReceberSaldo = () => {
                        const cpf = this.cpf
                        axios.get(`http://localhost:4000/usuarios`)
                        .then((res) => {
                            return res.data
                        })
                        .then((dat) => {
                            dat.forEach(el => {
                                if (el.cpf == cpf && cpf != data.cpf) {
                                    axios.put(`http://localhost:4000/usuarios/${el.id}`, {
                                        name: el.name,
                                        cpf: el.cpf,
                                        saldo: el.saldo + ConvertTransfer,
                                        limiteConta: el.limiteConta,
                                        month: dt.month
                                    })
                                    .then((rs) => {
                                        return rs
                                    })
                                    .catch ((err) => {
                                        console.log('erro' + err);
                                    })
                                }
                            });
                        })
                        .catch((erro) => {
                            console.log(erro);
                        })
                        console.log(cpf);
                    }


                    if (ConvertTransfer >= 1000) {
                        this.confirmar = true
                        this.list = false
                    }
                    
                    else{
                        TransferirSaldo()
                        ReceberSaldo()
                    }

                    alert('Transferência efetuada com sucesso!')
                }
                else if(ConvertTransfer >= 1000 && this.cpf != this.cpfSub){
                    this.confirmar = true
                    this.list = false
                }
                else{
                    alert('Erro ao efetuar a transferência!')
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },



        TransferCancel() {
            this.confirmar = false
            this.list = true
            this.cpf = null
            this.transfer = null
        },



        TransferConfirm() {
            const TresPrimeirosDigitos = this.cpfSub.substring(0, 3)
            const ConvertTransfer = parseFloat(this.transfer)
            if (this.InitCpf == TresPrimeirosDigitos) {
                const router = this.$route.params.id;

                axios.get(`http://localhost:4000/usuarios/${router}`)
                .then((res) => {
                    return res.data
                })
                .then((dt) => {
                    const dataT = {
                        name: dt.name,
                        cpf: dt.cpf,
                        saldo: dt.saldo,
                        limiteConta: dt.limiteConta,
                        month: dt.month
                    }
                    this.cpfSub = dataT.cpf
                    if (ConvertTransfer <= dataT.saldo) {
                        const Transferir = () => {
                            if (this.cpf != dataT.cpf) {
                                axios.put(`http://localhost:4000/usuarios/${router}`, {
                                name: dataT.name,
                                cpf: dataT.cpf,
                                saldo: dataT.saldo - ConvertTransfer,
                                limiteConta: dataT.limiteConta,
                                month: dataT.month
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
                                return
                            }
                        }
                        Transferir()

                        const Receber = () => {
                            const cpf = this.cpf
                            console.log(cpf);
                            axios.get(`http://localhost:4000/usuarios`)
                            .then((res) => {
                                return res.data
                            })
                            .then((dat) => {
                                dat.forEach(el => {
                                    if (el.cpf == cpf && cpf != dataT.cpf) {
                                        axios.put(`http://localhost:4000/usuarios/${el.id}`, {
                                            name: el.name,
                                            cpf: el.cpf,
                                            saldo: el.saldo + ConvertTransfer,
                                            limiteConta: el.limiteConta,
                                            month: el.month
                                        })
                                        .then((rs) => {
                                            return rs
                                        })
                                        .catch ((err) => {
                                            console.log('erro' + err);
                                        })
                                        this.cpf = null
                                        this.transfer = null
                                    }
                                });
                            })
                            .catch((erro) => {
                                console.log(erro);
                            })
                        }
                        Receber()

                    alert('Transferência efetuada com sucesso!')
                    this.list = true
                    this.confirmar = false
                    }
                    else{
                        alert('Erro ao efetuar a transferência!')
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

            }
        }
    }
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

.validationInp{
    border: solid;
    padding: 10px;
}

.btnVal{
    padding: 10px 0px;
    border: solid;
    border-radius: 5px;
    background-color: rgb(189, 189, 189);
    margin: 5px 0px;
}

.btnVal:hover{
    background-color: rgb(124, 124, 124);
    transition: 0.3s;
    transform: scale(1.05);
}
.widthList{
    width: 80%;
}
.list{
    width: 50%;
}

.confirmar{
    margin: 100px auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    background-color: rgb(204, 204, 204);
    border: solid;
}
p{
    color: white;
}

@media screen and (max-width: 850px) {
    .main{
        flex-direction: column;
        text-align: center;
        align-items: center;
        margin-top: 100px;
        text-align: center;
    }

    .list{
        width: 100%;
    }
    .inputs{
        width: 100%;
    }

    .button{
        margin-top: 10px;
    }
}

</style>