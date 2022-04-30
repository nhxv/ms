import { useEffect, useState } from "react";
import backend from "../redux/api";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";

function RevenueChart() {
  const years = [2022, 2021, 2020, 2019, 2018];
  const [year, setYear] = useState(2022);
  const [revenueStats, setRevenueStats] = useState();
  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
      legend: {
        labels: {
          color: "#404040"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#404040"
        },
        grid: {
          color: "transparent"
        }
      },
      y: {
        ticks: {
          color: "#404040"
        },
        grid: {
          color: "transparent"
        }
      }
    }
  };

  const isUpdate = useSelector((state) => {
    return state.orderSlice.trigger;
  });

  useEffect(() => {
    backend.get(`/account-orders/stats/revenue/${year}`)
    .then((res) => {
      setRevenueStats({
        labels: [
          "January", 
          "February", 
          "March", 
          "April", 
          "May", 
          "June", 
          "July", 
          "August", 
          "September", 
          "October",
          "November",
          "December", 
        ],
        datasets: [
          {
            label: "Monthly revenue",
            backgroundColor: "#6366F1",
            data: Object.values(res.data),
          },
        ]
      });
    })
    .catch(e => {
      console.log(e);
    })
  }, [isUpdate, year]);

  return (
  <>
  <Card>
    <div className="p-4">
      <Dropdown className="mb-4" options={years} value={year} onChange={(e) => setYear(e.value)} />
      <Chart type="bar" data={revenueStats} options={basicOptions} />
    </div>
  </Card>

  </>
  );
}

export default RevenueChart;