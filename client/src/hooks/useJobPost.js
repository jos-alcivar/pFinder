// useJobPost.js
import { useState, useEffect } from "react";

export function useJobPost() {
  const [jobPost, setJobPost] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      const response = await fetch("http://localhost:3000/job-post-list");
      const data = await response.json();
      setJobPost(data);
    }
    loadAllPosts();
  }, []);

  return [jobPost, setJobPost];
}
