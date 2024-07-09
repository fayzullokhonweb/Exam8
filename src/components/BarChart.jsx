import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BarChart() {
  const { user } = useSelector((state) => state.user);
  const { data: products, error } = useCollection("foods", [
    "uid",
    "==",
    user?.uid,
  ]);

  const foodTitle = products ? products.map((food) => food.title) : [];
  const foodTime = products ? products.map((food) => food.time) : [];

  const [data, setData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    if (products) {
      setData((prevState) => ({
        ...prevState,
        series: [
          {
            data: foodTime,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: foodTitle,
          },
        },
      }));
    }
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="text-xl flex items-center justify-center mt-8 gap-10 ">
        <h2>there is no recipe :(</h2>
        <Link to="/create" className="hover:underline">
          Create a recipe
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-2xl">
        The list of how long the food will be ready is shown through a bar
        chart.
      </h2>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default BarChart;
