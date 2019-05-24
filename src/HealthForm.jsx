import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      address: '',
      dateOfBirth: new Date(),
      healthIssue: ''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { fullName, address, dateOfBirth, healthIssue } = steps;

    this.setState({ fullName, address, dateOfBirth, healthIssue });
  }

  render() {
    const { fullName, address, dateOfBirth, healthIssue } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Your Details:</h3>
        <table>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{fullName.value}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address.value}</td>
            </tr>
            <tr>
              <td>Date Of Birth</td>
              <td>{dateOfBirth.value}</td>
            </tr>
            <tr>
              <td>Health Issues</td>
              <td>{healthIssue.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Details.propTypes = {
  steps: PropTypes.object,
};

Details.defaultProps = {
  steps: undefined,
};

class HealthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false, 
      dateOfBirth: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggleFloating = ({ opened }) => {
    this.setState({ opened }); 
  }

  handleChange(date) {
    this.setState({
      dateOfBirth: date
    });
  }

  render() {
    const { opened } = this.state;
    const steps = [
          {
            id: '1',
            message: 'Enter your Full Name.',
            trigger: 'fullName',
          },
          {
            id: 'fullName',
            user: true,
            validator: (value) => {
              if (!value) {
                return 'Please enter your Full Name.';
              }
              return true;
            },
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your address?',
            trigger: 'address',
          },
          {
            id: 'address',
            user: true,
            validator: (value) => {
              if (!value) {
                return 'Please enter your address.';
              }
              return true;
            },
            trigger: 5,
          },
          {
            id: '5',
            component: (<div className="My-date"><DatePicker placeholderText="Select your Date of Birth." onChange={this.handleChange}/></div>),
            asMessage: true,
            trigger: 'dateOfBirth',
          },
          {
            id: 'dateOfBirth',
            user: true,
            trigger: '7',
          },
          {
            id: '7',
            message: 'Mention your health issue.',
            trigger: 'healthIssue',
          },
          {
            id: 'healthIssue',
            user: true,
            validator: (value) => {
              if (!value) {
                return 'Enter "None/No" if you have no issues.';
              }
              return true;
            },
            trigger: 9,
          },
          {
            id: '9',
            message: 'Please check your detail summary.',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Details />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Full Name', trigger: 'update-name' },
              { value: 'address', label: 'Address', trigger: 'update-address' },
              { value: 'dob', label: 'DOB', trigger: 'update-dob' },
              { value: 'healthIssue', label: 'Health Issue', trigger: 'update-health' },
            ],
          },
          {
            id: 'update-name',
            update: 'fullName',
            trigger: '9',
          },
          {
            id: 'update-address',
            update: 'address',
            trigger: '9',
          },
          {
            id: 'update-dob',
            update: 'dateOfBirth',
            trigger: '9',
          },
          {
            id: 'update-health',
            update: 'healthIssue',
            trigger: '9',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ];
    return (
      <ChatBot
        steps={steps}
        floating={true}
        opened={opened}
        toggleFloating={this.toggleFloating}
      />
    );
  }
}

export default HealthForm;