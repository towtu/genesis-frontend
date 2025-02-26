import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Search from './components/Search';
import Completed from './components/Completed';
import Help from './components/Help';
import Settings from './components/Settings';
import Important from './components/Important';
import CalendarView from './components/CalendarPage';

const App: React.FC = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<TodoList />} /> {/* blanko rani */}
        <Route path="/account" element={<Account />} />
        <Route path="/search" element={<Search />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/important" element={<Important />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
    </Router>
  );
};

const ConditionalNavbar: React.FC = () => {
  const location = useLocation();
  
  const showNavbar = location.pathname !== '/register';

  return showNavbar ? <Navbar /> : null;
};

export default App;