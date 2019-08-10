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
import getAllCustomers from '../Customers/actions/getCustomers';
import Loader from 'react-loader-spinner';
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
  { value: 'Money In', label: 'Money In' },
  { value: 'Money Out', label: 'Money Out' },
  { value: 'Customer Receipt', label: 'Customer Receipt' },
  { value: 'Supplier Payment', label: 'Supplier Payment' },
];
class AddBankModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bankMethodOption: null,
      transaction: {
        date: '',
        bank_account: '',
        type: '',
        description: '',
        entry_method: '',
      },
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.transModelOpenState}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Card style={{ width: '500px' }}>
                <CardHeader color="primary">Add Product</CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Date"
                        id="title"
                        type="date"
                        defaultValue="2017-05-24"
                        helpText="2017-05-24"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Select
                        placeholder="Cash FLow Type"
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        options={typesOptions}
                        isMulti={false}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Select
                        placeholder="Select Category "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        isMulti={false}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Amount"
                        id="amount"
                        type="textarea"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                      <CustomInput
                        labelText="Product Description"
                        id="description"
                        type="textarea"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                      <Button
                        onClick={this.props.onAddCategory}
                        color="primary"
                        size="sm"
                      >
                        Invoices{' '}
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button
                        onClick={this.props.onAddCategory}
                        color="primary"
                        size="sm"
                      >
                        {!this.props.loading ? (
                          'ADD Transaction'
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
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          {/* <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Select
                className={classes.margin}
                placeholder="Type"
                options={typesOptions}
                isMulti={false}
              />
              <Select
                className={classes.margin}
                placeholder="Customer/Product/MCS"
                options={typesOptions}
                isMulti={false}
              />
              <TextField
                margin="dense"
                className={`${classes.margin} ${classes.auto}`}
                id="qoutedPrice"
                label="Amount "
                type="number"
                fullWidth
              />
              <TextField
                margin="dense"
                className={`${classes.margin} ${classes.auto}`}
                id="custDescription"
                defaultValue="2017-05-24"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                className={`${classes.margin} `}
                id="custDescription"
                defaultValue="2017-05-24"
                type="tex"
                fullWidth
              />
            </GridItem>
          </GridContainer> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleCancelClick} color="warning">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styledCompoenet = withStyles(styles)(AddBankModal);
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: () => dispatch(getAllCustomers()),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(styledCompoenet);
