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

import { useSelection } from '@/hooks/use-selection';
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
  count?: number;
  page?: number;
  rows?: ProductInterface[];
  rowsPerPage?: number;
}

export function ProductsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: ProductsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((product) => product._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

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
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              {/* <TableCell>Category</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
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
                      <Image src={row.images[0]} width={80} height={80} alt={'Product photo'} />
                      <Typography variant="subtitle2">{row.title}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  {/* <TableCell>
                    {row.category}
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
