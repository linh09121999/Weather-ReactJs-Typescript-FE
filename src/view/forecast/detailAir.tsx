import React from "react";
import { useGlobal } from '../../context/GlobalContext';
import ChartLineBase from "../../props/chartLineBase";
import ChartMultiLine from "../../props/chartMultiLine";

const DetailAir: React.FC = () => {
  const {
    listBeaufore,
    selectDetailDay,
    resForecast,
    currentHour,
    isBorderDash
  } = useGlobal()

  const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => {
      const date = new Date(h.time);
      return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
    }
  ) ?? [];

  const dataDetail = [
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.co ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.no2 ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.o3 ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.so2 ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.pm2_5 ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.pm10 ?? 0
    ) ?? [],
  ]

  const label = ["CO", "NO2", "O3", "SO2", "PM2_5", "PM10"]

  return (
    <div className='grid gap-6'>
      <div className="w-full grid gap-4">
        <ChartMultiLine
          label={label}
          hours={hours}
          dataDetail={dataDetail}
          border={["red", "blue", "green", "orange", "purple", "cyan"]}
          background={[
            "rgba(255,0,0,0.2)",
            "rgba(0,0,255,0.2)",
            "rgba(0,255,0,0.2)",
            "rgba(255,165,0,0.2)",
            "rgba(128,0,128,0.2)",
            "rgba(0,255,255,0.2)",
          ]}
          currentIndex={isBorderDash} donvi="μg/m³" />
      </div>
    </div>
  )
}

export default DetailAir