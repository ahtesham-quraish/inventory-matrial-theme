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
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import avatar from 'assets/img/faces/marc.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';
// actions

import {
  fetchProductDetails,
  updateProduct,
  deleteProduct,
} from './actions/actions';
const unitOptions = [
  { value: null, label: 'No Unit' },
  { value: 'KG', label: 'KG' },
  { value: 'Liter', label: 'Liter' },
  { value: 'Meter', label: 'Meter' },
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
  unitSelect: {
    marginTop: '40px',
  },
};

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitOption: null,
      product: {
        title: '',
        titleError: false,
        description: '',
        descriptionError: false,
        size: '',
        sizeError: false,
        brand: '',
        brandError: false,
        unit: '',
        unitError: '',
        quatity: '',
        quatityError: false,
        price: '',
        api: '',
        sae: '',
        saeError: false,
        apiError: false,
        priceError: false,
      },
      waiting: false,
      editModeDisabled: true,
      deleteModelOpen: false,
    };
  }

  componentDidMount = () => {
    this.props
      .fetchProductDetails(this.props.match.params.product_id)
      .then(() => {
        const { product } = this.state;
        let merged = { ...product, ...this.props.productDetails };
        this.setState({
          product: merged,
          unitOption: { value: merged.unit, label: merged.unit },
        });
      });
  };

  enableEditing = () => {
    this.setState({
      editModeDisabled: !this.state.editModeDisabled,
    });
  };

  toggleDeleteModel = () => {
    this.setState({
      deleteModelOpen: !this.state.deleteModelOpen,
    });
  };

  onChangeHandler = (e) => {
    const { product } = this.state;
    let errorVar = e.target.id + 'Error';
    product[e.target.id] = e.target.value;
    product[errorVar] = false;
    this.setState({ product: product });
  };

  handleUpdateClick = () => {
    this.setState({
      waiting: true,
    });
    this.props
      .updateProduct(this.state.product, this.props.match.params.product_id)
      .then(() => {
        toast.success('Product updated successfully');
        this.setState({
          waiting: false,
        });
      })
      .then(() => {
        this.props.history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Product could not be updated');
        this.setState({
          waiting: false,
        });
      });
  };
  handleUnitSelect = (unitOption) => {
    const { product } = this.state;
    product.unit = unitOption.value;
    this.setState({ unitOption, product });
  };
  handleProductDelete = () => {
    this.props
      .deleteProduct(this.props.match.params.product_id)
      .then(() => {
        toast.success('Product deleted successfully');
        this.props.history.push('/admin/products');
        this.setState({
          deleteModelOpen: false,
          waiting: false,
        });
      })
      .catch(() => {
        toast.error('Product could not be deleted');
        this.setState({
          waiting: false,
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { product, unitOption } = this.state;

    // const disabled = id ? this.state.disabled : false;
    return (
      <div>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
        <GridContainer>
          <GridItem xs={16} sm={16} md={12}>
            <Dialog
              open={this.state.deleteModelOpen}
              onClose={this.toggleDeleteModel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Delete ' + this.state.product.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {'Are you sure you want to delete this product?'}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.toggleDeleteModel} color="info">
                  Cancel
                </Button>
                <Button
                  onClick={this.handleProductDelete}
                  color="Danger"
                  autoFocus
                >
                  {this.state.waiting === true ? (
                    <div style={{ width: '75px' }}>
                      <Loader
                        type="ThreeDots"
                        color="white"
                        height={1000}
                        width={1000}
                      />
                    </div>
                  ) : (
                    'Delete'
                  )}
                </Button>
              </DialogActions>
            </Dialog>
            <Card>
              <CardHeader color="primary">
                {this.state.editModeDisabled
                  ? 'Product Details'
                  : 'Edit Product Details'}
                {'    '}
                {this.state.editModeDisabled && (
                  <span>
                    <i
                      onClick={this.enableEditing}
                      className={`material-icons ${classes.pointer}`}
                    >
                      edit
                    </i>
                    <i
                      onClick={this.toggleDeleteModel}
                      className={`material-icons ${classes.pointer}`}
                    >
                      delete
                    </i>
                  </span>
                )}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Title"
                      id="title"
                      error={this.state.product.titleError}
                      helpText="Title is required"
                      disabled={this.state.editModeDisabled}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.title,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product API"
                      id="api"
                      type="text"
                      error={this.state.product.sizeError}
                      helpText="Product API is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.api,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product SAE"
                      id="sae"
                      error={this.state.product.titleError}
                      helpText="SAE is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.sae,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Size"
                      id="size"
                      type="text"
                      error={this.state.product.sizeError}
                      helpText="Size is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.size,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Brand"
                      id="brand"
                      disabled={this.state.editModeDisabled}
                      error={this.state.product.brandError}
                      helpText="Brand is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.brand,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Select
                      placeholder="Select Product Unit"
                      style={{ marginTop: '40px' }}
                      value={unitOption}
                      className={classes.unitSelect}
                      onChange={this.handleUnitSelect}
                      options={unitOptions}
                      isMulti={false}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Price"
                      id="price"
                      type="textarea"
                      disabled={this.state.editModeDisabled}
                      error={this.state.product.priceError}
                      helpText="Description is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.price,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product quantity"
                      id="quatity"
                      type="textarea"
                      disabled={this.state.editModeDisabled}
                      error={this.state.product.quatityError}
                      helpText="Description is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.quatity,
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
                      disabled={this.state.editModeDisabled}
                      error={this.state.product.descriptionError}
                      helpText="Description is required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.description,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {!this.state.editModeDisabled ? (
                      <Button
                        onClick={this.handleUpdateClick}
                        color="primary"
                        size="sm"
                      >
                        {!this.state.waiting ? (
                          'Update Product'
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
                    ) : null}
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productDetails: state.productReducer.productDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductDetails: (id) => dispatch(fetchProductDetails(id)),
    updateProduct: (payload, id) => dispatch(updateProduct(payload, id)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};
UpdateProduct = withStyles(styles)(UpdateProduct);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProduct);
