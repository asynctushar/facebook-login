import './App.css';
import LogIn from './components/LogIn/LogIn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:5000/api', {
      withCredentials: true
    })
      .then(res => {
        if (res.status === 200) setUser(res.data.user)
      })

      .catch(err => {
        console.log(err.response.data);
      })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LogIn />} />
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
