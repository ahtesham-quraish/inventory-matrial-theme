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
  } = props;
  console.log(tableData, '22222222222222');
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
                          className={`${classes.tableCell} ${className}`}
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
                          className={classes.tableCell}
                          key={`${key} ${k}`}
                        >
                          {prop}
                        </TableCell>
                      );
                    }
                  })}
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
