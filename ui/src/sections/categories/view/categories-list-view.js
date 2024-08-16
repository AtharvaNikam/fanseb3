/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// routes
import { usePathname, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
//
import { useSnackbar } from 'notistack';

import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import MaterialTable from 'material-table';
import { useGetCategories } from 'src/api/categories';
import { usePopover } from 'src/components/custom-popover';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import Iconify from 'src/components/iconify/iconify';
import { RouterLink } from 'src/routes/components';
import axiosInstance from 'src/utils/axios';
import { tableIcons } from 'src/utils/constant';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CategoriesListView() {
  const TABLE_HEAD = [
    {
      title: 'Name',
      field: 'name',
      render: (row) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar alt={row.name} src={row.userProfile?.avatar?.originalname} /> */}
          <Typography variant="subtitle2" noWrap>
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    {
      title: 'Details',
      field: 'details',
      render: (row) => (
        <Typography variant="subtitle2" noWrap>
          {row.details}
        </Typography>
      ),
    },
    {
      title: 'Image',
      render: (row) => <Box component="img" src={row.image} alt={row.image} width="20%" />,
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

  const popover = usePopover();

  const { category, refreshCategories } = useGetCategories();

  console.log(category);

  const settings = useSettingsContext();

  const router = useRouter();

  const pathname = usePathname();

  const confirm = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);

  const [editUserData, setEditUserData] = useState({});

  const handleOpenMenu = (event, row) => {
    popover.onOpen(event);
    setEditUserData(row);
  };

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const catId = editUserData.id;
        await axiosInstance.delete(`/api/categories/${catId}`);
        enqueueSnackbar('category delete successfully!', {
          variant: 'success',
        });
        refreshCategories();
      } catch (error) {
        console.error('🚀 ~ error:', error);

        enqueueSnackbar('category delete failed!', {
          variant: 'error',
        });
      }
    },
    [editUserData.id, enqueueSnackbar, refreshCategories]
  );

  const handleEditRow = useCallback(
    (id) => {
      const catId = editUserData.id;
      router.push(paths.admin_dashboard.categories.edit(catId));
    },
    [editUserData.id, router]
  );

  useEffect(() => {
    if (category && category.length) {
      setTableData(category);
    }
  }, [enqueueSnackbar, category]);

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        style={pathname === '/admin-dashboard' ? { padding: 0, maxWidth: 'initial' } : {}}
      >
        {pathname === '/admin-dashboard' ? null : (
          <CustomBreadcrumbs
            heading="Categories List"
            links={[
              {
                name: 'Dashboard',
                href: paths.admin_dashboard.root,
              },
              {
                name: 'Categories',
                href: paths.admin_dashboard.categories.root,
              },
              { name: 'List' },
            ]}
            action={
              <Button
                component={RouterLink}
                href={paths.admin_dashboard.categories.new}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add Category
              </Button>
            }
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
        )}

        <Card>
          <MaterialTable
            data={tableData}
            columns={TABLE_HEAD}
            parentChildData={(row, rows) => rows.find((a) => a.id === row.categoryId)}
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
          onClick={(id) => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="material-symbols:edit" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRow();
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
