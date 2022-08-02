/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect , useCallback }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useParams,useNavigate} from "react-router-dom";
import graphQLFetch from "../../GraphQL/GraphQLFetch";

const EmployeeSearch = (props) => {
  const { id } = useParams();
  const [searchresult, setSearchResult] = useState({ noresult: "no result", dateOfJoining: "2022-07-15T00:00:00.000Z", department: "", title: "", employeeType: "" });
  const [updateList, setUpdateList] = useState({});
  //const [idSearch , setIdSearch] = useState();
 //const navigate = useNavigate();

  useEffect(() => {
    if (!isNaN(id)) {
      const query = `query SearchEmployee($id: Int!) {
        searchEmployee(id: $id) {
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

      async function employeeData(url = '', query = {}, variables) {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables })
        });
        return response.json();
      }
      let variable = { id: parseInt(id) }
      const result = employeeData('http://localhost:4000/graphql', query, variable)
        .then(result => {
          console.log("result");
          console.log(result);
          setSearchResult(result.data.searchEmployee);
          setUpdateList({title:result.data.searchEmployee.title,
            department:result.data.searchEmployee.department,
            employeeType:result.data.searchEmployee.employeeType,
            currentStatus:result.data.searchEmployee.currentStatus});
          return result.data.searchEmployee;
        })

    }
  }, []);


  async function employeeUpdate() {
    console.log(updateList);
    const query = `
    mutation EmployeeUpdate($employeeUpdateId: Int!, $employeeUpdates: EmployeeUpdates!) {
      employeeUpdate(id: $employeeUpdateId, employeeUpdates: $employeeUpdates) {
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

 
    const data = await graphQLFetch(query, { employeeUpdateId : parseInt(id), employeeUpdates: updateList });
        if (data) {
            alert("sucessfully updated");
            setSearchResult((prev)=>{
              return {...prev, ...updateList};
            })
            props.callLoadData();
        } 
  }


  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name === "currentStatus"){
      value = parseInt(value);
    }
    setUpdateList((prevUpdateList) => {
      return { ...prevUpdateList, [name]: value };
    });

  }
  function handleSubmit(event) {


    event.preventDefault();
    employeeUpdate();
  }

  // const handleChangeSearch = (event) => {
  //   const id = event.target.value;
  //   setIdSearch(id);
  // }

  // function handleSubmitSearch(event) {
  //   event.preventDefault();
    
  //  navigate('/search/'+idSearch, {replace: true});

  // }
  const status = ["Retired", "Working"];
  return ((() => {
    if (isNaN(id)) {
      return(<h1>No Employee Selected</h1>);
      // return (<Form className="w-50 mx-auto my-auto">
      // <Form.Group className="mb-3">
      //   <Form.Label>Enter Employee ID</Form.Label>
      //   <Form.Control name="id" type="text" onChange={handleChangeSearch} />
      // </Form.Group>
      // <Button variant="primary" type="submit" onClick={handleSubmitSearch}>
      //       Submit
      //     </Button>
      // </Form>);
      
    } else {

      return (
        <Form className="w-50 mx-auto my-auto">
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type="text" value={searchresult.firstName} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" value={searchresult.lastName} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control name="age" type="text" value={searchresult.age} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfJoining">
            <Form.Label>Date Of Joining</Form.Label>
            <Form.Control name="dateOfJoining" type="date" value={searchresult.dateOfJoining.slice(0, -14)} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Edit Title</Form.Label>
            <Form.Select onChange={handleChange} name="title">
              <option disabled selected>{searchresult.title}</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Employee">Employee</option>
              <option value="VP">VP</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Edit Department</Form.Label>
            <Form.Select onChange={handleChange} name="department" >
              <option disabled selected>{searchresult.department}</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmployeeType">
            <Form.Label>Edit Employee Type</Form.Label>
            <Form.Select onChange={handleChange} name="employeeType" >
              <option disabled selected>{searchresult.employeeType}</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCurrentStatus">
            <Form.Label>Edit Current Status</Form.Label>
            <Form.Select onChange={handleChange} name="currentStatus" >
              <option disabled selected>{status[searchresult.currentStatus]}</option>
              <option value="0">Retired</option>
              <option value="1">Working</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      );

    }
  })()

  );

}

export default EmployeeSearch;
