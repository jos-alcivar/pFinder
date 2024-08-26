// useCard.js
import { useState, useEffect } from "react";

export function useCardPost() {
  const [cardPost, setCardPost] = useState([]);

  useEffect(() => {
    async function loadCardPost() {
      const response = await fetch("http://localhost:3000/job-post-list");
      const data = await response.json();
      setCardPost(data);
    }
    loadCardPost();
  }, []);

  return [cardPost, setCardPost];
}
