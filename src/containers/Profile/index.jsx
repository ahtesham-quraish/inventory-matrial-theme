import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import addCustomer from './actions/addCustomer';
import updateCustomer from './actions/updateCustomer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCustomer from '../Customers/actions/getCustomer';
import { setCustomer } from '../Customers/actions/getCustomer';
import avatar from 'assets/img/faces/marc.jpg';
const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  pointer: {
    cursor: 'pointer',
  },
};
class ProfileDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customer: {}, id: null, disabled: true };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      this.props.getCustomer(id).then(
        function() {
          const { customer } = this.props;

          this.setState({ customer: customer, id: id });
        }.bind(this),
      );
    }
  }
  onChangeHandler = (e) => {
    const { customer } = this.state;
    customer[e.target.id] = e.target.value;
    this.setState({ customer: customer });
  };
  addCustomer = () => {
    const { customer } = this.state;
    this.props.addCustomer(customer).then(
      function() {
        this.setState({ customer: {} });
        this.notify();
        this.props.history.push(`/admin/customers`);
      }.bind(this),
    );
  };
  updateCustomer = () => {
    const { customer } = this.state;
    this.props.updateCustomer(customer.id, customer).then(
      function() {
        this.notify();
      }.bind(this),
    );
  };
  notify = () => toast.success('Operation has been done successfully');
  enableEditing = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };
  render() {
    const { classes } = this.props;
    const { customer, id } = this.state;

    const disabled = id ? this.state.disabled : false;
    return (
      <div>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                {id && (
                  <h4 className={classes.cardTitleWhite}>
                    Edit Profile{' '}
                    {disabled && (
                      <i
                        onClick={this.enableEditing}
                        className={`material-icons ${classes.pointer}`}
                      >
                        edit
                      </i>
                    )}
                    {!disabled && id && (
                      <i
                        onClick={this.enableEditing}
                        className={`material-icons ${classes.pointer}`}
                      >
                        cancel
                      </i>
                    )}
                  </h4>
                )}
                {!id && (
                  <h4 className={classes.cardTitleWhite}>Create Profile</h4>
                )}
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.company_name ? 'Company Name' : null}
                      id="company_name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.company_name,
                        readOnly: disabled,
                        required: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.email ? 'Email address' : null}
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.email,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.fName ? 'First Name' : ''}
                      id="fName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.fName,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.lName ? 'Last Name' : null}
                      id="lName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.lName,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.fName ? 'NTN' : ''}
                      id="ntn"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.ntn,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.gst ? 'GST' : null}
                      id="gst"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.gst,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.Address1 ? 'Address 1' : null}
                      id="Address1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.Address1,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.Address2 ? 'Address 2' : null}
                      id="Address2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.Address2,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.city ? 'City' : null}
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.city,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.country ? 'Country' : null}
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.country,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.postal_code ? 'Postal Code' : null}
                      id="postal_code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.postal_code,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={!customer.Phone ? 'Phone#' : null}
                      id="Phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: customer.Phone,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText={!customer.description ? 'Description' : null}
                      id="description"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        onChange: this.onChangeHandler,
                        value: customer.description,
                        readOnly: disabled,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                {id && (
                  <Button
                    disabled={disabled}
                    onClick={this.updateCustomer}
                    color="primary"
                  >
                    Update Customer
                  </Button>
                )}
                {!id && (
                  <Button onClick={this.addCustomer} color="primary">
                    Add Customer
                  </Button>
                )}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.CustomerState.customers,
    selectedCustomerId: state.CustomerState.customerId,
    customer: state.CustomerState.customer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (data) => dispatch(addCustomer(data)),
    updateCustomer: (id, data) => dispatch(updateCustomer(id, data)),
    getCustomer: (id) => dispatch(getCustomer(id)),
    setCustomer: (data) => dispatch(setCustomer(data)),
  };
};
ProfileDetailContainer = withStyles(styles)(ProfileDetailContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailContainer);
