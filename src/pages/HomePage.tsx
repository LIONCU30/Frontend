
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

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

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(search.toLowerCase()) ||
      station.location.toLowerCase().includes(search.toLowerCase());

    if (filter === "abiertos") {
      return matchesSearch && station.open;
    }

    if (filter === "cerrados") {
      return matchesSearch && !station.open;
    }

    if (filter === "combustible") {
      return matchesSearch && station.fuel;
    }

    if (filter === "sin-combustible") {
      return matchesSearch && !station.fuel;
    }

    return matchesSearch;
  });

  return (
    <main className="dashboard">

      {/* =========================
          BARRA LATERAL
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-icon">⛽</div>

          <div>
            <h2>SAS</h2>
            <span>Administración</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <a href="#inicio" className="nav-item active">
            <span>🏠</span>
            Inicio
          </a>

          <a href="#surtidores" className="nav-item">
            <span>⛽</span>
            Surtidores
          </a>

          <a href="#estadisticas" className="nav-item">
            <span>📊</span>
            Estadísticas
          </a>

          <a href="#informacion" className="nav-item">
            <span>ℹ️</span>
            Información
          </a>

        </nav>

        <div className="sidebar-bottom">

          {user && (
            <div className="user-card">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="user-info">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
            </div>
          )}

          <button
            className="sidebar-logout"
            type="button"
            onClick={handleLogout}
          >
            🚪 Cerrar sesión
          </button>

        </div>

      </aside>


      {/* =========================
          CONTENIDO PRINCIPAL
      ========================= */}

      <div className="dashboard-content" id="inicio">

        {/* HEADER */}

        <header className="dashboard-header">

          <div>
            <span className="header-label">
              PANEL PRINCIPAL
            </span>

            <h1>
              Información de surtidores
            </h1>

            <p>
              Consulta el estado actual de las estaciones.
            </p>
          </div>

          <div className="header-status">
            <span className="online-dot"></span>
            Sistema operativo
          </div>

        </header>


        {/* =========================
            ESTADÍSTICAS
        ========================= */}

        <section
          className="statistics"
          id="estadisticas"
        >

          <div className="stat-card">

            <div className="stat-icon green">
              ⛽
            </div>

            <div>
              <span>Surtidores registrados</span>
              <strong>6</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon gold">
              🚗
            </div>

            <div>
              <span>Autos en cola</span>
              <strong>50</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              💧
            </div>

            <div>
              <span>Con combustible</span>
              <strong>4</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon dark">
              🟢
            </div>

            <div>
              <span>Surtidores abiertos</span>
              <strong>4</strong>
            </div>

          </div>

        </section>


        {/* =========================
            BARRA DE BÚSQUEDA
        ========================= */}

        <section className="control-panel">

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Buscar surtidor o ubicación..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >

            <option value="todos">
              Todos los surtidores
            </option>

            <option value="abiertos">
              Solo abiertos
            </option>

            <option value="cerrados">
              Solo cerrados
            </option>

            <option value="combustible">
              Con combustible
            </option>

            <option value="sin-combustible">
              Sin combustible
            </option>

          </select>

        </section>


        {/* =========================
            SURTIDORES
        ========================= */}

        <section
          className="stations-section"
          id="surtidores"
        >

          <div className="section-heading">

            <div>
              <span>ESTACIONES</span>

              <h2>Surtidores disponibles</h2>
            </div>

            <p>
              {filteredStations.length} resultados
            </p>

          </div>


          <div className="stations-grid">

            {filteredStations.map((station) => (

              <article
                className="station-card"
                key={station.name}
              >

                <div className="station-image-wrapper">

                  <img
                    src={station.image}
                    alt={station.name}
                    className="station-image"
                  />

                  <span
                    className={
                      station.open
                        ? "station-status open"
                        : "station-status closed"
                    }
                  >
                    <span></span>
                    {station.open
                      ? "ABIERTO"
                      : "CERRADO"}
                  </span>

                </div>


                <div className="station-content">

                  <div className="station-title">

                    <h3>{station.name}</h3>

                    <span className="station-location">
                      📍 {station.location}
                    </span>

                  </div>


                  {/* PRECIOS */}

                  <div className="prices">

                    <div className="price-item">
                      <span>
                        Gasolina Especial
                      </span>

                      <strong>
                        {station.special}
                      </strong>
                    </div>

                    <div className="price-item">
                      <span>
                        Gasolina Premium
                      </span>

                      <strong>
                        {station.premium}
                      </strong>
                    </div>

                    <div className="price-item">
                      <span>
                        Diésel
                      </span>

                      <strong>
                        {station.diesel}
                      </strong>
                    </div>

                  </div>


                  {/* INFORMACIÓN */}

                  <div className="station-details">

                    <div className="detail">

                      <span className="detail-icon">
                        🚗
                      </span>

                      <div>
                        <small>
                          Cola de autos
                        </small>

                        <strong
                          className={
                            station.queue <= 5
                              ? "queue-low"
                              : station.queue <= 15
                              ? "queue-medium"
                              : "queue-high"
                          }
                        >
                          {station.queue} autos
                        </strong>
                      </div>

                    </div>


                    <div className="detail">

                      <span className="detail-icon">
                        ⛽
                      </span>

                      <div>

                        <small>
                          Combustible
                        </small>

                        <strong
                          className={
                            station.fuel
                              ? "fuel-available"
                              : "fuel-unavailable"
                          }
                        >
                          {station.fuel
                            ? "Disponible"
                            : "No disponible"}
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>


          {filteredStations.length === 0 && (

            <div className="empty-state">

              <span>🔎</span>

              <h3>
                No se encontraron surtidores
              </h3>

              <p>
                Intenta cambiar la búsqueda o el filtro.
              </p>

            </div>

          )}

        </section>


        {/* =========================
            INFORMACIÓN
        ========================= */}

        <section
          className="info-section"
          id="informacion"
        >

          <div className="info-text">

            <span>ACERCA DEL SISTEMA</span>

            <h2>
              Todo lo que necesitas saber
              sobre los surtidores.
            </h2>

            <p>
              SAS permite consultar de manera rápida
              y sencilla la información de diferentes
              estaciones de servicio.
            </p>

            <p>
              Puedes revisar precios de combustible,
              disponibilidad, cantidad de vehículos
              en cola y estado de cada establecimiento.
            </p>

          </div>


          <div className="info-visual">

            <img
              src="/surtidor-info.jpg"
              alt="Surtidor de combustible"
            />

            <div className="info-badge">

              <span>⛽</span>

              <div>
                <strong>
                  Información actualizada
                </strong>

                <small>
                  Estado de las estaciones
                </small>
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <footer className="dashboard-footer">

          <div>
            <strong>SAS</strong>

            <span>
              Sistema de Administración de Surtidores
            </span>
          </div>

          <p>
            © 2026 SAS
          </p>

        </footer>

      </div>

    </main>
  );
}

export default HomePage;

