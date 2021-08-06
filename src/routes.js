import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/* eslint-disable */

const MapProvider = lazy(() => import('src/views/ngeoMap/Map'));

// Layout
const DashboardLayout = lazy(() => import('src/layouts/DashboardLayout'));
const MainLayout = lazy(() => import('src/layouts/MainLayout'));

// Authentication
const LoginView = lazy(() => import('src/views/users/AuthView/LoginView'));
const RegisterView = lazy(() =>
  import('src/views/users/AuthView/RegisterView')
);
const ForgotPasswordView = lazy(() =>
  import('src/views/users/AuthView/ForgotPassword')
);
const ResetPasswordView = lazy(() =>
  import('src/views/users/AuthView/ResetPassword')
);

// User profile
const AccountView = lazy(() => import('src/views/users/AccountView'));
const SettingsView = lazy(() => import('src/views/settings/SettingsView'));

// Projects
const ProjectsView = lazy(() => import('src/views/project'));
const ProjectDetailView = lazy(() => import('src/views/project/ProjectDetail'));
// import ProjectProfileView from 'src/views/project/ProjectProfile';
const AddProjectView = lazy(() => import('src/views/project/AddProject'));
const EditProjectView = lazy(() => import('src/views/project/EditProject'));

// Home page
const HomeView = lazy(() => import('src/views/home'));

// Welcome Page
const WelcomeView = lazy(() => import('src/views/activity'));

// Map
// import MapView from 'src/views/map/Map';
const NgeoMapView = lazy(() => import('src/views/ngeoMap'));
// import MapIframeView from 'src/views/map';
// import MapView from 'src/views/mapViewer';

// Agents
const AgentsView = lazy(() => import('src/views/agent'));
const AgentProfile = lazy(() => import('src/views/agent/AgentProfile'));
const AddAgentView = lazy(() => import('src/views/agent/AddAgent'));
const EditAgentView = lazy(() => import('src/views/agent/EditAgent'));

// Incidents
const IncidentsView = lazy(() => import('src/views/incident'));
const AddIncidentsView = lazy(() => import('src/views/incident/AddIncident'));
const IncidentDetail = lazy(() => import('src/views/incident/IncidentDetail'));

// Dashboard
const DashboardView = lazy(() => import('src/views/reports/DashboardView'));

// General
const NotFoundView = lazy(() => import('src/views/errors/NotFoundView'));
const ProductListView = lazy(() => import('src/views/product/ProductListView'));

// Field Officers
const FieldOfficerListView = lazy(() => import('src/views/field_officer'));
const FieldOfficerProfile = lazy(() =>
  import('src/views/field_officer/FieldOfficerProfile')
);
// import AddFieldOfficerView from 'src/views/field_officer/AddFieldOfficer';
// import EditFieldOfficerView from 'src/views/field_officer/EditFieldOfficer';
// import FieldOfficerAgentView from 'src/views/field_officer/ManageAgents';

// County Managers
const CountyManagerListView = lazy(() => import('src/views/county_manager'));
const CountyManagerProfile = lazy(() =>
  import('src/views/county_manager/CountyManagerProfile')
);

// Regional Managers
const RegionalManagerListView = lazy(() =>
  import('src/views/regional_manager')
);
const RegionalManagerProfile = lazy(() =>
  import('src/views/regional_manager/RegionalManagerProfile')
);

// Returns
const AllAgentReturns = lazy(() => import('src/views/agent/AllAgentReturns'));
const AddReturnView = lazy(() => import('src/views/agent/AddReturn'));
const EditReturnView = lazy(() => import('src/views/agent/EditReturn'));
const ReturnDetailView = lazy(() => import('src/views/agent/ReturnDetails'));

// User List
const UserList = lazy(() => import('src/views/users/UserListView'));
const UserProfile = lazy(() =>
  import('src/views/users/UserListView/UserProfile')
);

// Threats
const ThreatsView = lazy(() => import('src/views/threats'));
const AddThreatView = lazy(() => import('src/views/threats/AddThreat'));
const EditThreatView = lazy(() => import('src/views/threats/EditThreat'));
const ThreatDetail = lazy(() => import('src/views/threats/ThreatDetail'));

// Themes
const ThemesView = lazy(() => import('src/views/themes'));

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      // Welcome view
      { path: 'activity', element: <WelcomeView /> },

      // Account + settings
      { path: 'account', element: <AccountView /> },

      // Dashboard
      { path: 'dashboard', element: <DashboardView /> },

      // Todo: use this product view to create a new projects display
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },

      // Agents views
      { path: 'agents', element: <AgentsView /> },
      { path: 'agents/:id', element: <AgentProfile /> },
      { path: 'agents/add', element: <AddAgentView /> },
      { path: 'agents/edit/:id', element: <EditAgentView /> },

      // Agent Returns
      { path: 'returns', element: <AllAgentReturns /> },
      { path: 'returns/add', element: <AddReturnView /> },
      { path: 'returns/edit/:id', element: <EditReturnView /> },
      { path: 'returns/:id', element: <ReturnDetailView /> },

      // projects views
      { path: 'projects', element: <ProjectsView /> },
      { path: 'projects/add', element: <AddProjectView /> },
      { path: 'projects/edit/:id', element: <EditProjectView /> },
      { path: 'projects/:id', element: <ProjectDetailView /> },

      // incidents views
      { path: 'incidents', element: <IncidentsView /> },
      { path: 'incidents/add', element: <AddIncidentsView /> },
      { path: 'incidents/:id', element: <IncidentDetail /> },

      // Threats views
      { path: 'threats', element: <ThreatsView /> },
      { path: 'threats/add', element: <AddThreatView /> },
      { path: 'threats/edit/:id', element: <EditThreatView /> },
      { path: 'threats/:id', element: <ThreatDetail /> },

      // field officers views
      { path: 'field_officers', element: <FieldOfficerListView /> },
      { path: 'field_officers/:id', element: <FieldOfficerProfile /> },
      // { path: 'field_officers/add', element: <AddFieldOfficerView /> },
      // { path: 'field_officers/edit/:id', element: <EditFieldOfficerView /> },
      // { path: 'field_officers/agents/:id', element: <FieldOfficerAgentView /> },

      // county manager views
      { path: 'county_managers', element: <CountyManagerListView /> },
      { path: 'county_managers/:id', element: <CountyManagerProfile /> },

      // Regional manager views
      { path: 'regional_managers', element: <RegionalManagerListView /> },
      { path: 'regional_managers/:id', element: <RegionalManagerProfile /> },

      // User List
      { path: 'users', element: <UserList /> },
      { path: 'users/:id', element: <UserProfile /> },

      // Thenes views
      { path: 'themes', element: <ThemesView /> },

      // Not Found Page
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'forgot-password', element: <ForgotPasswordView /> },
      {
        path: 'password/reset/:uid/:token',
        element: <ResetPasswordView />
      },
      {
        path: 'map',
        element: <Navigate to="/c/map" />
      },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/c',
    element: <DashboardLayout />,
    children: [
      //
      {
        path: 'map',
        element: (
          <MapProvider>
            <div>
              <NgeoMapView />
            </div>
          </MapProvider>
        )
      }
    ]
  }
];

export default routes;
