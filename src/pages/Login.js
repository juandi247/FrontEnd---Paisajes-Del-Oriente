import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';  // Importamos el archivo de estilos


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };

    try {
      const response = await fetch('https://paisajesdeloriente-production.up.railway.app/rest/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data); // Muestra la respuesta para depuración

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirigir al home
      } else {
        setError(data.error || 'Error al iniciar sesión | Datos no correctos');
      }
    } catch (err) {
      console.error(err);  // Muestra detalles del error
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
