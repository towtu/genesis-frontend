import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

const AppLayout: React.FC = () => {
  const location = useLocation();

  // Define paths where the MainLayout should not be used
  const noLayoutPaths = ['/login', '/register'];

  // Check if the current path should exclude the MainLayout
  const useMainLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Routes without MainLayout and ThemeProvider */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with MainLayout and ThemeProvider */}
        <Route
          element={
            useMainLayout ? (
              <ThemeProvider>
                <MainLayout />
              </ThemeProvider>
            ) : (
              <></>
            )
          }
        >
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
      </Routes>
    </>
  );
};

export default App;
