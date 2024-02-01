import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast?";

const parameters = {
  temperature: "temperature_2m",
  wind: "wind_speed_10m",
};

const getForecast = (latitude, longitude) => {
  const request = axios.get(
    `${baseUrl}latitude=${latitude}&longitude=${longitude}&hourly=${parameters.temperature},${parameters.wind}`,
  );

  return request.then((response) => response.data);
};

export default { getForecast, parameters };
