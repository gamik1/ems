import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const form = document.forms.EmployeeAdd;
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: new Date(form.dateOfJoining.value),
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: 1,
    };
    console.log(employee)
    this.props.createEmployee(employee);
    form.firstName.value = "";
    form.lastName.value = "";
    form.age.value = "";
    form.dateOfJoining.value = "";
    form.title.value = "";
    form.department.value = "";
    form.employeeType.value = "";
    // <Alert variant="success">Employee is created sucessfully</Alert>  
  }

  render() {
    return (
      

        <Form className="w-50 mx-auto my-auto" id="EmployeeAdd" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName"type="text" placeholder="Enter First Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Enter Last Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control name="age" type="text" placeholder="Enter Age" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfJoining">
            <Form.Label>Date Of Joining</Form.Label>
            <Form.Control name="dateOfJoining" type="date" placeholder="Enter Date Of Joining" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Select name="title" aria-label="Title">
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Employee">Employee</option>
              <option value="VP">VP</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Select name="department" aria-label="Department">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmployeeType">
            <Form.Label>Employee Type</Form.Label>
            <Form.Select name="employeeType" aria-label="Employee Type">
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        
     
    );
  }
}
