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
import getCustomerInvoiceProducts from './actions/getCustomerInvoiceProducts';

//imports for dialog
import { Button as DialogButton } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const name = ['api', 'title', 'sae', 'size'];
const PaymentStatus = [
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Paid', label: 'Paid' },
];
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
  margin: {
    margin: '10px 10px',
  },
};

class Quotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      selectedCustomer: null,
      selectedProducts: [],
      seelctedPastProducts: [],
      options: [],
      productOptions: [],
      pastProductsOptions: [],
      addProductModelOpen: false,
      addProcductInputs: {
        requiredQuantity: '',
        requiredQuantityError: false,
        requiredQuantityMsg: null,
        requiredQuantityOptional: false,
        qoutedPrice: '',
        qoutedPriceError: false,
        qoutedPriceMsg: null,
        qoutedPriceOptional: true,
        custDescription: '',
        custDescriptionError: false,
        custDescriptionMsg: null,
        custDescriptionOptional: true,
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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.getProductOptions();
    }
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
      let newName = '';
      name.forEach((n) => {
        newName =
          element[n] && element[n] != ''
            ? newName !== ''
              ? `${newName} - ${element[n]}`
              : `${element[n]}`
            : newName;
      });
      opts.push({
        value: element.id,
        label: newName,
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
    this.props.fetchProduct().then(() => {
      this.props.getCustomerInvoiceProducts(selectedOption.value).then(() => {
        let opts = [];
        this.props.pastProducts.forEach((element) => {
          let newName = '';
          name.forEach((n) => {
            newName =
              element.original_product[n] && element.original_product[n] != ''
                ? newName !== ''
                  ? `${newName} - ${element.original_product[n]}`
                  : `${element.original_product[n]}`
                : newName;
          });
          opts.push({
            value: element.original_product.id,
            label: newName,
          });
        });
        this.setState({
          pastProductsOptions: opts,
        });
      });
    });
  };

  handleProductSelect = (selectedOption, action) => {
    if (action.action === 'select-option') {
      var temp = {};
      this.props.products.forEach((element) => {
        if (element.id === action.option.value) {
          temp = element;
        }
      });
      this.setState({
        selectedProducts: selectedOption,
        addProductModelOpen: true,
        productToBeAdded: temp,
      });
    }
    if (action.action === 'remove-value') {
      this.props.removeProductFromQoutation(action.removedValue);
      this.setState({
        selectedProducts: selectedOption,
      });
    }
  };

  handlePastProductSelect = (selectedOption, action) => {
    if (action.action === 'select-option') {
      var temp = {};
      this.props.pastProducts.forEach((element) => {
        if (element.original_product.id === action.option.value) {
          temp = element;
        }
      });
      const { addProcductInputs, productToBeAdded } = this.state;
      addProcductInputs['requiredQuantity'] = temp.added_info.requiredQty;
      addProcductInputs['qoutedPrice'] =
        temp.added_info.qoutedPrice === ''
          ? productToBeAdded.price
          : temp.added_info.qoutedPrice;
      addProcductInputs['custDescription'] = temp.added_info.custDescription;
      this.setState({
        seelctedPastProducts: selectedOption,
        addProductModelOpen: true,
        productToBeAdded: temp,
        addProcductInputs: addProcductInputs,
      });
    }
    if (action.action === 'remove-value') {
      this.props.removeProductFromQoutation(action.removedValue);
      console.log('removed', selectedOption, action);
      this.setState({
        seelctedPastProducts: selectedOption,
      });
    }
  };

  addProductToQoutation = () => {
    if (this.validateProductData() === true) {
      const { productToBeAdded, addProcductInputs } = this.state;
      let temp = productToBeAdded;
      if (temp.original_product !== undefined) {
        temp.original_product.requiredQty = this.state.addProcductInputs.requiredQuantity;
        temp.original_product.qoutedPrice = this.state.addProcductInputs.qoutedPrice;
        temp.original_product.custDescription = this.state.addProcductInputs.custDescription;
      } else {
        temp.requiredQty = this.state.addProcductInputs.requiredQuantity;
        temp.qoutedPrice = this.state.addProcductInputs.qoutedPrice;
        temp.custDescription = this.state.addProcductInputs.custDescription;
      }
      if (temp.added_info === undefined) {
        this.props.addProductToQoutation(temp);
      } else {
        this.props.addProductToQoutation(temp.original_product);
      }

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
      if (
        addProcductInputs[key] === '' &&
        addProcductInputs[key + 'Optional'] === false
      ) {
        addProcductInputs[key + 'Error'] = true;
        addProcductInputs[key + 'Msg'] = 'This field is required';
        isValid = false;
      }
    }
    if (addProcductInputs.requiredQuantity === '') {
      addProcductInputs['requiredQuantityError'] = true;
      addProcductInputs['requiredQuantityMsg'] = 'Quantity should be given';
      isValid = false;
    }

    this.setState({
      addProcductInputs: addProcductInputs,
    });
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
    const { addProcductInputs } = this.state;
    addProcductInputs[event.target.id] = event.target.value;
    addProcductInputs[event.target.id + 'Error'] = false;
    addProcductInputs[event.target.id + 'Msg'] = null;
    this.setState({
      addProcductInputs: addProcductInputs,
    });
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
                  ? this.state.productToBeAdded.quatity !== undefined
                    ? this.state.productToBeAdded.quatity
                    : this.state.productToBeAdded.original_product.quatity
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
              label="Orignal Price"
              type="number"
              disabled={true}
              value={
                this.state.productToBeAdded
                  ? this.state.productToBeAdded.price
                  : ''
              }
              onChange={this.handleAddProductsChange}
              fullWidth
              error={this.state.addProcductInputs.qoutedPriceError}
              helperText={this.state.addProcductInputs.qoutedPriceMsg}
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
          <GridItem xs={12} sm={8} md={4}>
            <Select
              className={classes.margin}
              placeholder="Select Customer"
              value={this.state.selectedCustomer}
              onChange={this.handleCustomerSelect}
              options={this.state.options}
            />
          </GridItem>
          <GridItem xs={12} sm={8} md={4}>
            <Select
              className={classes.margin}
              placeholder="Select Product"
              value={this.state.selectedProducts}
              onChange={this.handleProductSelect}
              options={this.state.productOptions}
              isMulti={true}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={8} md={4}>
            <Select
              className={classes.margin}
              placeholder="Products from previous invoices"
              value={this.state.seelctedPastProducts}
              onChange={this.handlePastProductSelect}
              options={this.state.pastProductsOptions}
              isMulti={true}
            />
          </GridItem>
          <GridItem xs={12} sm={8} md={4}>
            <Select
              className={classes.margin}
              placeholder="Payment Status"
              onChange={this.handlePastProductSelect}
              options={PaymentStatus}
              isMulti={false}
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
    pastProducts: state.QoutationReducer.pastProducts,
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
    getCustomerInvoiceProducts: (payload) =>
      dispatch(getCustomerInvoiceProducts(payload)),
  };
};
Quotation = withStyles(styles)(Quotation);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotation);
