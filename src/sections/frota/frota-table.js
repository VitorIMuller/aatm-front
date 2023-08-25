import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const FrotaTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = []
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Placa
                                </TableCell>
                                <TableCell>
                                    Motorista
                                </TableCell>
                                <TableCell>
                                    Telefone Motorista
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer) => {
                                const isSelected = selected.includes(customer.id);

                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                        selected={isSelected}
                                    >
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            > <Typography variant="subtitle2">
                                                    {customer.placa}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {customer.motorista ? customer.motorista[0]?.nome : ''}
                                        </TableCell>
                                        <TableCell>
                                            {customer.motorista ? customer.motorista[0]?.telefone : ''}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
        </Card>
    );
};

FrotaTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
