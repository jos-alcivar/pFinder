// useJobPost.js
import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function useJobPost() {
  const [jobPost, setJobPost] = useState([]);
  useEffect(() => {
    async function loadAllPosts() {
      const response = await fetch(`${apiBaseUrl}/job-post-list`);
      const data = await response.json();
      setJobPost(data);
    }
    loadAllPosts();
  }, []);

  return [jobPost, setJobPost];
}
