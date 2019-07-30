import React from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import getAllCustomers from './actions/getCustomers';
import customersDataSelector from './selectors/customersListSelector';
import setCustomerId from './actions/setCustomerId';
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
  pointer: {
    cursor: 'pointer',
  },
};

class CustomerListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rowClickhandler = this.rowClickhandler.bind(this);
  }
  componentDidMount() {
    this.props.getAllCustomers();
  }
  rowClickhandler = (e, value, key) => {
    const { cusotmersRawData } = this.props;
    this.props.setCustomerId(cusotmersRawData[key].id);
    this.props.history.push(`/admin/user?id=${cusotmersRawData[key].id}`);
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Customers List</h4>
              <p className={classes.cardCategoryWhite}>
                Complete list of all the customers
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Name',
                  'Address',
                  'Phone#',
                  'Email',
                  'Company Name',
                ]}
                tableData={this.props.customers}
                onClick={this.rowClickhandler}
                pointer={classes.pointer}
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
    customers: customersDataSelector(state),
    cusotmersRawData: state.CustomerState.customers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: () => dispatch(getAllCustomers()),
    setCustomerId: (id) => dispatch(setCustomerId(id)),
  };
};
CustomerListContainer = withStyles(styles)(CustomerListContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerListContainer);
