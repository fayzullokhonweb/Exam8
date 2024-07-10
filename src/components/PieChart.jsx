import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

function PieChart() {
  const { user } = useSelector((state) => state.user);
  const { data: products, error } = useCollection("foods", [
    "uid",
    "==",
    user?.uid,
  ]);

  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (products && products.length > 0) {
      // Process the data to get counts of each nation
      const nationCounts = products.reduce((acc, product) => {
        acc[product.nation] = (acc[product.nation] || 0) + 1;
        return acc;
      }, {});

      // Set the labels and series based on the processed data
      const labels = Object.keys(nationCounts);
      const series = Object.values(nationCounts);

      setData((prevState) => ({
        ...prevState,
        series,
        options: {
          ...prevState.options,
          labels,
        },
      }));
    }
  }, [products]);

  if (!products || products.length === 0) {
    return <h1></h1>; // Bu yerda hech narsa ko'rsatilmaydi
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl px-40 mt-24 ">
      <h2 className="text-2xl text-left mb-4">
        Distribution of Foods by Nation
      </h2>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default PieChart;
