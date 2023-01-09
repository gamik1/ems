/* eslint-disable no-unused-vars */
import React from "react";
import graphQLFetch from "../../GraphQL/GraphQLFetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeCreate from "../../pages/EmployeeCreate/EmployeeCreate";
import EmployeeSearch from "../../pages/EmployeeSearch/EmployeeSearch";
import EmployeeTable from "../../pages/EmployeeTable/EmployeeTable";
import NotFound from "../../pages/NotFound/NotFound";


export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employees: [], emp_type : "All" };
    this.createEmployee = this.createEmployee.bind(this);
    this.callLoadData = this.callLoadData.bind(this);
    this.setEmpType = this.setEmpType.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query EmployeeList($employeeType: DisplayEmployeeType!) {
      employeeList(employeeType: $employeeType) {
        _id
        id
        firstName
        lastName
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }`;
    async function employeeData(url = "", _data = {},variables) {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query , variables }),
      });
      return response.json();
    }
    
    let variables = {employeeType : this.state.emp_type};
    const result = employeeData("https://emsbackend.herokuapp.com/graphql", query, variables ).then((result) => {
      //console.log(result.data.employeeList);
      this.setState({ employees: result.data.employeeList });
      return result.data.employeeList;
    });



  }

  async createEmployee(employee) {
    const query = `
                mutation employeeAdd($employee: EmployeeInputs!) {
                        employeeAdd(employee: $employee) {
                          id
                          firstName
                          lastName
                          age
                          dateOfJoining
                          title
                          department
                          employeeType
                          currentStatus
                        } 
                }`;

    const data = await graphQLFetch(query, { employee });
    if (data) {
      this.loadData();
    }
  }
  callLoadData = () => {
    this.loadData();
  }
  async setEmpType(type){
    await this.setState({emp_type : type});
    this.loadData();
  }

  render() {
    
    return (

      <Routes>
        <Route exact path="/" element={<EmployeeTable setEmpType={this.setEmpType} employees={this.state.employees} callLoadData={this.callLoadData}/>} />
        <Route path="/employeetable" element={<EmployeeTable setEmpType={this.setEmpType} employees={this.state.employees} callLoadData={this.callLoadData} />} />
        <Route path="/search/:id" element={<EmployeeSearch />} callLoadData={this.callLoadData}/>
        <Route path="/employeecreate" element={<EmployeeCreate createEmployee={this.createEmployee} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

    );
  }
}


