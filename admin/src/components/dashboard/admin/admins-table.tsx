'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { ShieldStar, User } from '@phosphor-icons/react';
import { useSelection } from '@/hooks/use-selection';
import AdminProps from '@/types/admin';
import AdminOptions from '@/components/dashboard/admin/admins-actions';
import { ClipSpinner } from '@/components/loader/spinner';


interface AdminsTableProps {
  rows?: AdminProps[];
  isLoading: boolean;
}

export function AdminsTable({ rows = [], isLoading }: AdminsTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    return rows.slice(startIndex, startIndex + rowsPerPage);
  }, [page, rowsPerPage, rows]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        {isLoading ? (<ClipSpinner />
        ) : (
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => {
                return (
                  <TableRow hover key={row._id}>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar src={row.image} />
                        <Typography variant="subtitle2">
                          {row.name}
                          <br />
                          <Typography variant="caption">{dayjs(row.createdAt).format('MMM D, YYYY')}</Typography>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          backgroundColor: row.status === 'active' ? 'green' : 'orange',
                          color: 'white',
                          borderRadius: '25px',
                          padding: '4px 10px',
                          fontSize: '.85rem',
                          textAlign: 'center',
                        }}
                      >
                        {row.status === 'suspended' ? 'Suspended' : 'Active'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={.5}>
                        {row.role === 'super_admin' ? (
                          <ShieldStar size={22} weight="bold" color="purple" />
                        ) : (
                          <User size={22} weight="bold" color="blue" />
                        )}
                        <Typography
                          sx={{
                            backgroundColor: row.role === 'super_admin' ? 'purple' : 'blue',
                            color: 'white',
                            borderRadius: '25px',
                            padding: '4px 10px',
                            fontSize: '.85rem',
                            textAlign: 'center',
                          }}
                        >
                          {row.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <AdminOptions adminId={row._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
