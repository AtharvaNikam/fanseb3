import { useCallback, useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
import { ORDER_STATUS_OPTIONS } from 'src/_mock';
// utils
import { fDateTime, fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { getComparator, useTable } from 'src/components/table';
//
import { MenuItem, Stack, Typography } from '@mui/material';
import MaterialTable from 'material-table';
import { useGetOrderStatuses } from 'src/api/orderStatus';
import { useGetBrandOrders } from 'src/api/orders';
import { usePopover } from 'src/components/custom-popover';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import Label from 'src/components/label';
import { tableIcons } from 'src/utils/constant';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

// const TABLE_HEAD = [
//   { id: 'trackingNumber', label: 'Tracking Number', width: 116 },
//   { id: 'deliveryFees', label: 'Delivery Fee', width: 140 },
//   { id: 'total', label: 'Total', width: 140 },
//   { id: 'createdAt', label: 'Order Date', width: 120, align: 'center' },
//   { id: 'status', label: 'Status', width: 110 },
//   { id: 'shippingAddress', label: 'Shipping Address', width: 140 },
//   { id: '', label: 'Actions', width: 88 },
// ];

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function OrderListView() {
  const TABLE_HEAD = [
    {
      title: 'Tracking Number',
      field: 'trackingNumber',
      render: (row) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar alt={row.name} src={row.userProfile?.avatar?.originalname} /> */}
          <Typography variant="subtitle2" noWrap>
            {row.trackingNumber}
          </Typography>
        </Stack>
      ),
    },
    {
      title: 'Delivery Fee',
      field: 'deliveryFee',
      render: (row) => (
        <Typography variant="subtitle2" noWrap>
          ₹{row.deliveryFee}
        </Typography>
      ),
    },
    {
      title: 'Total',
      field: 'total',
      render: (row) => (
        <Typography variant="subtitle2" noWrap>
          ₹{row.total}
        </Typography>
      ),
    },
    {
      title: 'Order Date',
      field: 'updatedAt',
      render: (row) => (
        <Typography variant="subtitle2" noWrap>
          {fDateTime(row.updatedAt)}
        </Typography>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: (row) => (
        <Label
          variant="soft"
          color={
            (row.status === 11 && 'success') ||
            ((row.status >= 1 || row.status <= 6) && 'warning') ||
            (row.status === 12 && 'error') ||
            'default'
          }
        >
          {orderStatuses.map((option) => {
            if (option.serial === row.status) {
              return option.name;
            }
            return null;
          })}
        </Label>
      ),
    },

    {
      title: 'Actions',
      align: 'right',

      render: (row) => (
        <div>
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => {
              handleOpenMenu(e, row);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </div>
      ),
    },
  ];
  const { orderStatuses } = useGetOrderStatuses();
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const popover = usePopover();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const { id } = useParams();
  const params = useParams();
  const { orders, ordersLoading, ordersError, ordersEmpty, refreshOrder } = useGetBrandOrders(id);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [viewOrderData, setViewOrderData] = useState({});

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset =
    !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  const handleOpenMenu = (event, row) => {
    popover.onOpen(event);
    setViewOrderData(row);
  };

  const handleDeleteRow = useCallback(
    (id_order) => {
      const deleteRow = tableData.filter((row) => row.id !== id_order);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleViewRow = useCallback(
    (id_brand, id_order) => {
      router.push(paths.brand_dashboard.brands.orders(id_brand, id_order).details);
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );
  useEffect(() => {
    if (orders && orders.length) {
      setTableData(orders);
    }
  }, [orders]);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List Orders"
          links={[
            {
              name: 'Dashboard',
              href: paths.brand_dashboard.brands.dashboard(id),
            },
            {
              name: 'Order',
              href: paths.brand_dashboard.brands.orders(1).root,
            },
            { name: 'List' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <MaterialTable
            data={tableData}
            columns={TABLE_HEAD}
            parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
            icons={tableIcons}
            options={{
              search: true,
              showTitle: false,
              exportButton: true,
            }}
          />
        </Card>
      </Container>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleViewRow(id, viewOrderData.id);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          fTimestamp(order.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(order.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
