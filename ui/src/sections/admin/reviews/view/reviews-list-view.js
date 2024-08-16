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
import { useGetReviews } from 'src/api/reviews';
import axiosInstance from 'src/utils/axios';
import UserTableFiltersResult from '../reviews-table-filters-result';
import ProductTableRow from '../reviews-table-row';
import UserTableToolbar from '../reviews-table-toolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'name', label: 'Image', width: 100 },
  { id: 'brand', label: 'Customer Review', width: 220 },
  { id: 'ratings', label: 'Ratings', width: 100 },
  { id: 'product', label: 'Products', width: 150 },
  { id: 'Reports', label: 'Reports', width: 100 },
  { id: 'date', label: 'Date', width: 100 },
  { id: 'action', label: 'Action', width: 88, align: 'center' },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------
export default function ReviewsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const { id } = useParams();

  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const { reviews, refreshReviews } = useGetReviews();

  const [tableData, setTableData] = useState(reviews);

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

  const handleActivateUser = useCallback(
    async (id_user) => {
      const userIndex = tableData.findIndex((row) => row.id === id_user);

      if (userIndex !== -1) {
        const updatedTableData = [...tableData];
        updatedTableData[userIndex].isActive = !updatedTableData[userIndex].isActive;

        setTableData(updatedTableData);

        const isActiveStatus = updatedTableData[userIndex].isActive;
        const inputData = {
          user: {
            isActive: isActiveStatus,
          },
        };

        try {
          await axiosInstance.patch(`/api/users/${id_user}`, inputData);
          const successMessage = isActiveStatus ? 'Unblock successfully!' : 'Block successfully!';
          enqueueSnackbar(successMessage, { variant: 'success' });
        } catch (error) {
          enqueueSnackbar('Block unsuccessfully!', { variant: 'error' });
          console.error('Error updating user status:', error);

          setTableData(tableData);
        }
      }
    },
    [enqueueSnackbar, tableData]
  );

  const handleUpdateUserPermission = useCallback(
    async (id_per) => {
      const userIndex = tableData.findIndex((row) => row.id === id_per);

      if (userIndex !== -1) {
        const currentUserPermissions = tableData[userIndex].permissions || [];

        const isAdminPresent = currentUserPermissions.includes('admin');

        const updatedPermissions = isAdminPresent
          ? currentUserPermissions.filter((permission) => permission !== 'admin')
          : [...currentUserPermissions, 'admin'];

        const updatedTableData = [...tableData];
        updatedTableData[userIndex].permissions = updatedPermissions;
        setTableData(updatedTableData);

        const inputData = {
          user: {
            permissions: updatedPermissions,
          },
        };

        try {
          await axiosInstance.patch(`/api/users/${id_per}`, inputData);
          enqueueSnackbar('Permissions update successfully!', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar('Permissions update failed!', { variant: 'error' });

          console.error('Error updating user permissions:', error);

          setTableData(tableData);
        }
      }
    },
    [enqueueSnackbar, tableData]
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
      router.push(paths.brand_dashboard.brands.product(id_b, id_r).edit);
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (productId, id_r, deleteConfirm) => {
      await axiosInstance
        .delete(`/products/${productId}/reviews?where[id]=${id_r}`)
        .then((res) => {
          refreshReviews();
          enqueueSnackbar('Delete Success!');
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
    [enqueueSnackbar, refreshReviews]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    if (reviews) {
      setTableData(reviews);
    }
  }, [reviews]);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List Reviews"
          links={[
            { name: 'Dashboard', href: paths.admin_dashboard.root },
            { name: 'Reviews', href: paths.admin_dashboard.reviews.root },
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
                        onDeleteRow={(productId) => handleDeleteRow(productId, row.id)}
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
