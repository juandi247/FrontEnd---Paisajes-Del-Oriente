import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/register.css';  // Importamos el archivo de estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Nuevo estado para el popup

  const navigate = useNavigate();
    // Usamos useNavigate para redirigir

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificamos si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const registerData = { username, email, password };

    try {
      const response = await fetch('https://paisajesdeloriente-production.up.railway.app/rest/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      console.log(data);  // Para depuración

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setShowSuccessPopup(true);  // Mostrar el popup de éxito
        setTimeout(() => {
          navigate('/');  // Redirigir al login después de 3 segundos
        }, 2000); // Tiempo de espera antes de redirigir
       // Redirige al login si el registro fue exitoso
      } else {
        setError(data.error || 'Error al registrar | Los datos ya fueron registrados');
      }
    } catch (err) {
      console.error(err);  // Muestra detalles del error
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
     {/* Popup de éxito */}
     {showSuccessPopup && (
        <div className="popup-success">
          <div className="popup-content">
            <h3>¡Registro exitoso!</h3>
            
          </div>
        </div>
      )}
    </div>
  );
};


export default Register;
