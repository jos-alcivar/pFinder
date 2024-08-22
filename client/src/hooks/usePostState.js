import { useState } from "react";

export function usePostState() {
  const [post, setPost] = useState({
    jobtitle_id: 0,
    jobtitle_name: "",
    jobtitle_exist: false,
    experience_id: [],
    country_id: 0,
    country_name: "",
    country_exist: false,
    state_id: 0,
    state_name: "",
    state_exist: false,
    city_id: 0,
    city_name: "",
    city_exist: false,
    company_id: 0,
    company_name: "",
    company_exist: false,
    model_id: [],
    date: "",
    link: "",
  });

  return [post, setPost];
}
