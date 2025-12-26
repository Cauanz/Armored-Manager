import { useEffect, useState } from "react";
import "./App.css";
import AltModal from "./components/AltModal";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [open, setModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({});
  const handleModal = (open: boolean, vehicle: object) => {
    setModalOpen(open);
    setCurrentVehicle(vehicle);
  };
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
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

    fetchVehicles();
  }, []);

  if (error) {
    return <>{error}</>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(currentVehicle);

  // TODO - PROBLEMAS, MODAL NÃO FUNCIONA, E NÃO SEI SE TUDO DEPOIS DISSO TAMBÉM FUNCIONA

  return (
    <>
      <div className="content">
        <AltModal
          open={open}
          handleModalClose={handleModalClose}
          vehicle={currentVehicle}
        />

        <ul>
          {vehicles ? (
            vehicles.map((vehicle: Vehicle) => (
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
    </>
  );
}

export default App;
