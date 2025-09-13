import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnerLayout from "../../Layout/learnerLayout";
import Login from "../../components/Login";
import Dashboard from "../../components/pages/dashboard";
import ContactUs from "../../components/pages/contactUs";
import Help from "../../components/pages/Help";
// const Dashboard = lazy(() => import('../../modules/learner/dashboard'));
// const basename = process.env.REACT_APP_BASENAME || '';

export default (
  <Router>
    <Routes>
      {/* <Route path="/login" element={<Login />}></Route> */}
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/contactus" element={<ContactUs />}></Route>
      <Route path="/Help" element={<Help />}></Route>

      <Route path="/" element={<Login />}>
        {/* <Route path="/learner/dashboard/" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  </Router>
);
