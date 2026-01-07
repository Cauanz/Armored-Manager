import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

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
export default function Graph({ vehicles }) {
  // const [data, setData] = useState([]);
  const data = [
    { value: 4, label: "destroyed" },
    { value: 2, label: "damaged" },
    { value: 7, label: "maintenance" },
    { value: 2, label: "active" },
  ];

  const count = vehicles.reduce((acc, v) => {
    const status = v.fields.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(count).map(([status, count]) => ({
    value: count,
    label: status,
  }));

  console.log(pieData);
  

  const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

  console.log(TOTAL)

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };



  // useEffect(() => {
  //   setData(vehicles);
  // }, [vehicles]);

  return (
    <PieChart
      series={[
        {
          outerRadius: 100,
          pieData,
          arcLabel: getArcLabel,
        },
      ]}
      // sx={{
      //   [`& .${pieArcLabelClasses.root}`]: {
      //     fill: "white",
      //     fontSize: 14,
      //   },
      // }}
      // {...sizing}
    />
  );
}
