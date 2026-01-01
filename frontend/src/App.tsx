import { useEffect, useState } from "react";
import "./App.css";
import AltModal from "./components/AltModal";
import LogFrame from "./components/LogFrame";
interface Vehicle {
  pk: number;
  model: string;
  fields: {
    name: string;
    model: string;
    vehicle_type: string;
    status: string;
    max_speed: number;
    armor: string;
    armor_level: number;
    created_at: string;
    updated_at: string;
  };
}

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [open, setModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({});
  const handleModal = (open: boolean, vehicle: Vehicle) => {
    setModalOpen(open);
    setCurrentVehicle(vehicle);
  };
  const handleModalClose = () => setModalOpen(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/vehicles/logs/");

      if (!res.ok) {
        throw new Error(`Request error! ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setLogs(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/vehicles/");

      if (!res.ok) {
        throw new Error(`Request error! ${res.status}`);
      }

      const data = await res.json();
      setVehicles(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchLogs();
  }, []);

  if (error) {
    return <>{error}</>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="content">
        <AltModal
          open={open}
          handleModalClose={handleModalClose}
          vehicle={currentVehicle}
          onVehicleChangedLogs={fetchLogs}
          onVehicleChanged={fetchVehicles}
        />

        <div className="topContent">
          <div className="graph"></div>

          <div className="frame">
            <LogFrame logs={logs} />
          </div>
        </div>

        <div className="bottomContent">
          <div className="table">
            <ul>
              {vehicles ? (
                vehicles.map((vehicle: Vehicle) => (
                  // TODO - FAZER PARA QUE A COR DO BACKGROUND SEJA DE ACORDO COM A SITUAÇÃO DO VEICULO
                  <li key={vehicle.pk} className="vehicle-item">
                    <div className="vehicle-info">
                      <strong>{vehicle.fields.name}</strong> —{" "}
                      {vehicle.fields.model}
                      <div>Status: {vehicle.fields.status}</div>
                      <div>
                        Armor: {vehicle.fields.armor} (Level{" "}
                        {vehicle.fields.armor_level})
                      </div>
                      <div>Max Speed: {vehicle.fields.max_speed}</div>
                      <div>Vehicle Type: {vehicle.fields.vehicle_type}</div>
                    </div>
                    <button onClick={() => handleModal(true, vehicle)}>
                      Editar
                    </button>
                  </li>
                ))
              ) : (
                <h1>No vehicles were found!</h1>
              )}
            </ul>
          </div>
        </div>
      </div>

      <p>Happy New Year, Spark :)</p>
    </>
  );
}

export default App;
