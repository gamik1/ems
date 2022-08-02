/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EmployeeDirectory from "../EmployeeDirectory/EmployeeDirectory";
import Header from "../Header/Header";

export default function Page() {
    return (
        <Router>
            <div className="w-75 mx-auto my-auto">
                <Header className="pb-2" />
                <EmployeeDirectory />
            </div>
        </Router>
    );
}