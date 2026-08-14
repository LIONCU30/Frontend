import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  const stations = [
    {
      name: "Surtidor Central",
      location: "Av. Principal, zona Centro",
      image: "/surtidor1.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 8,
      fuel: true,
      open: true,
    },
    {
      name: "Surtidor Norte",
      location: "Av. Banzer, zona Norte",
      image: "/surtidor2.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 15,
      fuel: true,
      open: true,
    },
    {
      name: "Surtidor Sur",
      location: "Av. Cristo Redentor",
      image: "/surtidor3.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 22,
      fuel: true,
      open: true,
    },
    {
      name: "Surtidor Este",
      location: "Av. Virgen de Cotoca",
      image: "/surtidor4.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 0,
      fuel: false,
      open: false,
    },
    {
      name: "Surtidor Oeste",
      location: "Av. Doble Vía La Guardia",
      image: "/surtidor5.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 5,
      fuel: true,
      open: true,
    },
    {
      name: "Surtidor Universidad",
      location: "Zona Universitaria",
      image: "/surtidor6.jpg",
      special: "Bs 6.74",
      premium: "Bs 7.18",
      diesel: "Bs 6.96",
      queue: 0,
      fuel: false,
      open: false,
    },
  ];

  return (
    <main className="home-page">

      <header className="home-header">
        <div className="home-logo">
          <img src="/LOL.png" alt="Logo SAS" />

          <div>
            <h2>SAS</h2>
            <p>Sistema de Administración de Surtidores</p>
          </div>
        </div>

        {user && (
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        )}
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Información de <span>surtidores</span> en tiempo real
          </h1>

          <p>
            Consulta los precios de combustible, disponibilidad,
            cantidad de vehículos en cola y horarios de atención
            de los diferentes surtidores.
          </p>

          <a href="#surtidores" className="hero-button">
            ⛽ Ver surtidores
          </a>
        </div>
      </section>

      <section className="statistics">
        <div className="stat">
          <div className="stat-icon">⛽</div>
          <h3>6</h3>
          <p>Surtidores registrados</p>
        </div>

        <div className="stat">
          <div className="stat-icon">🚗</div>
          <h3>50</h3>
          <p>Autos en cola</p>
        </div>

        <div className="stat">
          <div className="stat-icon">💧</div>
          <h3>4</h3>
          <p>Con combustible</p>
        </div>

        <div className="stat">
          <div className="stat-icon">🕐</div>
          <h3>4</h3>
          <p>Surtidores abiertos</p>
        </div>
      </section>

      <section className="stations-section" id="surtidores">
        <div className="section-title">
          <h2>⛽ Nuestros Surtidores</h2>
          <p>Consulta el estado actual de cada estación.</p>
        </div>

        <div className="stations-grid">
          {stations.map((station) => (
            <article className="station-card" key={station.name}>

              <img
                src={station.image}
                alt={station.name}
                className="station-image"
              />

              <div className="station-content">

                <div className="station-header">
                  <h3>{station.name}</h3>

                  <span
                    className={
                      station.open
                        ? "status open"
                        : "status closed"
                    }
                  >
                    {station.open ? "ABIERTO" : "CERRADO"}
                  </span>
                </div>

                <p className="location">
                  📍 {station.location}
                </p>

                <div className="prices">
                  <div className="price-row">
                    <span>Gasolina Especial</span>
                    <span className="price">{station.special}</span>
                  </div>

                  <div className="price-row">
                    <span>Gasolina Premium</span>
                    <span className="price">{station.premium}</span>
                  </div>

                  <div className="price-row">
                    <span>Diésel</span>
                    <span className="price">{station.diesel}</span>
                  </div>
                </div>

                <div className="station-info">

                  <div className="info-row">
                    <span className="info-label">
                      🚗 Cola de autos
                    </span>

                    <span
                      className={
                        station.queue <= 5
                          ? "info-value queue-low"
                          : station.queue <= 15
                          ? "info-value queue-medium"
                          : "info-value queue-high"
                      }
                    >
                      {station.queue} autos
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">
                      ⛽ Combustible
                    </span>

                    <span
                      className={
                        station.fuel
                          ? "info-value available"
                          : "info-value unavailable"
                      }
                    >
                      {station.fuel
                        ? "Disponible"
                        : "No disponible"}
                    </span>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <img
          src="/surtidor-info.jpg"
          alt="Surtidor de combustible"
          className="info-image"
        />

        <div className="info-content">
          <h2>Información sobre nuestros surtidores</h2>

          <p>
            Nuestro sistema permite consultar información
            importante de los surtidores de manera rápida y
            sencilla.
          </p>

          <p>
            Puedes verificar los precios actuales, la cantidad
            aproximada de vehículos en cola, la disponibilidad
            de combustible y si el establecimiento se encuentra
            abierto o cerrado.
          </p>

          <p>
            De esta manera puedes conocer el estado de un
            surtidor antes de dirigirte hacia él.
          </p>
        </div>
      </section>

      <footer className="home-footer">
        <h3>SAS</h3>

        <p>
          Sistema de Administración de Surtidores
        </p>

        <p>
          © 2026 SAS - Todos los derechos reservados.
        </p>
      </footer>

    </main>
  );
}

export default HomePage;