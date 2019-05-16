import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { connect } from 'react-redux';
import { addProduct } from './actions/actions';

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
};

class ProductList extends React.Component {
  componentDidMount = () => {
    this.props.addProduct();
  };

  prepareTableData = () => {
    let product = this.props.product;
    let data = [];
    let temp = [];
    product.forEach((element) => {
      delete element['created'];
      delete element['updated'];
      for (let key in element) {
        temp.push(element[key]);
      }
      data.push(temp);
      temp = [];
    });
    console.log('prepared data is ', data);
    return data;
  };

  handleRowClick = (e, prop, key) => {
    console.log('row clicked', e.target, prop[0], key);
  };

  render() {
    const { classes, product } = this.props;
    console.log(product, 'these');
    this.prepareTableData();
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Product List</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Product ID',
                  'Title',
                  'Description',
                  'Size',
                  'Brand',
                  'Units',
                ]}
                tableData={this.prepareTableData()}
                onClick={this.handleRowClick}
              />
            </CardBody>
          </Card>
        </GridItem>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (payload) => dispatch(addProduct(payload)),
    //   postProduct: (payload) => dispatch(postProduct(payload)),
    //   togglePostSuccess: () => dispatch(togglePostSuccess()),
    //   togglePostError: () => dispatch(togglePostError()),
  };
};

const ProductListWithStyles = withStyles(styles)(ProductList);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListWithStyles);
