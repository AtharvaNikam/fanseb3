import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onUpdateUserPermission, onActivateUser }) {
  const { name, avatarUrl, permissions, isActive, email } = row;
  const [confirmAdmin, setConfirmAdmin] = useState({
    value: false,
    onTrue: () => setConfirmAdmin({ ...confirmAdmin, value: true }),
    onFalse: () => setConfirmAdmin({ ...confirmAdmin, value: false }),
  });

  const [confirmBlock, setConfirmBlock] = useState({
    value: false,
    onTrue: () => setConfirmBlock({ ...confirmBlock, value: true }),
    onFalse: () => setConfirmBlock({ ...confirmBlock, value: false }),
  });

  const isAdmin = permissions.includes('admin');

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{permissions.join(', ')}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={(isActive === true && 'success') || (isActive === false && 'error') || 'default'}
          >
            {(isActive === true && 'Active') || (isActive === false && 'Inactive')}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Assign Or Revoke Admin Permissions" placement="top" arrow>
            <IconButton onClick={confirmAdmin.onTrue}>
              {isAdmin ? (
                <Iconify
                  icon="material-symbols:admin-panel-settings-outline"
                  color="#019376"
                  width="50"
                  height="50"
                />
              ) : (
                <Iconify
                  icon="material-symbols:admin-panel-settings-outline"
                  color="#dc2626"
                  width="50"
                  height="50"
                />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Activate User" placement="top" arrow>
            <IconButton onClick={confirmBlock.onTrue}>
              {isActive ? (
                <Iconify icon="simple-line-icons:check" color="#019376" />
              ) : (
                <Iconify icon="material-symbols:block" color="#dc2626" />
              )}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {isAdmin ? (
        <ConfirmDialog
          open={confirmAdmin.value}
          onClose={confirmAdmin.onFalse}
          title="Revoke Admin Permissions"
          content="Are you sure you want to revoke admin permissions for this user?"
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onUpdateUserPermission();
                confirmAdmin.onFalse();
              }}
            >
              Revoke Admin
            </Button>
          }
        />
      ) : (
        <ConfirmDialog
          open={confirmAdmin.value}
          onClose={confirmAdmin.onFalse}
          title="Assign Admin Permissions"
          content="Are you sure you want to assign admin permissions to this user?"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onUpdateUserPermission();
                confirmAdmin.onFalse();
              }}
            >
              Assign Admin
            </Button>
          }
        />
      )}

      {isActive ? (
        <ConfirmDialog
          open={confirmBlock.value}
          onClose={confirmBlock.onFalse}
          title="Block Customer"
          content="Are you sure you want to block this customer?"
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onActivateUser();
                confirmBlock.onFalse();
              }}
            >
              Block
            </Button>
          }
        />
      ) : (
        <ConfirmDialog
          open={confirmBlock.value}
          onClose={confirmBlock.onFalse}
          title="Unblock Customer"
          content="Are you sure you want to unblock this customer?"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onActivateUser();
                confirmBlock.onFalse();
              }}
            >
              Unblock
            </Button>
          }
        />
      )}
    </>
  );
}

UserTableRow.propTypes = {
  onActivateUser: PropTypes.func,
  onUpdateUserPermission: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
