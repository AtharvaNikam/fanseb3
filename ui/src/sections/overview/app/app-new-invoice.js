import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { TableHeadCustom } from 'src/components/table';
import { useReactToPrint } from 'react-to-print';
import { useSettingsContext } from 'src/components/settings';
import { useRef, useState } from 'react';
import OrderDetailsInfo from 'src/sections/customer/order/order-details-info';
import OrderDetailsItems from 'src/sections/order/order-details-item';

import { TableHead, Paper } from '@mui/material';

export default function AppNewInvoice({ title, subheader, tableData, tableLabels, ...other }) {
  const settings = useSettingsContext();
  const [currentOrder, setCurrentOrder] = useState(null);
  const printRef = useRef(); // Ref for the print content
  console.log(currentOrder);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: currentOrder ? `Order-${currentOrder.trackingNumber}` : 'Order-Details',
    removeAfterPrint: true,
  });

  const handlePrintAction = async (row) => {
    setCurrentOrder(row); // Set the current order data
    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow state to update
    handlePrint(); // Trigger the print function
  };

  const printView = currentOrder && (
    <Container ref={printRef} maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <OrderDetailsInfo
            customer={currentOrder.user}
            delivery={currentOrder.delivery}
            payment={currentOrder}
            shippingAddress={currentOrder}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrder.products.map((product) => (
                  <TableRow
                    key={currentOrder.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="left">{product.sale_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <OrderDetailsItems
            items={currentOrder.products}
            taxes={currentOrder.salesTax}
            shipping={currentOrder.deliveryFee}
            discount={currentOrder.discount}
            subTotal={currentOrder.subTotal}
            totalAmount={currentOrder.total}
          />
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} onPrint={() => handlePrintAction(row)} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>

      {/* Hidden print view */}
      <Box style={{ display: 'none' }}>{printView}</Box>
    </Card>
  );
}

AppNewInvoice.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AppNewInvoiceRow({ row, onPrint }) {
  const popover = usePopover();

  const handlePrint = () => {
    popover.onClose();
    onPrint(); // Trigger the print function after the order is set
  };

  return (
    <>
      <TableRow>
        <TableCell>{row.trackingNumber}</TableCell>
        <TableCell>{fCurrency(row.total)}</TableCell>
        <TableCell>{row.createdAt}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'progress' && 'warning') ||
              (row.status === 'out of date' && 'error') ||
              'success'
            }
          >
            {row.status}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>
      </CustomPopover>
    </>
  );
}

AppNewInvoiceRow.propTypes = {
  row: PropTypes.object,
  onPrint: PropTypes.func.isRequired,
};
