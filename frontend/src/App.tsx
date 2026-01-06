import { useEffect, useState } from "react";
import "./App.css";
import AltModal from "./components/AltModal";
import LogFrame from "./components/LogFrame";
import axios from "axios";
import Graph from "./components/Graph";
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
  const [mode, setMode] = useState(null);
  const handleModal = (open: boolean, vehicle: Vehicle, mode: null) => {
    setMode(mode);
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
      console.log(data);
      setVehicles(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  // TODO - ATUALIAÇÃO INSTANTANEA AO REMOVER NÃO ESTÁ FUNCIONANDO
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = axios.delete(`http://localhost:8000/vehicles/delete/${id}/`);

      if (!res) {
        throw new Error(`Request error! ${res}`);
      }

      setError(null);
      setLoading(false);
      fetchLogs();
      fetchVehicles();
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
          mode={mode}
        />

        <div className="topContent">
          <div className="graph">
            <Graph vehicles={vehicles} />
          </div>

          <div className="frame">
            <LogFrame logs={logs} />
          </div>
        </div>

        <input
          type="button"
          value="New"
          className="newVehicleBtn"
          onClick={() => handleModal(true, null, "new")}
        />

        <div className="bottomContent">
          <div className="table">
            {vehicles ? (
              vehicles.map((vehicle: Vehicle) => (
                <div
                  key={vehicle.pk}
                  className={`vehicle-item ${vehicle.fields.status}`}
                >
                  <div className="vehicle-info">
                    <strong>{vehicle.fields.name}</strong> -{" "}
                    {vehicle.fields.model}
                    <div>Status: {vehicle.fields.status}</div>
                    <div>
                      Armor: {vehicle.fields.armor} (Level{" "}
                      {vehicle.fields.armor_level})
                    </div>
                    <div>Max Speed: {vehicle.fields.max_speed}</div>
                    <div>Vehicle Type: {vehicle.fields.vehicle_type}</div>
                  </div>
                  <button onClick={() => handleModal(true, vehicle, "edit")}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(vehicle.pk)}>
                    Deletar
                  </button>
                </div>
              ))
            ) : (
              <h1>No vehicles were found!</h1>
            )}
          </div>
        </div>
      </div>

      <p>Happy New Year, Spark :)</p>
    </>
  );
}

export default App;
