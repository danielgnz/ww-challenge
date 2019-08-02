import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuAppBar from '../../components/MenuAppBar';
import DatePicker from '../../components/DatePicker';
import AmountInputField from '../../components/AmountInputField';

import { selectStartDate, selectPersonalAllowance } from '../../redux/user/user.selectors';
import { fetchNiResultsStart } from '../../redux/user/user.actions';

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

const Home = ({ startDate, personalAllowance, fetchResultsAsync }) => {
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
                        {
                            activeStep === steps.length ? (
                                <div>
                                    <h3>Results</h3>
                                    <p>Date chosen: { startDate.toString() }</p>
                                    <p>Personal Allowance: { personalAllowance }</p>
                                </div>
                            )
                            : (
                                <div>
                                    <p>In order for us to provide you the best results, please answer to a few questions.</p>
                                    <h2>{questions[activeStep]}</h2>
                                    {
                                        getStepContent(activeStep)
                                    }
                                </div>
                            )
                        }
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
});

const mapDispatchToProps = dispatch => ({
    fetchResultsAsync: (date, allowance) => dispatch(fetchNiResultsStart({ date, allowance })),
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);