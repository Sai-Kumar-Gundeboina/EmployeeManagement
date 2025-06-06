
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import DashboardUser from './DashboardUser';
import DashboardAdmin from './DashboardAdmin';
import LeaveRequest from './LeaveRequest';
import EmployeeRegistration from './EmployeeRegistration';
import LeaveRequestView from './LeaveRequestView';
import EmployeeList from './EmployeeList';
function App() {
  return (
    <Router>
      <div className="App">
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-user" element={<DashboardUser />} />
          <Route path="/request-leave" element={<LeaveRequest />} />
          <Route path="/register-employee" element={<EmployeeRegistration />} />
          <Route path="/Leave-Request-View" element={<LeaveRequestView />} />
          <Route path="/Employee-List-View" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
