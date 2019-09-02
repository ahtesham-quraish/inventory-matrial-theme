import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
// core components
import tableStyle from 'assets/jss/material-dashboard-react/components/tableStyle.jsx';
function CustomTable({ ...props }) {
  const {
    pointer,
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    onClick,
    className,
    onInvoicesClick,
    editClick = () => {},
    deleteClick = () => {},
    showAction = true,
    showEdit = true,
    showDelete = true,
    lastRecord = true,
    lastRowClass = '',
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((props, key) => {
            return (
              <TableRow hover={true} key={key} className={pointer}>
                <React.Fragment>
                  {props.map((prop, k) => {
                    if (k === 0) {
                      return (
                        <TableCell
                          onClick={(e) => onClick(e, props, key)}
                          className={`${classes.tableCell} ${
                            !lastRecord && tableData.length - 1 === key
                              ? null
                              : className
                          }`}
                          key={`${key} ${k}`}
                        >
                          {prop}
                        </TableCell>
                      );
                    } else if (prop === 'Invoices') {
                      return (
                        <TableCell
                          onClick={(e) => onInvoicesClick(e, props, key)}
                          className={`${classes.tableCell} ${className}`}
                          key={`${key} ${k}`}
                        >
                          {prop}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          className={
                            lastRowClass !== '' &&
                            !lastRecord &&
                            tableData.length - 1 === key
                              ? `${classes.tableCell} ${lastRowClass}`
                              : `${classes.tableCell}`
                          }
                          key={`${key} ${k}`}
                        >
                          {prop}
                        </TableCell>
                      );
                    }
                  })}
                  {showAction && (
                    <TableCell className={classes.tableActions}>
                      {showEdit && (
                        <Tooltip
                          id="tooltip-top"
                          title="Edit Task"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            onClick={(e) => editClick(e, props, key)}
                            className={classes.tableActionButton}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon +
                                ' ' +
                                classes.edit
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {showDelete && lastRecord && (
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            onClick={(e) => deleteClick(e, props, key)}
                            className={classes.tableActionButton}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon +
                                ' ' +
                                classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {showDelete &&
                        !lastRecord &&
                        tableData.length - 1 !== key && (
                          <Tooltip
                            id="tooltip-top-start"
                            title="Remove"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Close"
                              onClick={(e) => deleteClick(e, props, key)}
                              className={classes.tableActionButton}
                            >
                              <Close
                                className={
                                  classes.tableActionButtonIcon +
                                  ' ' +
                                  classes.close
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                    </TableCell>
                  )}
                </React.Fragment>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  OnCellClick: null,
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default withStyles(tableStyle)(CustomTable);
