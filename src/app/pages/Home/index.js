import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuAppBar from '../../components/MenuAppBar';
import DatePicker from '../../components/DatePicker';
import AmountInputField from '../../components/AmountInputField';
import ErrorBoundary from '../../components/ErrorBoundary';

import { selectStartDate, 
        selectPersonalAllowance, 
        selectNI,
        selectCurrency,
        selectRequestStatus,
} from '../../redux/user/user.selectors';

import { fetchNiResultsStart, resetData } from '../../redux/user/user.actions';

import { 
    MainContainer,
    MainCard,
    MainCardContent,
    MainCardActions,
} from './style.js';

function getSteps() {
    return ['Choose start date', 'Enter personal allowance'];
  }

function getStepContent(stepIndex) {
    switch(stepIndex) {
        case 0:
            return <DatePicker id="startDate" label="Start Date" />
        case 1:
            return <AmountInputField id="personalAllowance" label="Personal Allowance" />
        default: 
            return null
    }
}

function getQuestions() {
    return [
        'When did you start paying national insurance?',
        'What was your personal allowance?'
    ];
}

const Home = (props) => {
    const { 
        startDate, 
        personalAllowance, 
        fetchResultsAsync, 
        resetState, 
        currency, 
        NIContributions, 
        isRequestPending 
    } = props;

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const questions = getQuestions();
    
    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if(activeStep === steps.length - 1) {
            fetchResultsAsync(startDate, personalAllowance);
        }
      }
    
    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleReset() {
        setActiveStep(0);
        resetState()
    }

    function formatYear(date) {
        const year = date.getFullYear();
        const nextYear = (year + 1).toString();

        return `${year.toString()}/${nextYear.slice(nextYear.length - 2)}`;
    }

    return (
        <React.Fragment>
            <MenuAppBar />
            <MainContainer>
                <CssBaseline />
                <h1 className="title">
                    This app allows you to compare your national insurance contributions
                </h1>
                <MainCard>
                    <MainCardContent>
                        <div>
                            {
                                activeStep === steps.length ? (
                                    isRequestPending ? (
                                        <h2>Loading...</h2>
                                    ) : (
                                        <ErrorBoundary>
                                            <h3>Results</h3>
                                            <p>Contributions for the year <span style={{fontWeight: 'bold'}}>{
                                                    formatYear(startDate)
                                                }</span>: {currency}{ NIContributions[0].ni }
                                            </p>
                                            <p>Personal Allowance: { personalAllowance }</p>
                                        </ErrorBoundary>
                                    )
                                ) : (
                                    <React.Fragment>
                                        <p>In order for us to provide you the best results, please answer to a few questions.</p>
                                        <h2>{questions[activeStep]}</h2>
                                        {
                                            getStepContent(activeStep)
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </MainCardContent>
                    <MainCardActions>
                        {
                            activeStep === steps.length ? (
                                <Button onClick={handleReset}>Reset</Button>
                            ) : (
                                <React.Fragment>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className="backButton"
                                    >
                                    Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </React.Fragment>
                            )
                        }
                    </MainCardActions>
                </MainCard>
                
            </MainContainer> 
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    startDate: selectStartDate,
    personalAllowance: selectPersonalAllowance,
    currency: selectCurrency,
    NIContributions: selectNI,
    isRequestPending: selectRequestStatus,
});

const mapDispatchToProps = dispatch => ({
    fetchResultsAsync: (date, allowance) => dispatch(fetchNiResultsStart({ dispatch, date, allowance })),
    resetState: () => dispatch(resetData()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);