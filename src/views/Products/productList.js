import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import RegularButton from '../../components/CustomButtons/Button';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { connect } from 'react-redux';
import { addProduct } from './actions/actions';
import getInvoices, { getInvoice } from '../../containers/invoice/actions/getInvoices';
import ProductLedger from './ProductLedger';
import Loader from 'react-loader-spinner';
const name = ['api', 'title', 'sae', 'size'];
const elementsNotToDisplay = [
  'id',
  'created',
  'updated',
  'description',
  'api',
  'sae',
];
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  link: {
    cursor: 'pointer',
    color: '#0000EE',
  },
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetailDialog: false,
      productId : null
    };
  }
  componentDidMount = () => {
    this.props.addProduct().then(() => {
      this.props.getInvoices()
    });

  };

  prepareTableData = () => {
    let products = this.props.product;
    let data = [];
    let temp = [];
    products.forEach((element) => {
      for (let key in element) {
        if (!elementsNotToDisplay.includes(key)) {
          if (key === 'title') {
            let newName = '';
            name.forEach((n) => {
              newName =
                element[n] && element[n] != ''
                  ? newName !== ''
                    ? `${newName} - ${element[n]}`
                    : `${element[n]}`
                  : newName;
            });
            temp.push(newName);
          } else {
            temp.push(element[key]);
          }
        }
      }
      data.push(temp);
      temp = [];
    });
    return data;
  };

  handleRowClick = (e, prop, key) => {
    let product_id = this.props.product[key].id;
    this.props.history.push('/admin/update-product/' + product_id);
  };

  handleAddProductClick = () => {
    this.props.history.push('/admin/add-products');
  };
  showProductDetail = (e, prop, key) => {
    const {product} = this.props;
    this.setState({productDetailDialog: true, productId : product[0].id });
  }
  handleCancelClick = () => {
    this.setState({productDetailDialog : false, productId : null})
  }
  render() {
    const { classes, product } = this.props;
    const {productDetailDialog, productId} = this.state;
    this.prepareTableData();
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              classes={classes}
              color="primary"
              size="sm"
              onClick={this.handleAddProductClick}
            >
              Add Product{' '}
            </RegularButton>
          </div>
          <Card className={'blue'}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Product List</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Title',
                  'Size',
                  'Brand',
                  'Units',
                  'Quantity',
                  'Price',
                  'Action',
                ]}
                tableData={this.prepareTableData()}
                onClick={this.showProductDetail}
                editClick={this.handleRowClick}

                className={classes.link}
              />
            </CardBody>
          </Card>
        </GridItem>
        {productDetailDialog && (
          <ProductLedger productId={productId} handleCancelClick={this.handleCancelClick} productDetailDialog={productDetailDialog}/>
        )}
        
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
    loading: state.productReducer.loading,
    success: state.productReducer.success,
    error: state.productReducer.error,
    invoices : state.InvoiceReducer.invoices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (payload) => dispatch(addProduct(payload)),
    getInvoices: () => dispatch(getInvoices()),
    //   togglePostSuccess: () => dispatch(togglePostSuccess()),
    //   togglePostError: () => dispatch(togglePostError()),
  };
};

const ProductListWithStyles = withStyles(styles)(ProductList);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListWithStyles);
