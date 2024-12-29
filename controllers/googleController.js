import { google } from 'googleapis';
import User from '../models/User.js';


// Google OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate Google Auth URL
const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calender.events',
    ],
  });
};

// Google Login
export function googleLogin(req, res) {
  const authUrl = generateAuthUrl();
  res.json({ url: authUrl });
}

// Google OAuth Callback
export async function googleCallback(req, res) {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const { id, email } = userInfo.data;

    let user = await findOne({ googleId: id });

    if (!user) {
      user = new User({
        googleId: id,
        email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
    } else {
      user.accessToken = tokens.access_token;
      user.refreshToken = tokens.refresh_token;
    }

    await user.save();
    res.cookie('userId', user._id, { httpOnly: true });
    res.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Create Calendar Event
export async function createEvent(req, res) {
  const { eventName, startTime, endTime } = req.body;
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const event = {
      summary: eventName,
      start: { dateTime: startTime, timeZone: 'UTC' },
      end: { dateTime: endTime, timeZone: 'UTC' },
    };

    const response = calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.json({ message: 'Event created successfully', event: response.data });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
