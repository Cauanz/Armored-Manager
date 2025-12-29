import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
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
}: ModalProps) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [armor, setArmor] = useState("");
  const [armorLevel, setArmorLevel] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [maxSpeed, setMaxSpeed] = useState(0);

  useEffect(() => {
    setName(vehicle?.fields?.name || "");
    setModel(vehicle?.fields?.model || "");
    setStatus(vehicle?.fields?.status || "");
    setArmor(vehicle?.fields?.armor || "");
    setArmorLevel(vehicle?.fields?.armor_level || 0);
    setVehicleType(vehicle?.fields?.vehicle_type || "");
    setMaxSpeed(vehicle?.fields?.max_speed || 0);
  }, [vehicle]);

  // const name = useMemo(() => (vehicle ? vehicle.fields?.name : ""), [vehicle]);
  // const model = useMemo(
  //   () => (vehicle ? vehicle.fields?.model : ""),
  //   [vehicle]
  // );
  // const status = useMemo(
  //   () => (vehicle ? vehicle.fields?.status : ""),
  //   [vehicle]
  // );
  // const armor = useMemo(
  //   () => (vehicle ? vehicle.fields?.armor : ""),
  //   [vehicle]
  // );
  // const armorLevel = useMemo(
  //   () => (vehicle ? vehicle.fields?.armor_level : 0),
  //   [vehicle]
  // );
  // const vehicleType = useMemo(
  //   () => (vehicle ? vehicle.fields?.vehicle_type : ""),
  //   [vehicle]
  // );
  // const maxSpeed = useMemo(
  //   () => (vehicle ? vehicle.fields?.max_speed : 0),
  //   [vehicle]
  // );

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name, model, status, armor, armorLevel, vehicleType, maxSpeed);

    const updatedVehicle = {
      name,
      model,
      status,
      armor,
      armorLevel,
      vehicleType,
      maxSpeed
    }

    // TODO - TUDO TECNICAMENTE FUNCIONANDO, MAS ELE ESTÁ DANDO "NOT FOUND" PARA O ID ENVIADO POR ALGUM MOTIVO
    axios.post(`http://localhost:8000/vehicles/update/${vehicle.pk}/`, 
      updatedVehicle
    ).then((res) => console.log(res))
    .catch((err) => console.log(err))
  };

  // TODO - NÃO URGENTE, MAS ARRUMAR OS ESTILOS UM POUCO

  return (
    <div>
      {/* <Button onClick={open}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Editar {name}</h1>
          {/* <p>{name}</p>
          <p>{model}</p>
          <p>{status}</p>
          <p>{armor}</p>
          <p>{armorLevel}</p>
          <p>{vehicleType}</p>
          <p>{maxSpeed}</p> */}

          <form>
            <input
              type="text"
              name="nameField"
              id="nameField"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="modelField"
              id="modelField"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <select
              name="statusSel"
              id="statusSel"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="damaged">Damaged</option>
              <option value="destroyed">Destroyed</option>
              <option value="maintenance">Maintenance</option>
            </select>
            {/* <input
              type="text"
              name="statusField"
              id="statusField"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            /> */}
            <select
              name="armorSel"
              id="armorSel"
              value={armor}
              onChange={(e) => setArmor(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="Heavy">Heavy</option>
            </select>
            {/* <input
              type="text"
              name="armorField"
              id="armorField"
              value={armor}
              onChange={(e) => setArmor(e.target.value)}
            /> */}
            <input
              type="number"
              name="armorLvlField"
              id="armorLvlField"
              value={armorLevel}
              min={0}
              max={100}
              onChange={(e) => setArmorLevel(e.target.value)}
            />
            <select
              name="vehicleTypeSel"
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
            {/* <input
              type="text"
              name="vehicleTypeField"
              id="vehicleTypeField"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            /> */}
            <input
              type="number"
              name="maxSpeedField"
              id="maxSpeedField"
              value={maxSpeed}
              min={0}
              onChange={(e) => setMaxSpeed(e.target.value)}
            />

            <input type="submit" value="Confirmar" onClick={submitForm} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
