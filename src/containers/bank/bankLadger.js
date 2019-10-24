import React from 'react';
import { connect } from 'react-redux';
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardIcon from '../../components/Card/CardIcon.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import Table from '../../components/Table/Table.jsx';
import Tasks from '../../components/Tasks/Tasks.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import Danger from '../../components/Typography/Danger.jsx';
import Card from '../../components/Card/Card.jsx';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import { bugs, website, server } from '../../variables/general';
import RegularButton from '../../components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as DialogButton } from '@material-ui/core/Button';
import Button from '../../components/CustomButtons/Button.jsx';
import TextField from '@material-ui/core/TextField';
import {getBankDetail} from '../../helpers/util';

const styles = {
  overflow: { overflowY: 'inherit' },
  bold: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
};
class BankLadger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankModelOpenState: false,
    };
  }

  render() {
    const { classes, transactions, CustomerType, custTransaction } = this.props; 
    let readyData = [] 
    if (this.props.bankId) {
       readyData =  getBankDetail(transactions, this.props.bankId)
    }
    return (
      <Dialog
        open={this.props.bankDetailDialog}
        maxWidth="xl"
        classes={classes.overflow}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Card style={{ width: '1000px' }} className={'blue'}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
               Product Ledger
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                'Invoice Date',
                'Invoice Type',
                'Customer',
                'Category',
                'Total Amount',
                'Debet Amount',
                'Credit Amount',
                'Balance',
                'Actions'
              ]}
              tableData={readyData}
              onClick={this.handleRowClick}
              className={classes.link}
              showEdit={false}
              showDelete={true}
              deleteClick={this.onDeleteClick}
              lastRecord={true}
              lastRowClass={classes.bold}
            />
          </CardBody>
        </Card>

        <DialogActions>
          <Button onClick={this.props.handleCancelClick} color="warning">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invoices : state.InvoiceReducer.invoices,
    transactions: state.BankState.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
const styledCompoenet = withStyles(styles)(BankLadger);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
