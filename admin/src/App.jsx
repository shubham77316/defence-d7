import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminMgmt from './pages/AdminMgmt';
import Enquiries from './pages/Enquiries';
import Settings from './pages/Settings';
import HeaderNav from './pages/HeaderNav';
import FooterMgmt from './pages/FooterMgmt';
import HomepageMgmt from './pages/HomepageMgmt';
import AboutMgmt from './pages/AboutMgmt';
import ProductsMgmt from './pages/ProductsMgmt';
import NewsMgmt from './pages/NewsMgmt';
import PartnersMgmt from './pages/PartnersMgmt';
import FaqsMgmt from './pages/FaqsMgmt';
import MediaLibrary from './pages/MediaLibrary';
import AdminProfile from './pages/AdminProfile';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const sessionActive = sessionStorage.getItem("officer_session_active");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Authorizing cryptographic security session..." />
      </div>
    );
  }

  if (!isAuthenticated || !sessionActive) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PermissionRoute({ module, superAdminOnly = false, children }) {
  const { user } = useAuth();

  // Super Admin has universal access
  if (user?.role === "SUPER_ADMIN" || user?.role === "admin") {
    return children;
  }

  // Super Admin strictly required
  if (superAdminOnly) {
    return <Navigate to="/" replace />;
  }

  // Check granular permission
  if (!module) return children;

  const hasAccess = Array.isArray(user?.permissions) && user.permissions.includes(module);
  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="audit-logs"
          element={
            <PermissionRoute module="profile">
              <AdminMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="admins"
          element={
            <PermissionRoute module="profile">
              <AdminMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="enquiries"
          element={
            <PermissionRoute module="enquiries">
              <Enquiries />
            </PermissionRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PermissionRoute module="settings">
              <Settings />
            </PermissionRoute>
          }
        />
        <Route
          path="navigation"
          element={
            <PermissionRoute module="navigation">
              <HeaderNav />
            </PermissionRoute>
          }
        />
        <Route
          path="header-nav"
          element={
            <PermissionRoute module="navigation">
              <HeaderNav />
            </PermissionRoute>
          }
        />
        <Route
          path="footer"
          element={
            <PermissionRoute module="footer">
              <FooterMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="homepage"
          element={
            <PermissionRoute module="homepage">
              <HomepageMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="about"
          element={
            <PermissionRoute module="about">
              <AboutMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="products"
          element={
            <PermissionRoute module="products">
              <ProductsMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="news"
          element={
            <PermissionRoute module="news">
              <NewsMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="partners"
          element={
            <PermissionRoute module="partners">
              <PartnersMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="faqs"
          element={
            <PermissionRoute module="faqs">
              <FaqsMgmt />
            </PermissionRoute>
          }
        />
        <Route
          path="media"
          element={
            <PermissionRoute module="media">
              <MediaLibrary />
            </PermissionRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PermissionRoute module="profile">
              <AdminProfile />
            </PermissionRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
