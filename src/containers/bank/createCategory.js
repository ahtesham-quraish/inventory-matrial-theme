import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as DialogButton } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
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
import BankActions from './actions';
import Loader from 'react-loader-spinner';
const { createBank, getCategory, createCategory } = BankActions;

const styles = {
  margin: {
    margin: '10px 10px',
  },
  auto: {
    width: 'auto',
  },
  unitSelect: {
    marginTop: '40px',
  },
};

const mapper = {
  '500-998': 'Expense',
  '0-199': 'Asset',
  '400-499': 'Revenue',
  '200-299': 'Liability',
  '300-399': 'Equity',
};
class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      min: 0,
      max: 0,
      categoryMethodOption: null,
      category: {
        name: '',
        code: '',
        type: '',
      },
    };
  }
  componentDidMount() {
    this.props.getCategory();
  }

  createBankChangeHandler = (e) => {
    const { category } = this.state;
    const { categories } = this.props;
    category[e.target.id] = e.target.value;
    if (category.type !== '') {
      const rangeArray = category.type.split('-');
      // if (
      //   e.target.value === '' ||
      //   (parseInt(rangeArray[0]) < parseInt(e.target.value) &&
      //     parseInt(e.target.value) < parseInt(rangeArray[1]))
      // ) {
      if (categories && categories[e.target.value]) {
        this.setState({
          msg: 'This is code is already assigned Choose another one',
        });
      } else {
        this.setState({ category });
      }
    }
  };

  onChangeNameHandler = (e) => {
    const { category } = this.state;
    category[e.target.id] = e.target.value;

    this.setState({ category });
  };
  bankMethodOnChange = (options) => {
    let { categoryMethodOption, category } = this.state;
    categoryMethodOption = options;
    category.type = options.value;

    this.setState({
      categoryMethodOption,
      category,
    });
  };
  createCategory = () => {
    const { category } = this.state;
    this.setState({ loading: true });
    const rangeArray = category.type.split('-');
    category.title = mapper[category.type];
    if (
      parseInt(rangeArray[0]) < parseInt(category.code) &&
      parseInt(category.code) < parseInt(rangeArray[1])
    ) {
      this.props.createCategory(category).then(() => {
        this.setState({ loading: false });
        this.props.handleCancelClick();
        this.setState({
          category: {
            name: '',
            code: '',
            type: '',
            title: '',
          },
        });
      });
      return;
    }

    this.setState({
      msg: 'Code is not matched with account type',
    });
  };
  render() {
    const { classes, categories } = this.props;
    return (
      <Dialog
        open={this.props.categoryModelOpenState}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Card style={{ width: '400px' }}>
                <CardHeader color="primary">Add Category</CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        type="text"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.onChangeNameHandler,
                          value: this.state.category.name,
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Select
                        placeholder="Select  Account Type"
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        options={this.props.typesOptions}
                        isMulti={false}
                        value={this.state.categoryMethodOption}
                        onChange={this.bankMethodOnChange}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Bank Code"
                        id="code"
                        onChange={this.props.onChange}
                        type="textarea"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.createBankChangeHandler,
                          value: this.state.category.code,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className="error">{this.state.msg}</span>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleCancelClick} color="warning">
            Cancel
          </Button>
          <Button onClick={this.createCategory} color="primary">
            {!this.props.loading ? (
              'ADD Category'
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
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.BankState.categories,
  };
};
const styledCompoenet = withStyles(styles)(CreateCategory);
const mapDispatchToProps = (dispatch) => {
  return {
    createBank: (body) => dispatch(createBank(body)),
    getCategory: () => dispatch(getCategory()),
    createCategory: (body) => dispatch(createCategory(body)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(styledCompoenet);
