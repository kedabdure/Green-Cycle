import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
}

export function TotalProfit({ value, sx }: TotalProfitProps): React.JSX.Element {

  const formateNumber = (value: any) => {
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  }
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="column" spacing={3}>
          <Stack spacing={3} direction="row"  sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Typography color="text.secondary" variant="overline">
              Total Sale
            </Typography>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <Typography variant="h5">
            {formateNumber(value)} <Typography component="span" fontSize="1rem" color="text.secondary">ETB</Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
