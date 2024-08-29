// useWorkModel.js
import { useState, useEffect, useMemo } from "react";
//--- Function to create form options ----
export function useWorkModel() {
  const [model, setModel] = useState([]);

  useEffect(() => {
    async function loadWorkModel() {
      const response = await fetch("http://localhost:3000/work-model");
      const data = await response.json();
      const workModelList = data.map((model) => model.model_name);
      setModel(
        workModelList.map((model) => ({
          label: model,
          status: "default",
        }))
      );
    }
    loadWorkModel();
  }, []);

  return [model, setModel];
}
//--- Function to create dropdownmenu options ----
export function useWorkModelOptions() {
  const [model, setModel] = useState([]);

  useEffect(() => {
    async function loadWorkModel() {
      const response = await fetch("http://localhost:3000/work-model");
      const data = await response.json();
      const workModelList = data.map((model) => model.model_name);
      setModel(workModelList);
    }
    loadWorkModel();
  }, []);

  // Memoize experience to prevent unnecessary re-renders
  const memoizedModel = useMemo(() => model, [model]);

  return [memoizedModel, setModel];
}
