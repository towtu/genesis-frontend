import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import Account from './components/Account';
import Search from './components/Search';
import Completed from './components/Completed';
import Help from './components/Help';
import Settings from './components/Settings';
import Important from './components/Important';
import CalendarView from './components/CalendarPage';
import MainLayout from './components/MainLayout';
import { ThemeProvider } from './components/ThemeContext';
import AuthGuard from './components/AuthGuard'; // Import AuthGuard
import PublicGuard from './components/PublicGuard'; // Import PublicGuard
import { useNavigate, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
        <Routes>
          {/* Public Routes (only accessible when not logged in) */}
          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes (only accessible when logged in) */}
          <Route element={<AuthGuard />}>
            <Route element={<MainLayout />}> {/* Wrap protected routes with MainLayout */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<Search />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/important" element={<Important />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route index element={<Dashboard />} /> {/* Default route */}
            </Route>
          </Route>

          {/* Redirect all other paths to /dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;