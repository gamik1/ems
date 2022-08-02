import React from "react";
import Table from "react-bootstrap/Table";
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TableRow from "../../components/TableRow/TableRow";

export default class EmployeeTable extends React.Component {

  render() {

    const employeeRows = this.props.employees.map((employee) => (
      <TableRow key={employee.id} employee={employee} callLoadData={this.props.callLoadData} />
    ));

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" color="secondary" aria-label="medium secondary button group">
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("All")
            }}>All Employees</Button>
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("FullTime")
            }}>FullTime</Button>
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("PartTime")
            }}>PartTime</Button>
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("Contract")
            }}>Contract</Button>
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("Seasonal")
            }}>Seasonal</Button>
            <Button variant="secondary" onClick={() => {
              this.props.setEmpType("UpcomingRetirement")
            }}>Upcoming Retirement</Button>
          </ButtonGroup>
        </Box>
        <Table className="" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
              <th>DateOfJoining</th>
              <th>Title</th>
              <th>Department</th>
              <th>EmployeeType</th>
              <th>CurrentStatus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{employeeRows}</tbody>
        </Table>
      </>

    );
  }
}