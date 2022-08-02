//import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TbActivity } from "react-icons/tb";

function Header() {
    return (  
        
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/"><TbActivity/>EMS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Employee List</Nav.Link>
            {/* <Nav.Link href="/search/notSelected">Search Employee</Nav.Link> */}
            <Nav.Link href="/employeecreate">Create Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
        );
}
 export default Header;