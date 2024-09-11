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

export async function editUserInfo(user_uuid, userInfo) {
  try {
    const response = await fetch("http://localhost:3000/user/edit-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uuid: user_uuid,
        first_name: userInfo.first_name.value,
        last_name: userInfo.last_name.value,
        gender: userInfo.gender.value,
        pronouns: userInfo.pronouns.value,
        jobtitle_name: userInfo.jobtitle_name.value,
        website: userInfo.website.value,
        birth_date: userInfo.birth_date.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Optionally return data or status
      return data;
    } else {
      console.error("User Contact POST request failed:", response.statusText);
      throw new Error("Failed to update user information");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw error if needed for further handling
  }
}

export async function getUserInfo(user_uuid) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${user_uuid}/info`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user info:", response.statusText);
      throw new Error("Failed to fetch user information");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw error if needed for further handling
  }
}
