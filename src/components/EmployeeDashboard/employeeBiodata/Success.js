import React from 'react';
import {
  Header, Card, Container, Icon, Step
} from 'semantic-ui-react';

function Success() {
  return (
    <Container>
      <Header as='h2' icon textalign='center'>
        <Icon name='users' circular />
        <Header.Content className='mx-auto'>EMPLOYEE REGISTRATION</Header.Content>
      </Header>
      <Card.Group>
        <Card fluid raised>
          <Card.Content>
            <Card.Header>
              <Step.Group style={{ overflow: 'auto', maxWidth: '100%' }}>
                <Step completed>
                  <Icon name='user' />
                  <Step.Content>
                    <Step.Title>Personal Information</Step.Title>
                    <Step.Description>Enter employee personal details</Step.Description>
                  </Step.Content>
                </Step>
                <Step completed >
                  <Icon name='map marker alternate' />
                  <Step.Content>
                    <Step.Title>Residential Details</Step.Title>
                    <Step.Description>Enter residence </Step.Description>
                  </Step.Content>
                </Step>
                <Step completed>
                  <Icon name='book' />
                  <Step.Content>
                    <Step.Title>Previous Employement</Step.Title>
                    <Step.Description>Enter previous Employment Details</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='servicestack' />
                  <Step.Content>
                    <Step.Title>Referees Details</Step.Title>
                    <Step.Description>Enter Referees Information</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='servicestack' />
                  <Step.Content>
                    <Step.Title>Educational Background</Step.Title>
                    <Step.Description>Enter Educational Background information</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='address card' />
                  <Step.Content>
                    <Step.Title>Qualifications</Step.Title>
                    <Step.Description>Enter qualification details</Step.Description>

                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='info' />
                  <Step.Content>
                    <Step.Title>Next of Kin Details</Step.Title>
                    <Step.Description>Enter next of kin details</Step.Description>

                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='info' />
                  <Step.Content>
                    <Step.Title>Spouse Details</Step.Title>
                    <Step.Description>Enter Spouse information</Step.Description>

                  </Step.Content>
                </Step>

                <Step completed>
                  <Icon name='info' />
                  <Step.Content>
                    <Step.Title>Children Details</Step.Title>
                    <Step.Description>Enter children information</Step.Description>

                  </Step.Content>
                </Step>

              </Step.Group>
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div className="alert alert-success" role="alert">
       You have successfully completed your registration.
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
}

export default Success;
