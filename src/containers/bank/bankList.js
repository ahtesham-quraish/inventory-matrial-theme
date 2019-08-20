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
const { createBank, getBanks } = BankActions;
const styles = {};
class BankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankModelOpenState: false,
    };
  }
  componentDidMount() {
    this.props.getBanks();
  }
  bankModelOpen = () => {
    this.setState({ bankModelOpenState: true });
  };
  handleCancelClick = () => {
    this.props.getBanks();
    this.setState({ bankModelOpenState: false });
  };

  prepareTableData = () => {
    const { banks } = this.props;
    let data = [];
    let temp = [];
    for (let bank in banks) {
      temp.push(banks[bank].name);
      temp.push(banks[bank].code);
      temp.push(banks[bank].entry_method);
      data.push(temp);
      temp = [];
    }
    return data;
  };

  render() {
    const { bankMethodOption, bank, loading } = this.state;
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              classes={classes}
              color="primary"
              size="sm"
              onClick={this.bankModelOpen}
            >
              Add Bank{' '}
            </RegularButton>
          </div>
          <Card className={'blue'}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Product List</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Code', 'Method', 'Action']}
                tableData={this.prepareTableData()}
                onClick={this.handleRowClick}
                className={classes.link}
              />
            </CardBody>
          </Card>
        </GridItem>
        <BankCreateModel
          handleCancelClick={this.handleCancelClick}
          bankModelOpenState={this.state.bankModelOpenState}
        />
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('7777777777777777');
  return {
    customer: state.QoutationReducer.selectedCustomers,
    qoutationProducts: state.QoutationReducer.qoutationProducts,
    savedInvoice: state.InvoiceReducer.savedInvoice,
    banks: state.BankState.banks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanks: () => dispatch(getBanks()),
  };
};
const styledCompoenet = withStyles(styles)(BankList);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
