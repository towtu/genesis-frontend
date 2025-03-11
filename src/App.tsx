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
import AuthGuard from './components/AuthGuard';
import PublicGuard from './components/PublicGuard';
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route element={<PublicGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<AuthGuard />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search" element={<Search />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/important" element={<Important />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route index element={<Dashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;