'use client';

import * as React from 'react';
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
import ProductOptions from './products-actions';
import Image from 'next/image';
import { ClipSpinner } from '@/components/loader/spinner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tooltip } from '@mui/material';


dayjs.extend(relativeTime);


export interface ProductInterface {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: string[];
  category: string;
  properties: Record<string, unknown>;
  updatedAt?: Date;
}

interface ProductsTableProps {
  rows?: ProductInterface[];
  isLoading: boolean;
}

export function ProductsTable({ rows = [], isLoading }: ProductsTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rowIds = React.useMemo(() => {
    return rows.map((product) => product._id);
  }, [rows]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // PAGINATION
  function applyPagination(rows: ProductInterface[], page: number, rowsPerPage: number): ProductInterface[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  const paginatedRows = applyPagination(rows, page, rowsPerPage);

  // FORMATE PRICE
  const formatePrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        {isLoading ? (<ClipSpinner />) : (
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => {
                return (
                  <TableRow hover key={row._id}>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Box
                          sx={{
                            width: { xs: 40, sm: 50, md: 60 },
                            height: { xs: 40, sm: 50, md: 60 },
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={row.images[0]}
                            fill
                            alt="Product photo"
                            sizes="(max-width: 600px) 40px, (max-width: 900px) 50px, 60px"
                            placeholder="blur"
                            blurDataURL={`${row.images[0]}?tr=w-10,h-10,bl`}
                            style={{ objectFit: "contain" }}
                          />
                        </Box>
                        <Typography variant="subtitle2">
                          {row.title} <br />
                          <Typography variant="caption" color="text.secondary">
                            {dayjs(row.updatedAt).fromNow()}
                          </Typography>
                        </Typography>
                      </Stack>
                    </TableCell>

                    <Tooltip title={row.description} arrow>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.description}
                      </TableCell>
                    </Tooltip>
                    <TableCell>{formatePrice(row.price)} ETB</TableCell>
                    <TableCell>
                      <ProductOptions productId={row._id} />
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
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card >
  );
}
