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

class UpdateQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuntity : 0,
      newPrice : 0
    };
  }
  updateQuantity = () => {
    const {newQuntity, newPrice}  = this.state;
    const {product} =  this.props;  
    const quantity = newQuntity.trim() === "" ? product.quatity : parseInt(newQuntity) + product.quatity;
    const price = newPrice.trim() === "" && newPrice === 0 ? product.price : parseInt(newPrice);
    product.price = price;
    product.quatity = quantity;
    this.props.updateInventory(product);
  }
  onPriceChange = (e) => {
    this.setState({newPrice : e.target.value});
  }
  onQuntityChange = (e) => {
    this.setState({newQuntity : e.target.value});
  }
  render() {
    const { classes, product } = this.props;
    const {newQuntity, newPrice} =  this.state
    console.log(product, newQuntity)

    return (
      <div className={`${classes.containerbackground} `}>
        {/* dialog to get product details */}
        <Dialog
          open={this.props.updateQuantityDialogState}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Qunantity </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="currentInventory"
              label="Current inventory"
              type="text"
              fullWidth
              disabled
              value={product ? product.quatity : null}
            />
            <TextField
              autoFocus
              margin="dense"
              id="requiredQuantity"
              label="New Product Quantity"
              type="number"
              value = {this.state.newQuntity}
              onChange = {this.onQuntityChange}
              fullWidth
              
            />
            <TextField
              margin="dense"
              id="qoutedPrice"
              label="New Price"
              type="number"
              fullWidth
              value = {this.state.newPrice}
              onChange = {this.onPriceChange}
              
            />
        
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCancelClick} color="warning">
              Cancel
            </Button>
            <Button onClick={this.updateQuantity} color="primary">
              Update Product Inventory 
            </Button>
          </DialogActions>
        </Dialog>


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
   
  };
};
UpdateQuantity = withStyles(styles)(UpdateQuantity);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateQuantity);
