import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  // Asegúrate de importar los estilos de Skeleton
import '../assets/styles.css'; // Asegúrate de que la ruta sea la correcta
import image1 from '../assets/imagen1.jpg';
import image2 from '../assets/imagen2.jpg';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // Verificar el token cuando el componente se monte
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener token del localStorage
    if (token) {
      // Hacer la validación del token
      fetch('https://paisajesdeloriente-production.up.railway.app/validate/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isValid) {
            setIsLoggedIn(true);
            setUserName(data.user.username); // Suponemos que la API devuelve el nombre del usuario
          } else {
            setIsLoggedIn(false);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Mostrar el header dependiendo si el usuario está logueado o no
  const renderHeader = () => (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          {isLoggedIn ? (
            <>
              <li>Bienvenido, {userName}</li>
              <li>
                <a href="/Profile">Perfil</a> {/* Botón de perfil */}
              </li>
              <li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="auth-button">Iniciar sesión</a>
              </li>
              <li>
                <a href="/register" className="auth-button">Registrarse</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );

  // Mientras se valida el token, mostramos un Skeleton Loader
  if (loading) {
    return (
      <div>
        {renderHeader()}
        <h1><Skeleton width={200} height={30} /></h1>
        <p><Skeleton count={3} height={20} style={{ marginBottom: '10px' }} /></p>
        <section className="about-us">
          <h2><Skeleton width={150} height={25} /></h2>
          <div className="content">
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {renderHeader()} {/* El header se renderiza aquí */}
      <h1>Bienvenido a Paisajes del Oriente</h1>
      {isLoggedIn ? (
        <p>¡Hola, {userName}! Gracias por visitar tu página de inicio.</p>
      ) : (
        <p>Por favor, inicia sesión o regístrate para acceder a tu cuenta.</p>
      )}

      {/* Sección de Quiénes somos */}
      <section className="about-us">
        <h2>Quiénes somos</h2>
        <div className="content">
          <div className="text-image">
            <p>
              Somos una empresa dedicada a brindar experiencias únicas de viaje en los paisajes más hermosos del Oriente. Nuestra misión es conectar a las personas con la naturaleza a través de recorridos personalizados y seguros. Con años de experiencia, ofrecemos un servicio excepcional que garantiza que cada uno de nuestros viajeros tenga recuerdos inolvidables.
            </p>
            <img src={image1} alt="Paisaje hermoso" className="about-image"/>
          </div>

          <div className="text-image reverse">
            <img src={image2} alt="Paisaje en el oriente" className="about-image"/>
            <p>
              Nuestros viajes son más que simples recorridos, son oportunidades para descubrir culturas, sabores y tradiciones que te conectan con el corazón de la región. Ya sea que busques aventuras emocionantes o momentos de relajación, tenemos el viaje perfecto para ti. Únete a nosotros y vive el Oriente como nunca antes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
