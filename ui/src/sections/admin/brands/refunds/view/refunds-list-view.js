import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
import { USER_STATUS_OPTIONS, _roles } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
//
import { useSnackbar } from 'notistack';
import { useGetBrandRefunds } from 'src/api/refunds';
import axiosInstance from 'src/utils/axios';
import UserTableFiltersResult from '../refunds-table-filters-result';
import ProductTableRow from '../refunds-table-row';
import UserTableToolbar from '../refunds-table-toolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'name', label: 'ID', width: 180 },
  { id: 'name', label: 'Reason', width: 180 },
  { id: 'brand', label: 'Customer Email', width: 220 },
  { id: 'status', label: 'Amount', width: 100 },
  { id: 'status', label: 'Tracking Number	', width: 100 },
  { id: 'status', label: 'Created', width: 150 },
  { id: 'status', label: 'Order Date	', width: 150 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'action', label: 'Action', width: 88, align: 'center' },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

const ordersData = [
  {
    ID: 1,
    Reason: 'Product Out of Stock',
    CustomerEmail: 'customer1@example.com',
    Amount: '$50.00',
    TrackingNumber: 'TRK123456',
    Created: '2023-01-15 08:30:00',
    OrderDate: '2023-01-14 15:45:00',
    Status: 'Pending',
    Actions: 'View Details',
  },
  {
    ID: 2,
    Reason: 'Shipment Delayed',
    CustomerEmail: 'customer2@example.com',
    Amount: '$75.50',
    TrackingNumber: 'TRK789012',
    Created: '2023-01-16 10:15:00',
    OrderDate: '2023-01-15 18:20:00',
    Status: 'In Progress',
    Actions: 'View Details',
  },
  {
    ID: 3,
    Reason: 'Wrong Item Shipped',
    CustomerEmail: 'customer3@example.com',
    Amount: '$120.00',
    TrackingNumber: 'TRK345678',
    Created: '2023-01-17 12:45:00',
    OrderDate: '2023-01-16 22:30:00',
    Status: 'Shipped',
    Actions: 'View Details',
  },
  {
    ID: 4,
    Reason: 'Cancelled by Customer',
    CustomerEmail: 'customer4@example.com',
    Amount: '$95.00',
    TrackingNumber: '-',
    Created: '2023-01-18 15:00:00',
    OrderDate: '2023-01-17 09:10:00',
    Status: 'Cancelled',
    Actions: 'View Details',
  },
  {
    ID: 5,
    Reason: 'Refund Processed',
    CustomerEmail: 'customer5@example.com',
    Amount: '$60.80',
    TrackingNumber: '-',
    Created: '2023-01-19 18:20:00',
    OrderDate: '2023-01-18 12:15:00',
    Status: 'Refunded',
    Actions: 'View Details',
  },
];

// ----------------------------------------------------------------------
export default function RefundsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const { id } = useParams();

  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const { refunds, refreshRefunds } = useGetBrandRefunds(id);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

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

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleEditRow = useCallback(
    (id_b, id_r) => {
      router.push(paths.brand_dashboard.brands.refunds(id_b, id_r).edit);
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id_r, deleteConfirm) => {
      await axiosInstance
        .delete(`/refunds/${id_r}`)
        .then((res) => {
          enqueueSnackbar('Delete Success!');
          refreshRefunds();
        })
        .catch((err) => {
          console.error(err);
          enqueueSnackbar(
            err.response.data.error.message
              ? err.response.data.error.message
              : 'something went wrong!',
            { variant: 'error' }
          );
        });
      deleteConfirm.onFalse();
    },
    [enqueueSnackbar, refreshRefunds]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    if (refunds) {
      setTableData(refunds);
    }
  }, [refunds]);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List Refunds"
          links={[
            { name: 'Dashboard', href: paths.brand_dashboard.brands.dashboard(id) },
            { name: 'Refunds', href: paths.brand_dashboard.brands.refunds(id) },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={paths.brand_dashboard.brands.staff(id).new}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     Add Staff
          //   </Button>
          // }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ProductTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onEditRow={() => handleEditRow(id, row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
