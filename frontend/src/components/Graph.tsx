import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import type { Vehicle } from "../App";

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
};

/**
 * DATA É ALGO ASSIM = [
 *  0: {
 *    model: "vehicles.vehicle",
 *    pk: 1,
 *    fields: {
 *      name,
 *      armor,
 *      armor_level,
 *      created_at,
 *      max_speed,
 *      model,
 *      status,
 *      updated_at,
 *      vehicle_type
 *    }
 *  }
 * ]
 */

// TODO - MELHORAR OS GRÁFICOS (E ESTILO)
export default function Graph({ vehicles }) {
  const [vehicleData, setVehicleData] = useState<Array<Vehicle>>([]);

  const count = vehicleData.reduce((acc, v) => {
    const status = v.fields.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(count).map(([status, count], idx) => ({
    id: idx,
    value: count as number,
    label: status,
  }));

  const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  useEffect(() => {
    setVehicleData(vehicles);
  }, [vehicles]);

  return (
    <PieChart
      series={[
        {
          outerRadius: 100,
          data: pieData,
          arcLabel: getArcLabel,
        },
      ]}
      {...sizing}
    />
  );
}
