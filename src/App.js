import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManageContent from './pages/ManageContent';
import ManageCategories from './pages/ManageCategories';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './context/UserContext';
import ProfilePage from './pages/ProfileCreation'; // Tech Writer Profile Creation
import HomePage from './pages/TechWriterHomePage';
import ApproveContent from './pages/ApproveContent'; // General Home Page for all users
import TechWriterHomePage from './pages/TechWriterHomePage'; // Tech Writer Home Page
import EditContent from './pages/EditContent';
import ReviewContent from './pages/ContentListPage';
import ContentPage from './pages/ContentPage';
function App() {
  // Define state to manage the sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar component with dynamic visibility */}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              style={{ position: 'fixed', width: isSidebarOpen ? '240px' : '0', height: '100vh' }}
            />
            <div
              style={{
                marginLeft: isSidebarOpen ? '240px' : '0', // Adjust content area based on sidebar visibility
                padding: '20px',
                flex: 1,
                transition: 'margin-left 0.3s', // Smooth transition when toggling sidebar
              }}
            >
              {/* Define Routes and their components */}
              <Routes>
                {/* Default Route for General Home Page */}
                <Route path="/" element={<HomePage />} />

                {/* TechWriter specific route */}
                <Route path="/techwriter/home" element={<TechWriterHomePage />} /> {/* TechWriter Home page */}

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/post-content" element={<ManageContent />} />
                <Route path="/techwriter/review-content" element={<ReviewContent />} />
                <Route path="/admin/categories" element={<ManageCategories />} />
                <Route path="/techwriter/approve-content" element={<ApproveContent />} />
                <Route path="/techwriter/edit-content" element={<EditContent />} />
                <Route path="/content/:id" element={<ContentPage />} /> {/* Render ContentPage for each content ID */}
                {/* Tech Writer Profile Page */}
                <Route path="/techwriter/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
