import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as DialogButton } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import { ToastContainer, toast } from 'react-toastify';
import BankActions from './actions';
import Loader from 'react-loader-spinner';
const { createBank } = BankActions;

const styles = {
  margin: {
    margin: '10px 10px',
  },
  auto: {
    width: 'auto',
  },
  unitSelect: {
    marginTop: '40px',
  },
};
const typesOptions = [
  { value: 'Bank Feed', label: 'Bank Feed' },
  { value: 'File Import', label: 'File Import' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Stripe Feed', label: 'Stripe Feed' },
  { value: 'PayPal Feed', label: 'PayPal Feed' },
];
class BankCreateModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bankMethodOption: null,
      bank: {
        name: '',
        code: '',
        entry_method: '',
      },
    };
  }
  createBankChangeHandler = (e) => {
    const { bank } = this.state;
    bank[e.target.id] = e.target.value;
    this.setState({ bank });
  };
  bankMethodOnChange = (options) => {
    let { bankMethodOption, bank } = this.state;
    bankMethodOption = options;
    bank.entry_method = options.value;
    this.setState({ bankMethodOption, bank });
  };
  createBank = () => {
    const { bank } = this.state;
    this.setState({ loading: true });
    this.props.createBank(bank).then(() => {
      this.setState({ loading: false }, this.props.handleCancelClick);
      
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.bankModelOpenState}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Bank Account</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Card style={{ width: '400px' }}>
                <CardHeader color="primary">Add Product</CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        type="text"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.createBankChangeHandler,
                          value: this.state.bank.name,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Select
                        placeholder="Select Product Unit"
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        options={typesOptions}
                        isMulti={false}
                        value={this.state.bankMethodOption}
                        onChange={this.bankMethodOnChange}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Bank Code"
                        id="code"
                        onChange={this.props.onChange}
                        type="textarea"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.createBankChangeHandler,
                          value: this.state.bank.code,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Product Description"
                        id="description"
                        type="text"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} />
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleCancelClick} color="warning">
            Cancel
          </Button>
          <Button onClick={this.createBank} color="primary">
            {!this.props.loading ? (
              'ADD Bank'
            ) : (
              <div style={{ width: '75px' }}>
                <Loader
                  type="ThreeDots"
                  color="white"
                  height={1000}
                  width={1000}
                />
              </div>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styledCompoenet = withStyles(styles)(BankCreateModel);
const mapDispatchToProps = (dispatch) => {
  return {
    createBank: (body) => dispatch(createBank(body)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(styledCompoenet);
