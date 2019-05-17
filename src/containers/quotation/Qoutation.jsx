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
    background: 'white',
  },
};
class Quotation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.containerbackground} `}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Select value={''} onChange={this.handleChange} options={[]} />
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
  return {};
};
Quotation = withStyles(styles)(Quotation);
export default Quotation;
