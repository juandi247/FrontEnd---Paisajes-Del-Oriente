import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles.css'; // Asegúrate de que la ruta sea la correcta

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Usando useNavigate

  useEffect(() => {
    // Obtener el token de autenticación del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirigir al login si no está logueado
      return;
    }

    // Llamar a la API para obtener los datos del perfil
    fetch('https://paisajesdeloriente-production.up.railway.app/rest/profile/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Error al cargar los datos del perfil');
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-container">
        <h2><Skeleton width={200} height={30} /></h2>
        <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button onClick={() => navigate('/')} className="back-button">Volver al Inicio</button>
      </nav>
      <h1>Paisajes del Oriente</h1>
      <h2>Perfil de Usuario</h2>
      {userData ? (
        <div className="profile-details">
          <div className="profile-item">
            <strong>Nombre:</strong> <span>{userData.username}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong> <span>{userData.email}</span>
          </div>
          <div className="profile-item">
            <strong>Contraseña:</strong> <span>**********</span> {/* No mostrar la contraseña */}
          </div>

          {/* Botón para cambiar la contraseña */}
          <div className="change-password">
            <button className="change-password-button" onClick={() => alert('Función no implementada aún.')}>Cambiar Contraseña</button>
          </div>
        </div>
      ) : (
        <p>No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
};

export default Profile;
