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
import CreateCategory from './createCategory';
import BankActions from './actions';
import BankList from './bankList';
const { createBank, getBanks } = BankActions;
const styles = {};
const typesOptions = [
  { value: '500-998', label: 'Expense (500 - 998)' },
  { value: '0-199', label: 'Asset (0 - 199)' },
  { value: '400-499', label: 'Revenue (400 - 499)' },
  { value: '200-299', label: 'Liability (200 - 299)' },
  { value: '300-399', label: 'Equity (300 - 399)' },
];
class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transModelOpen: false,
      bankModelOpenState: false,
      categoryModelOpenState: false,
    };
  }

  transModelOpen = () => {
    this.setState({ transModelOpen: true });
  };
  categoryModelOpen = () => {
    this.setState({ categoryModelOpenState: true });
  };
  bankModelOpen = () => {
    this.setState({ bankModelOpenState: true });
  };
  handleCancelClick = () => {
    this.setState({
      transModelOpen: false,
      bankModelOpenState: false,
      categoryModelOpenState: false,
    });
  };
  transModelOpen = () => {
    this.setState({ transModelOpen: true });
  };

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              color="primary"
              size="sm"
              onClick={this.bankModelOpen}
            >
              Add Bank{' '}
            </RegularButton>
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              onClick={this.transModelOpen}
              color="primary"
              size="sm"
            >
              Add Transaction{' '}
            </RegularButton>
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              onClick={this.categoryModelOpen}
              color="primary"
              size="sm"
            >
              Add Category{' '}
            </RegularButton>
          </div>

          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: 'Bugs',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: 'Website',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: 'Server',
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <AddBankModal
          handleCancelClick={this.handleCancelClick}
          transModelOpen={this.transModelOpen}
          transModelOpenState={this.state.transModelOpen}
          onAddCategory={this.onAddCategoryHandler}
        />
        <BankCreateModel
          handleCancelClick={this.handleCancelClick}
          bankModelOpenState={this.state.bankModelOpenState}
        />
        <CreateCategory
          typesOptions={typesOptions}
          categoryModelOpenState={this.state.categoryModelOpenState}
          handleCancelClick={this.handleCancelClick}
        />
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.QoutationReducer.selectedCustomers,
    qoutationProducts: state.QoutationReducer.qoutationProducts,
    savedInvoice: state.State.savedInvoice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBank: (body) => dispatch(createBank(body)),
    getBanks: () => dispatch(getBanks()),
  };
};
const styledCompoenet = withStyles(styles)(Bank);
export default connect(
  null,
  mapDispatchToProps,
)(styledCompoenet);
