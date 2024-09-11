// useWorkModel.js
import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//--- Function to create form options ----
export function useWorkModel() {
  const [model, setModel] = useState([]);
  useEffect(() => {
    async function loadWorkModel() {
      const response = await fetch(`${apiBaseUrl}/work-model`);
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
