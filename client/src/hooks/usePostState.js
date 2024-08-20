import { useState } from "react";

export function usePostState() {
  const [post, setPost] = useState({
    title: "",
    experience: [],
    country: "",
    state: "",
    city: "",
    company: "",
    link: "",
    model: [],
    date: "",
  });

  return [post, setPost];
}
