export async function fetchImageProfile(user_id) {
  try {
    const response = await fetch(
      "http://localhost:3000/user/get-profile-photo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "fetchImageProfile POST request failed:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function checkUserExists(user_email, setUserExists) {
  let userExists;
  try {
    const response = await fetch("http://localhost:3000/user/exists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: user_email }),
    });
    if (response.ok) {
      userExists = await response.json();
      setUserExists(userExists);
    } else {
      console.error(
        "check existing account POST request failed:",
        response.statusText
      );
      setUserExists(false);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
