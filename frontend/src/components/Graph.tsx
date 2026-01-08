import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import type { Vehicle } from "../App";
import { BarChart } from "@mui/x-charts";

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
};

const graphDivStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "gray",
  display: "flex",
  justifyContent: "center",
  alignContent: "center"
};

interface VehiclesProps {
  vehicles: Vehicle[]
}

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

export default function Graph({ vehicles }: VehiclesProps) {
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

  const barData: number[] = Object.values(count);

  const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  useEffect(() => {
    setVehicleData(vehicles);
  }, [vehicles]);

  return (
    <>
      <div className="graphContainer" style={graphDivStyle}>
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

        <BarChart
          xAxis={[{ data: ["Active", "Destroyed", "Damaged", "Maintenance"] }]}
          series={[{ data: barData }]}
          height={200}
          width={600}
        />
      </div>
    </>
  );
}
