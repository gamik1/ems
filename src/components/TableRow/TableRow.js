/* eslint-disable no-unused-vars */
import React from "react";
import "./TableRowStyles.css";
//import { MdDeleteForever } from "react-icons/md";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//import {FaUserEdit} from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import graphQLFetch from "../../GraphQL/GraphQLFetch";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default class TableRow extends React.Component {



  render() {


    const employee = this.props.employee;
    const callLoadData = this.props.callLoadData;

    async function employeeDelete() {

        const query = `
        mutation EmployeeDelete($employeeDeleteId: Int!, $employeeStatus: Int!) {
          employeeDelete(id: $employeeDeleteId, employeeStatus: $employeeStatus)
        }`;
        const data = await graphQLFetch(query, { employeeDeleteId: parseInt(employee.id) , employeeStatus: parseInt(employee.currentStatus) });
        if (data.employeeDelete == "success") {
          alert("EMPLOYEE DELETED");
          callLoadData();
        }else if(data.employeeDelete == "fail"){
          alert("SOMETHING WENT WRONG - NOT DELETED");
        }else{
          alert(data.employeeDelete);
        }
      

    }

    return (
      <tr>
        <td>{employee.id}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.age}</td>
        <td>{employee.dateOfJoining.slice(0, -14)}</td>
        <td>{employee.title}</td>
        <td>{employee.department}</td>
        <td>{employee.employeeType}</td>
        <td>{employee.currentStatus}</td>
        <td><Link className="text-success icon" to={'/search/' + employee.id}><EditIcon /></Link><button onClick={employeeDelete} className="text-danger icon button-icon"><DeleteForeverIcon /></button></td>
      </tr>
    );
  }
}