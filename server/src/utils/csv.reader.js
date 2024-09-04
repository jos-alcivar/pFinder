import fs from "fs";
import csv from "csv-parser";

export const readCSVFile = (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("Data fetched from CSV file");
        resolve(results);
      })
      .on("error", (err) => {
        console.error("Error reading the CSV file:", err);
        reject(err);
      });
  });
};
