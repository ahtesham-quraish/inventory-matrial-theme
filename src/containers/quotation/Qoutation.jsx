import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/img/acd.jpg';
import 'react-toastify/dist/ReactToastify.css';
import avatar from 'assets/img/faces/marc.jpg';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import { SingleSelect } from 'react-select-material-ui';
import { element } from 'prop-types';
import getAllCustomers from '../../containers/Customers/actions/getCustomers';
import { setSelectedCustomer } from './actions/setSelectedCustomer';
import { addProduct } from '../../views/Products/actions/actions';
import { addProductToQoutation } from './actions/addProductToQoutation';
import { removeProductFromQoutation } from './actions/removeProductFromQoutation';

//imports for dialog
import { Button as DialogButton } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  logowidth: {
    width: '100%',
  },
  containerbackground: {
    background: 'light grey',
  },
};

class Quotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      selectedCustomer: null,
      selectedProducts: [],
      options: [],
      productOptions: [],
      addProductModelOpen: false,
      addProcductInputs: {
        requiredQuantity: '',
        requiredQuantityError: false,
        requiredQuantityMsg: null,
        qoutedPrice: '',
        qoutedPriceError: false,
        qoutedPriceMsg: null,
        custDescription: '',
        custDescriptionError: false,
        custDescriptionMsg: null,
      },
      productToBeAdded: null,
    };
  }

  componentDidMount = () => {
    this.props.getCustomers().then(() => {
      this.getCustomerOptions();
    });
    this.props.fetchProduct().then(() => {
      this.getProductOptions();
    });
  };

  getCustomerOptions = () => {
    let opts = [];
    this.props.customers.forEach((element) => {
      opts.push({
        value: element.id,
        label: element.fName + ' ' + element.lName,
      });
    });
    this.setState({
      options: opts,
    });
  };

  getProductOptions = () => {
    let opts = [];
    this.props.products.forEach((element) => {
      opts.push({
        value: element.id,
        label: element.title,
      });
    });
    this.setState({
      productOptions: opts,
    });
  };

  handleCustomerSelect = (selectedOption) => {
    let temp = {};
    this.props.customers.forEach((element) => {
      if (element.id === selectedOption.value) {
        temp = element;
      }
    });
    this.setState({
      customer: temp,
      selectedCustomer: selectedOption,
    });
    this.props.setCustomer(temp);
  };

  handleProductSelect = (selectedOption, action) => {
    if (action.action === 'select-option') {
      console.log('action is ', action, selectedOption);
      var temp = {};
      this.props.products.forEach((element) => {
        if (element.id === action.option.value) {
          temp = element;
        }
      });
      console.log('temp is ', temp);
      this.setState({
        selectedProducts: selectedOption,
        addProductModelOpen: true,
        productToBeAdded: temp,
      });
    }
    if (action.action === 'remove-value') {
      this.props.removeProductFromQoutation(action.removedValue);
      console.log('removed', selectedOption, action);
      this.setState({
        selectedProducts: selectedOption,
      });
    }
  };

  addProductToQoutation = () => {
    if (this.validateProductData() === true) {
      const { productToBeAdded, addProcductInputs } = this.state;
      let temp = productToBeAdded;
      temp.requiredQty = this.state.addProcductInputs.requiredQuantity;
      temp.qoutedPrice = this.state.addProcductInputs.qoutedPrice;
      temp.custDescription = this.state.addProcductInputs.custDescription;
      this.props.addProductToQoutation(temp);
      addProcductInputs.requiredQuantity = '';
      addProcductInputs.qoutedPrice = '';
      addProcductInputs.custDescription = '';
      this.setState({
        productToBeAdded: null,
        addProductModelOpen: false,
        addProcductInputs: addProcductInputs,
      });
    }
  };
  validateProductData = () => {
    let isValid = true;
    const { addProcductInputs } = this.state;
    for (let key in addProcductInputs) {
      if (addProcductInputs[key] === '') {
        addProcductInputs[key + 'Error'] = true;
        addProcductInputs[key + 'Msg'] = 'This field is required';
        isValid = false;
      }
    }
    console.log('returning this for isValidfirst', isValid);
    if (
      addProcductInputs.requiredQuantity > this.state.productToBeAdded.quatity
    ) {
      addProcductInputs['requiredQuantityError'] = true;
      addProcductInputs['requiredQuantityMsg'] =
        'Quantity can not exceed current quantity';
      isValid = false;
    }

    this.setState({
      addProcductInputs: addProcductInputs,
    });
    console.log('returning this for isValid', isValid);
    return isValid;
  };
  handleCancelClick = () => {
    this.props.removeProductFromQoutation(this.state.productToBeAdded);
    this.setState({
      addProductModelOpen: false,
      selectedProducts: this.state.selectedProducts.filter((product) => {
        return product.value !== this.state.productToBeAdded.id;
      }),
      productToBeAdded: null,
    });
  };
  handleAddProductsChange = (event) => {
    // if (event.target.value <= this.state.productToBeAdded.quatity) {
    const { addProcductInputs } = this.state;
    addProcductInputs[event.target.id] = event.target.value;
    addProcductInputs[event.target.id + 'Error'] = false;
    addProcductInputs[event.target.id + 'Msg'] = null;
    this.setState({
      addProcductInputs: addProcductInputs,
    });
    // }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.containerbackground} `}>
        {/* dialog to get product details */}
        <Dialog
          open={this.state.addProductModelOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="currentInventory"
              label="Current inventory"
              value={
                this.state.productToBeAdded
                  ? this.state.productToBeAdded.quatity
                  : ''
              }
              type="text"
              fullWidth
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              id="requiredQuantity"
              label="Required Quantity"
              type="number"
              value={this.state.addProcductInputs.requiredQuantity}
              onChange={this.handleAddProductsChange}
              fullWidth
              error={this.state.addProcductInputs.requiredQuantityError}
              helperText={this.state.addProcductInputs.requiredQuantityMsg}
            />
            <TextField
              margin="dense"
              id="qoutedPrice"
              label="Qouted Price"
              type="number"
              value={this.state.addProcductInputs.qoutedPrice}
              onChange={this.handleAddProductsChange}
              fullWidth
              error={this.state.addProcductInputs.qoutedPriceError}
              helperText={this.state.addProcductInputs.qoutedPriceMsg}
            />
            <TextField
              margin="dense"
              id="custDescription"
              label="Customer Description"
              type="text"
              value={this.state.addProcductInputs.custDescription}
              onChange={this.handleAddProductsChange}
              fullWidth
              error={this.state.addProcductInputs.custDescriptionError}
              helperText={this.state.addProcductInputs.custDescriptionMsg}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelClick} color="warning">
              Cancel
            </Button>
            <Button onClick={this.addProductToQoutation} color="primary">
              Add Product
            </Button>
          </DialogActions>
        </Dialog>
        <GridContainer>
          <GridItem xs={8} sm={8} md={4}>
            <Select
              placeholder="Select Customer"
              value={this.state.selectedCustomer}
              onChange={this.handleCustomerSelect}
              options={this.state.options}
            />
          </GridItem>
          <GridItem xs={8} sm={8} md={4}>
            <Select
              placeholder="Select Product"
              value={this.state.selectedProducts}
              onChange={this.handleProductSelect}
              options={this.state.productOptions}
              isMulti={true}
            />
          </GridItem>
          <GridItem xs={8} sm={8} md={4}>
            <Select
              placeholder="Products from previous invoices"
              value={this.state.selectedProducts}
              onChange={this.handleProductSelect}
              options={this.state.productOptions}
              isMulti={true}
            />
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
    products: state.productReducer.product,
    qoutationProducts: state.QoutationReducer.qoutationProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers: () => dispatch(getAllCustomers()),
    setCustomer: (payload) => dispatch(setSelectedCustomer(payload)),
    fetchProduct: (payload) => dispatch(addProduct(payload)),
    addProductToQoutation: (payload) =>
      dispatch(addProductToQoutation(payload)),
    removeProductFromQoutation: (payload) =>
      dispatch(removeProductFromQoutation(payload)),
  };
};
Quotation = withStyles(styles)(Quotation);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotation);
