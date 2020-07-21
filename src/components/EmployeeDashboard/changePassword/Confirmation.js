// Confirmation.jsx
import React, { Component } from 'react';
import {
  Header, Card, Button, Container, Icon, Step
} from 'semantic-ui-react';

class Confirmation extends Component {
    saveAndContinue = (e) => {
      e.preventDefault();
      this.props.nextStep();
    }

    back = (e) => {
      e.preventDefault();
      this.props.prevStep();
    }

    render() {
      return (


        <Container>
          <Header as='h2' icon textalign='center'>
            <Icon name='users' circular />
            <Header.Content>REGISTRATION</Header.Content>
          </Header>
          <Card.Group>
            <Card fluid raised>
              <Card.Content>
                <Card.Header>
                  <Step.Group style={{ overflow: 'auto', maxWidth: '100%' }}>
                    <Step completed>
                      <Icon name='user' />
                      <Step.Content>
                        <Step.Title>Customer Details</Step.Title>
                        <Step.Description>Enter the customer details</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step completed>
                      <Icon name='map marker alternate' />
                      <Step.Content>
                        <Step.Title>Map Details</Step.Title>
                        <Step.Description>Enter Location information</Step.Description>
                      </Step.Content>
                    </Step>


                    <Step completed>
                      <Icon name='book' />
                      <Step.Content>
                        <Step.Title>Category Details</Step.Title>
                        <Step.Description>Enter Category information</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step completed>
                      <Icon name='servicestack' />
                      <Step.Content>
                        <Step.Title>Service Details</Step.Title>
                        <Step.Description>Enter Service information</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step completed>
                      <Icon name='address card' />
                      <Step.Content>
                        <Step.Title>Owner Details</Step.Title>
                        <Step.Description>Enter Owner information</Step.Description>

                      </Step.Content>
                    </Step>

                    <Step active>
                      <Icon name='info' />
                      <Step.Content>
                        <Step.Title>Confirm Registration</Step.Title>
                        <Step.Description>Finalize & Confirm</Step.Description>

                      </Step.Content>
                    </Step>

                  </Step.Group>

                </Card.Header>
              </Card.Content>


              <Card.Content extra>
                <Button secondary onClick={this.back}>Back</Button>
                <Button primary onClick={this.saveAndContinue}>Save And Continue </Button>
              </Card.Content>


            </Card>
          </Card.Group>


        </Container>


      );
    }
}

export default Confirmation;
