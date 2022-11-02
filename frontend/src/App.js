import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoggedOutPage from './pages/LoggedOutPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <div>
        <Switch>
          <Route path="/admin">
            {user && user.role === 'admin' ? (
              <AdminPage user={user} setUser={setUser} />
            ) : (
              <AccessDeniedPage />
            )}
          </Route>
          <Route path="/">
            {user ? (
              <UserPage user={user} setUser={setUser} />
            ) : (
              <LoggedOutPage />
            )}
          </Route>
        </Switch>
      </div>
      <footer class="text-center bg-dark text-white">
        Powered by the{' '}
        <a href="http://www.nutritionix.com/api">Nutritionix API</a>
      </footer>
    </Router>
  );
}

export default App;
