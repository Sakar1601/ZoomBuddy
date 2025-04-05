// src/services/zoomApi.js
const ZOOM_ACCOUNT_ID = "khQFDQ_LQPyVwAnRu2N6vw";
const ZOOM_CLIENT_ID = "ai5vbz_5RJCSOWrvGmPRwA";
const ZOOM_CLIENT_SECRET = "nW4C4103I4B2181vreIl15bmiSUa8Mqw";
const ZOOM_BASE_URL = "https://api.zoom.us/v2";

async function fetchZoomAccessToken() {
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data.access_token;
}

export async function createZoomMeeting() {
  try {
    const response = await fetch(
      "https://us-central1-zoombuddy-cd986.cloudfunctions.net/createZoomMeeting"
    );

    if (!response.ok) {
      throw new Error("Failed to create Zoom meeting");
    }

    const data = await response.json();
    console.log("📞 Zoom Meeting Created:", data);
    return data;
  } catch (err) {
    console.error("❌ Zoom Meeting Creation Failed:", err);
    throw err;
  }
}

