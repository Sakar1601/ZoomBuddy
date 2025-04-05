const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true }); // <-- Import and configure CORS

// 🔐 Zoom Credentials
const ZOOM_ACCOUNT_ID = "khQFDQ_LQPyVwAnRu2N6vw";
const ZOOM_CLIENT_ID = "ai5vbz_5RJCSOWrvGmPRwA";
const ZOOM_CLIENT_SECRET = "nW4C4103I4B2181vreIl15bmiSUa8Mqw";

// ✅ Function to generate Zoom meeting
exports.createZoomMeeting = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Step 1: Generate Zoom token
      const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

      const tokenRes = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      const token = tokenRes.data.access_token;

      // Step 2: Create Zoom meeting
      const meetingRes = await axios.post(
        `https://api.zoom.us/v2/users/me/meetings`,
        {
          topic: "ZoomBuddy+ 1:1 Support Session",
          type: 1, // Instant meeting
          settings: {
            join_before_host: true,
            approval_type: 0,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Zoom Meeting Created:", meetingRes.data);
      res.status(200).json(meetingRes.data);
    } catch (err) {
      console.error("❌ Zoom Meeting Creation Error:", err.response?.data || err.message);
      res.status(500).send("Zoom Meeting creation failed");
    }
  });
});
