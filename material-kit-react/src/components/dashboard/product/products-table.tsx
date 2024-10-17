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
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection';
import ProductOptions from './products-actions';
import Image from 'next/image';

function noop(): void {
  // do nothing
}

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
}

export function ProductsTable({ rows = [] }: ProductsTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rowIds = React.useMemo(() => {
    return rows.map((product) => product._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

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
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => {
              const isSelected = selected?.has(row._id);
              return (
                <TableRow hover key={row._id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row._id);
                        } else {
                          deselectOne(row._id);
                        }
                      }}
                    />
                  </TableCell>
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
                          style={{objectFit: "contain"}}
                        />
                      </Box>
                      <Typography variant="subtitle2">{row.title}</Typography>
                    </Stack>
                  </TableCell>

                  {/* <TableCell>{row.description}</TableCell> */}
                  <TableCell>{formatePrice(row.price)} ETB</TableCell>
                  <TableCell>
                    <ProductOptions productId={row._id}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
