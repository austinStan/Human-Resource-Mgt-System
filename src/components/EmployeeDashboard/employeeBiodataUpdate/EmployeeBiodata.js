import React from 'react';


import EmployeeChildren from './EmployeeChildren';
import PersonalDetails from './PersonalDetails';
import ResidentialData from './ResidentialData';
import SpouseData from './SpouseData';
import Qualifications from './Qualifications';
import NextOfKin from './NextOfKin';
import Refeeree from './Referees';
import EducationBackground from './EducationBackground';
import PreviousJob from './PreviousJob';


class EmployeeBiodata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }


  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  saveAndContinue = (e) => {
    e.preventDefault();
    this.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.prevStep();
  }


  render() {
    const {
      step
    } = this.state;
    switch (step) {
    case 1:
      return <PersonalDetails
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 2:
      return <EmployeeChildren
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 3:
      return <ResidentialData
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 4:
      return <SpouseData
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 5:
      return <Qualifications
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 6:
      return <NextOfKin
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 7:
      return <Refeeree
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 8:
      return <EducationBackground
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    case 9:
      return <PreviousJob
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      />;
    default:
    }
    return (
      <>
      </>
    );
  }
}
export default EmployeeBiodata;
