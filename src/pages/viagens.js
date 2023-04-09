import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { AddCustomer, AddCustomes } from 'src/sections/customer/add-customer';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { FrotaTable } from 'src/sections/frota/frota-table';
import { AddViagem } from 'src/sections/viagens/add-viagem';
import { ViagensTable } from 'src/sections/viagens/viagens-table';

const now = new Date();

const data = [
    {
        id: '1',
        data: '11/09/2022',
        origem: 'Indaial',
        destino: 'São Paulo',
        caminhao: 'QIR-0E80',
        valorTotal: 'R$ 5.800,00'
    },
    {
        id: '2',
        data: '12/09/2022',
        origem: 'São Paulo',
        destino: 'Indaial',
        caminhao: 'QIR-0E80',
        valorTotal: 'R$ 3.200,00'
    },
    {
        id: '3',
        data: '13/09/2022',
        origem: 'Brusque',
        destino: 'São Paulo',
        caminhao: 'RLH-0E80',
        valorTotal: 'R$ 5.950,00'
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
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

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

    return (
        <>
            <Head>
                <title>
                    AATM | Viagens
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
                                    Viagens
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
                                    Nova Viagem
                                </Button>
                            </div>
                        </Stack>
                        <AddViagem
                            open={open}
                            close={handleClose}
                        />
                        {/* <CustomersSearch /> */}
                        <ViagensTable
                            count={data.length}
                            items={customers}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
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
