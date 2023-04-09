import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';


export const AddViagem = (props) => {

    function handleModal() {
        props.close(false)
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
                        Novo cadastro de viagem
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Placa"
                            variant="outlined"
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Nome do motorista"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Telefone do motorista"
                            variant="outlined"
                        />
                    </Stack>
                    <Button
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
