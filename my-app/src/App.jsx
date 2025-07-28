import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import RegistrationForm from './pages/RegistrationForm';

import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import AdminNav from './components/admin/AdminNav';
import PendingSocities from './pages/admin/PendingSocities';
import SocietyList from './pages/admin/SocietyList';
import EventPermission from './pages/admin/EventPermission';
import Leaderboard from './pages/admin/Leaderboard';
import CommunicationCenter from './pages/admin/CommunicationCenter';
import UserManagement from './pages/admin/UserManagement';
import ActivityLog from './pages/admin/ActivityLog';

import { ApplicantProvider } from './context/ApplicantContext'; 

function App() {
  return (
    <BrowserRouter>
      <ApplicantProvider> {/* ✅ Wrap everything */}
        <Routes>
          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <>
              <AdminNav />
              <Routes>
                <Route path="" element={<AdminPanel />} />
                <Route path="/pending" element={<PendingSocities />} />
                <Route path="/list" element={<SocietyList />} />
                <Route path="/event" element={<EventPermission />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/communication" element={<CommunicationCenter />} />
                <Route path="/usermanage" element={<UserManagement />} />
                <Route path="/activitylog" element={<ActivityLog />} />
              </Routes>
            </>
          } />

          {/* Client Routes */}
          <Route path="/*" element={
            <>
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="registrationlogin" element={<Registration />} />
                <Route path="registration" element={<RegistrationForm />} />
              </Routes>
            </>
          } />
        </Routes>
      </ApplicantProvider>
    </BrowserRouter>
  );
}

export default App;
