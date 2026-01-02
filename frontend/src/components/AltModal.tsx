import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 8,
  p: 4,
  color: "#222",
  border: "none",
  outline: "none",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: "18px",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  background: "#f7f7f7",
  color: "#222",
  outline: "none",
  transition: "border 0.2s",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#f7f7f7",
};

const submitStyle: React.CSSProperties = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "12px 0",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background 0.2s",
};

interface ModalProps {
  vehicle: {
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
  };
  open: boolean;
  handleModalClose: () => void;
}

export default function AltModal({
  vehicle,
  open,
  handleModalClose,
  onVehicleChanged,
  onVehicleChangedLogs,
}: ModalProps) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [armor, setArmor] = useState("");
  const [armorLevel, setArmorLevel] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [maxSpeed, setMaxSpeed] = useState(0);

  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(vehicle?.fields?.name || "");
    setModel(vehicle?.fields?.model || "");
    setStatus(vehicle?.fields?.status || "");
    setArmor(vehicle?.fields?.armor || "");
    setArmorLevel(vehicle?.fields?.armor_level || 0);
    setVehicleType(vehicle?.fields?.vehicle_type || "");
    setMaxSpeed(vehicle?.fields?.max_speed || 0);
  }, [vehicle]);

  const submitForm = (e) => {
    e.preventDefault();

    const updatedVehicle = {
      fields: {
        name,
        model,
        status,
        armor,
        armor_level: armorLevel,
        vehicle_type: vehicleType,
        max_speed: maxSpeed,
      },
      event: event,
      eventDescription: description
    };

    axios
      .patch(
        `http://localhost:8000/vehicles/update/${vehicle.pk}/`,
        updatedVehicle
      )
      .then((res) => {
        onVehicleChanged();
        onVehicleChangedLogs();
        handleModalClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Editar {name}
          </h2>

          <form style={formStyle}>
            <input
              type="text"
              name="nameField"
              style={inputStyle}
              placeholder="Nome"
              id="nameField"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="modelField"
              style={inputStyle}
              placeholder="Modelo"
              id="modelField"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <select
              name="statusSel"
              style={selectStyle}
              id="statusSel"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="damaged">Damaged</option>
              <option value="destroyed">Destroyed</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <input
              type="text"
              name="event"
              style={inputStyle}
              placeholder="Evento"
              id="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />

            <input
              type="text"
              name="description"
              style={inputStyle}
              placeholder="Descrição do evento"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              name="armorSel"
              style={selectStyle}
              id="armorSel"
              value={armor}
              onChange={(e) => setArmor(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>

            <input
              type="number"
              name="armorLvlField"
              style={inputStyle}
              placeholder="Nível da blindagem"
              id="armorLvlField"
              value={armorLevel}
              min={0}
              max={100}
              onChange={(e) => setArmorLevel(e.target.value)}
            />
            <select
              name="vehicleTypeSel"
              style={selectStyle}
              id="vehicleTypeSel"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="tank">Tank</option>
              <option value="car">Car</option>
              <option value="apc">APC</option>
              <option value="ifv">IFV</option>
              <option value="other">Other</option>
            </select>

            <input
              type="number"
              name="maxSpeedField"
              style={inputStyle}
              placeholder="Velocidade máxima"
              id="maxSpeedField"
              value={maxSpeed}
              min={0}
              onChange={(e) => setMaxSpeed(e.target.value)}
            />

            <input
              type="submit"
              value="Confirmar"
              style={submitStyle}
              onClick={submitForm}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
