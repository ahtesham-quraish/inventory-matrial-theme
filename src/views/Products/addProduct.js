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
import {
  addProduct,
  postProduct,
  togglePostSuccess,
  togglePostError,
} from './actions/actions';
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
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      },
      waiting: false,
    };
  }

  ComponentDidUpdate = () => {
    if (this.props.success === true) {
      toast.success('Product added successfully');
      this.props.togglePostSuccess();
    }
    if (this.props.error === true) {
      toast.error('Could not add product');
      this.props.togglePostError();
    }
  };

  onChangeHandler = (e) => {
    const { product } = this.state;
    let errorVar = e.target.id + 'Error';
    product[e.target.id] = e.target.value;
    product[errorVar] = false;
    this.setState({ product: product });
  };

  validateProductData = () => {
    const { product } = this.state;
    var isInvalid = true;
    for (var key in product) {
      console.log(key);
      if (product[key] === '') {
        product[key + 'Error'] = true;
        isInvalid = false;
      }
    }
    this.setState({
      product: product,
    });

    return isInvalid;
  };

  handleAddPoductClick = () => {
    if (this.validateProductData() === false) {
      return;
    }
    this.setState({
      waiting: true,
    });
    this.props.postProduct(this.state.product);
  };

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    // const disabled = id ? this.state.disabled : false;
    return (
      <div>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
        <GridContainer>
          <GridItem xs={16} sm={16} md={12}>
            <Card>
              <CardHeader color="primary">Add Product</CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Title"
                      id="title"
                      error={this.state.product.titleError}
                      helpText="Title is required"
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
                      labelText="Product Size"
                      id="size"
                      type="number"
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
                    <CustomInput
                      labelText="Product Units"
                      id="unit"
                      type="number"
                      error={this.state.product.unitError}
                      helpText="Units are required"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.onChangeHandler,
                        value: product.unit,
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
                    <Button
                      onClick={this.handleAddPoductClick}
                      color="primary"
                      size="sm"
                    >
                      {!this.props.loading ? (
                        'ADD Product'
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
    loading: state.productReducer.loading,
    success: state.productReducer.success,
    error: state.productReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (payload) => dispatch(addProduct(payload)),
    postProduct: (payload) => dispatch(postProduct(payload)),
    togglePostSuccess: () => dispatch(togglePostSuccess()),
    togglePostError: () => dispatch(togglePostError()),
  };
};

// ProfileDetailContainer = withStyles(styles)(ProfileDetailContainer);
AddProduct = withStyles(styles)(AddProduct);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);
