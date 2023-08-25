import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import * as api from '../../api/servicos.js'



export const AddFrota = (props) => {

    const [dados, setDados] = useState({
        placa: '',
        motorista: '',
        telefone: ''
    })

    function handleModal() {
        props.close(false)
    }

    const createCaminhao = (dados) => {
        const dadosFormatados = {
            placa: dados.placa,
            motorista: {
                nome: dados.motorista,
                telefone: dados.telefone,
                cpf: dados.cpf
            }
        }
        api.createCaminhao(dadosFormatados).then((res) => {
            window.location.reload()
        })
    }
    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Novo cadastro de caminhão
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Placa"
                            variant="outlined"
                            required
                            fullWidth 
                            onChange={(e) => setDados({ ...dados, placa: e.target.value })}
                        />
                    </Stack>
                    <Stack sx={{ mb: 2 }}>
                        <TextField
                            id="outlined-basic"
                            label="Nome do motorista"
                            variant="outlined"
                            required
                            onChange={(e) => setDados({ ...dados, motorista: e.target.value })}
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <TextField
                            id="outlined-basic"
                            label="CPF do motorista"
                            variant="outlined"
                            fullWidth 
                            required
                            numbver
                            onChange={(e) => setDados({ ...dados, cpf: e.target.value })}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Telefone do motorista"
                            variant="outlined"
                            onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                        />
                    </Stack>
                    <Button
                        onClick={()=> createCaminhao(dados)}
                        variant="contained"
                        sx={{ mt: 2 }}>
                        Salvar
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
