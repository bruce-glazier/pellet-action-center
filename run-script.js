const { Axios } = require("axios");
const axios = new Axios({ baseURL: "http://127.0.0.1:5000" });
const cron = require("node-cron");

const temperatureThreshold = 3;
let previousTemperature = 0;
let previousPowerStatus = 0;

const mainTask = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const { data: temperatureData } = await axios.get("/current-temp");
      const { data: powerData } = await axios.get("/power");
      const { data: targetTemperatureData } = await axios.get(
        "/get-target-temp"
      );

      previousTemperature = temperatureData;
      previousPowerStatus = powerData;

      if (typeof temperatureData === "string" && powerData === "False") {
        const temp = parseInt(temperatureData);

        // Uses the set temperature of the stove to calcuate when it should turn it on
        const tempThreshold =
          typeof targetTemperatureData === "string"
            ? parseInt(targetTemperatureData) - temperatureThreshold
            : 65;
        if (temp < tempThreshold) {
          await axios.get("/power-on");
          console.log("Turning on stove, too cold");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  { scheduled: false }
);

const loggingTask = cron.schedule(
  "*/1 * * * *",
  () => {
    console.log(
      new Date().toISOString(),
      ":\n Temp: ",
      previousTemperature,
      "\n Power: ",
      previousPowerStatus,
      "\n"
    );
  },
  { scheduled: false }
);

mainTask.start();
loggingTask.start();
