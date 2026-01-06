import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

// const data = [
//   { label: "Active", value: 400, color: "#008000" },
//   { label: "Damaged", value: 300, color: "#b9600dd0" },
//   { label: "Destroyed", value: 300, color: "#ff0000" },
//   { label: "Maintenance", value: 200, color: "#29a1c9" },
// ];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

/**
 * 
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


// TODO - AINDA NÃO SEI COMO NADA DISSO FUNCIONA, TERMINAR, E TALVEZ ADICIONAR OUTROS GRÁFICOS JUNTO
export default function Graph({vehicles}) {
  
  const [data, setData] = useState([])

const TOTAL = data.map((item) => item).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

  useEffect(() => {
    setData(vehicles)
  }, [vehicles])
  
  return (
    <PieChart
      series={[
        {
          outerRadius: 100,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
