import { PieChart } from "@mui/x-charts/PieChart";
import "./AdminStat.css";
import { BarChart } from "@mui/x-charts";

import MuiTable from "../../components/MuiTable/MuiTable";
import { useEffect, useState } from "react";
import { getAllUserLevels } from "../../services/usersServices";
import { getOrdersByFamily } from "../../services/commandeservices";

export default function AdminStat() {
  const [countBronze, setCountBronze] = useState(0);
  const [countSilver, setCountSilver] = useState(0);
  const [countGold, setCountGold] = useState(0);
  const [countDiamond, setCountDiamond] = useState(0);

  const [ordersByFamilyData, setOrdersByFamilyData] = useState([]);

  const props = {
    width: 780,
    height: 280,
    xAxis: [
      { data: ["Fixation", "Outillage", "Detailling"], scaleType: "band" },
    ],
  };
  const fetchOrdersByFamily = () => {
    getOrdersByFamily().then((res) => {
      const chartData = res.data.ordersByFamily?.map((family, index) => ({
        id: index,
        label:
          family._id === "664e87fc4cf5a42abd0b5e33"
            ? "Fixation"
            : family._id === "664e88294cf5a42abd0b5e35"
            ? "Outillage"
            : family._id === "664e88614cf5a42abd0b5e37"
            ? "Detailling"
            : "Unknown Family",
        value: family.count,
        color:
          family._id === "664e87fc4cf5a42abd0b5e33"
            ? "#FFD700"
            : family._id === "664e88294cf5a42abd0b5e35"
            ? "#C0C0C0"
            : "#CD7F32",
      }));
      setOrdersByFamilyData(chartData);
    });
  };

  const fetchAllUserLevels = () => {
    getAllUserLevels().then((res) => {
      const levels = res.data.levels.map((level, index) => ({
        value: level.name,
        label: level.name,
        id: index,
      }));

      setCountGold(levels.filter((level) => level.value === "gold").length);
      setCountSilver(levels.filter((level) => level.value === "silver").length);
      setCountBronze(levels.filter((level) => level.value === "bronze").length);
      setCountDiamond(
        levels.filter((level) => level.value === "diamond").length
      );
    });
  };

  useEffect(() => {
    fetchAllUserLevels();
    fetchOrdersByFamily();
  }, []);
  return (
    <div className="statPage">
      <div className="statG">
        <div className="chart">
          <div className="firstCol">
            <div className="googleAnalytique">
              <h1>Dashboard</h1>
            </div>
            <div className="statBox">
              <h1>Users Levels</h1>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: countBronze,
                        label: "Bronze",
                        color: "#CD7F32",
                      },
                      {
                        id: 1,
                        value: countSilver,
                        label: "Silver",
                        color: "#D3D3D3",
                      },
                      {
                        id: 2,
                        value: countGold,
                        label: "Gold",
                        color: "#ffd700",
                      },
                      {
                        id: 3,
                        value: countDiamond,
                        label: "Diamond",
                        color: "#B9F2FF",
                      },
                    ],
                    innerRadius: 30,
                    outerRadius: 80,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
                width={300}
                height={160}
              />
            </div>
          </div>
          <div className="statBox2">
            <BarChart
              {...props}
              series={[
                {
                  data: ordersByFamilyData.map((order) => order.value),
                  label: "Orders by Family",
                  color: "#FF5733",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="table">
        <MuiTable />
      </div>
    </div>
  );
}
