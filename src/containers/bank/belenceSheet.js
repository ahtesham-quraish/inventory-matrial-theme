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
import AddBankModal from './addBankModal';
import BankCreateModel from './bankCreateModel';
import BankActions from './actions';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {
  preparePurchaseTableData,
  prepareSaleTableData,
  preparePayableTableData,
  prepareReceivableTableData,
  prepareBankTableData,
  expensesTableDate,
} from '../../helpers/util';
import Paper from '@material-ui/core/Paper';
const {
  createBank,
  getBanks,
  getCustomerTransaction,
  deleteTransaction,
  getTransaction,
} = BankActions;
const styles = {
  overflow: { overflowY: 'inherit' },
  link: {
    cursor: 'pointer',
    color: '#0000EE',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  bold: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
  margin: {
    margin: 'auto',
    marginTop: '45px',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  headingtag: {
    fontSize: '17px',
    display: 'block',
    fontWeight: 'bold',
    marginLeft: '8px',
    marginBottom: '-44px',
  },
};
class BelenceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankModelOpenState: false,
      dateFilter: null,
    };
  }
  componentDidMount() {
    this.props.getTransaction();
  }

  onDeleteClick = (e, props, key) => {
    const { custTransaction } = this.props;
    let index = 0;
    let transaction = null;
    for (let t in custTransaction) {
      if (index === 0) {
        transaction = custTransaction[t];
      }
      index++;
    }
    if (transaction) {
      this.props.deleteTransaction(transaction.id).then(() => {
        if (this.props.customerId) {
          this.props.getCustomerTransaction(this.props.customerId);
        }
      });
    }
  };
  onDateChange = (e) => {
    let { dateFilter } = this.state;
    dateFilter = e.target.value === '' ? null : e.target.value;
    this.setState({ dateFilter });
  };
  netProfit = (saleBelence, purchaseBelence, expenseBelence) => {
    const net =
      parseInt(saleBelence) -
      (parseInt(purchaseBelence) + parseInt(expenseBelence));

    return [
      ['', net > 0 ? 'Profit' : net === 0 ? 'No Gain' : 'Loss', 'Rs' + net],
    ];
  };
  liabilities = () => {
    const { bankMethodOption, bank, loading } = this.state;
    const { transactions, customerType } = this.props;
    const { dateFilter } = this.state;
    const assests = this.prepareAssest();
    const totalPayable = preparePayableTableData(transactions, dateFilter);
    let totalBelence = 0;
    let tempData = [];
    const readyData = [];

    tempData.push('059');
    tempData.push('Amount Owned to Supplier');
    tempData.push(totalPayable.Belence);
    readyData.push(tempData);
    tempData = [];
    tempData.push('');
    tempData.push('Total Liabilities');
    tempData.push(totalPayable.Belence);

    readyData.push(tempData);
    tempData = [];
    totalBelence =
      parseInt(assests.totalBelence) - parseInt(totalPayable.Belence);
    tempData = [];
    tempData.push('');
    tempData.push('Assets - Liabilities');
    tempData.push(totalBelence);

    readyData.push(tempData);

    return readyData;
  };
  prepareAssest = () => {
    const { bankMethodOption, bank, loading } = this.state;
    const { transactions, customerType } = this.props;
    const { dateFilter } = this.state;
    let totalBelence = 0;
    let tempData = [];
    const readyData = [];
    const bankTableData = prepareBankTableData(transactions, dateFilter);
    const receivableTableData = prepareReceivableTableData(transactions, null);
    let totalSale = prepareSaleTableData(transactions, dateFilter);
    let totalPurchase = preparePurchaseTableData(transactions, dateFilter);

    tempData.push('058');
    tempData.push('Stock');
    tempData.push(totalPurchase.Belence);
    totalBelence = parseInt(totalBelence) + parseInt(totalPurchase.Belence);
    readyData.push(tempData);
    tempData = [];
    tempData.push('100');
    tempData.push('Amount Owned From Customer');
    tempData.push(receivableTableData.Belence);
    totalBelence =
      parseInt(totalBelence) + parseInt(receivableTableData.Belence);
    readyData.push(tempData);
    tempData = [];
    for (let bank in bankTableData.banks) {
      tempData = [];
      tempData.push(bankTableData.banks[bank].code);
      tempData.push(bank);
      tempData.push(bankTableData.banks[bank].Belence);
      totalBelence =
        parseInt(totalBelence) + parseInt(bankTableData.banks[bank].Belence);
      readyData.push(tempData);
    }

    tempData = [];
    tempData.push('');
    tempData.push('Total Assests');
    tempData.push(totalBelence);
    readyData.push(tempData);
    return { readyData, totalBelence };
  };
  render() {
    const { bankMethodOption, bank, loading } = this.state;
    const { transactions, customerType } = this.props;
    const { dateFilter } = this.state;
    const { classes } = this.props;
    let saleTableData = { readyData: [], Belence: 0 };
    let purchaseTableData = { readyData: [], Belence: 0 };
    let expenseTableData = { readyData: [], Belence: 0 };
    const payableTableData = preparePayableTableData(transactions, null);
    const bankTableData = prepareBankTableData(transactions, dateFilter);
    const receivableTableData = prepareReceivableTableData(transactions, null);
    saleTableData = prepareSaleTableData(transactions, dateFilter);
    purchaseTableData = preparePurchaseTableData(transactions, dateFilter);
    expenseTableData = expensesTableDate(transactions, dateFilter);
    this.prepareAssest();
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search Google Maps"
                type="date"
                value={this.state.dateFilter}
                onChange={this.onDateChange}
              />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <Card className={'blue'}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Belence Sheet</h4>
            </CardHeader>
            <CardBody>
              <Card
                className={classes.margin}
                style={{ maxWidth: '600px', margin: 'auto', marginTop: '45px' }}
                className={'blue'}
              >
                <h6
                  className={`${classes.cardTitleWhite} ${classes.headingtag}`}
                >
                  Assets
                </h6>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['CC', 'Sale Category', 'Sale Rs']}
                    tableData={this.prepareAssest().readyData}
                    onClick={this.handleRowClick}
                    className={classes.link}
                    deleteClick={this.onDeleteClick}
                    showAction={false}
                    lastRecord={false}
                    lastRowClass={classes.bold}
                  />
                </CardBody>
              </Card>
              <Card
                className={classes.margin}
                style={{ maxWidth: '600px', margin: 'auto', marginTop: '45px' }}
                className={'blue'}
              >
                <h6
                  className={`${classes.cardTitleWhite} ${classes.headingtag}`}
                >
                  Liabilities
                </h6>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['CC', 'Buy Category', 'Sale Rs']}
                    tableData={this.liabilities()}
                    onClick={this.handleRowClick}
                    className={classes.link}
                    deleteClick={this.onDeleteClick}
                    showAction={false}
                    lastRecord={false}
                    lastRowClass={classes.bold}
                  />
                </CardBody>
              </Card>
              <Card
                className={classes.margin}
                style={{ maxWidth: '600px', margin: 'auto', marginTop: '45px' }}
                className={'blue'}
              >
                <h6
                  className={`${classes.cardTitleWhite} ${classes.headingtag}`}
                >
                  Expense
                </h6>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['CC', 'Expense Category', 'Expense Rs']}
                    tableData={expenseTableData.readyData}
                    onClick={this.handleRowClick}
                    className={classes.link}
                    deleteClick={this.onDeleteClick}
                    showAction={false}
                    lastRecord={false}
                    lastRowClass={classes.bold}
                  />
                </CardBody>
              </Card>
              <Card
                className={classes.margin}
                style={{ maxWidth: '600px', margin: 'auto', marginTop: '45px' }}
                className={'blue'}
              >
                <h6
                  className={`${classes.cardTitleWhite} ${classes.headingtag}`}
                >
                  Net Profit & Loss
                </h6>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['CC', 'Net Profit & Loss', 'Rs']}
                    tableData={this.netProfit(
                      saleTableData.Belence,
                      purchaseTableData.Belence,
                      expenseTableData.Belence,
                    )}
                    onClick={this.handleRowClick}
                    className={classes.link}
                    deleteClick={this.onDeleteClick}
                    showAction={false}
                    lastRecord={false}
                    lastRowClass={classes.bold}
                  />
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.QoutationReducer.selectedCustomers,
    transactions: state.BankState.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: () => dispatch(getTransaction()),
  };
};
const styledCompoenet = withStyles(styles)(BelenceSheet);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
