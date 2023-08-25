import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { FrotaTable } from 'src/sections/frota/frota-table';
import { AddFrota } from 'src/sections/frota/add-frota';
import * as api from '../api/servicos.js'

const now = new Date();

const data = [
    {
        id: '1',
        placa: 'QIR-0E80',
        motorista: 'Anderson Tabarelli',
        telefone: '(47)9 9999-9999'
    },
    {
        id: '2',
        placa: 'MLW-2G08',
        motorista: 'Marco Aurelio',
        telefone: '(47)9 9999-9999'
    },
    {
        id: '3',
        placa: 'RLH-0E80',
        motorista: 'Sandro Tabarelli',
        telefone: '(47)9 9999-9999'
    },
];

const useCustomers = (page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};

const useCustomerIds = (customers) => {
    return useMemo(
        () => {
            return customers.map((customer) => customer.id);
        },
        [customers]
    );
};

const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [frota, setFrota]=useState([])
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);
    const [data, setData]= useState([])

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    const handleClose = () => {
        setOpen(false);
    };

    async function buscarCaminhoes() {
        await api.getFrota().then((res) => {
            setFrota(res)
        })
    }

    useEffect(() => {
        buscarCaminhoes()
    }, [])

    return (
        <>
            <Head>
                <title>
                    AATM | Frota
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Frota
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={() => setOpen(true)}
                                >
                                    Novo caminhão
                                </Button>
                            </div>
                        </Stack>
                        <AddFrota
                            open={open}
                            close={handleClose}
                        />
                        <FrotaTable
                            count={frota.length}
                            items={frota}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
