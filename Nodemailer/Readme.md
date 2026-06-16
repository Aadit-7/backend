# Nodemailer with Gmail OAuth2 Authentication

This guide provides step-by-step instructions for setting up and using Nodemailer in a Node.js application with OAuth2 authentication using Client ID and Client Secret, along with generating a Refresh Token using the OAuth 2.0 Playground.

---

# Prerequisites

* Node.js installed on your machine.
* A Google account to generate OAuth2 credentials (Client ID and Client Secret).
* Access to Google Cloud Console.
* Basic knowledge of Node.js and environment variables.

---

# Important Notes Before Starting

> **IMPORTANT: Use a secondary Gmail account for OAuth setup and testing whenever possible.**
>
> This helps avoid permission issues and keeps your primary account separate from development activities.

Before creating OAuth credentials, you must configure the OAuth Consent Screen.

---

# Getting OAuth2 Credentials

## 1. Go to Google Cloud Console

1. Open Google Cloud Console.
2. Create a new project or select an existing project.

---

## 2. Configure OAuth Consent Screen

1. Navigate to **OAuth Consent Screen** from the left sidebar.
2. Click **Get Started**.
3. Enter your **App Name**.
4. Enter your **Support Email**.
5. Select **Audience → External**.
6. Enter the same Gmail address used above.
7. Click **Finish**.
8. Click **Create**.

---

## 3. Enable Gmail API

1. Go to **APIs & Services → Library**.
2. Search for **Gmail API**.
3. Open Gmail API.
4. Click **Enable**.

---

## 4. Create OAuth2 Credentials

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials**.
3. Select **OAuth Client ID**.
4. Choose **Web Application** as the application type.
5. Enter a name for the OAuth client.

### Authorized Redirect URIs

Add the following URIs:

```text
http://localhost
https://developers.google.com/oauthplayground
```

You may also add your application's URL if needed.

6. Click **Create**.
7. Copy and save:

You will get 2/4 requried things
* Client ID
* Client Secret

These will be required later.

---

# Fix Login Errors Before Using OAuth Playground

If this is your first time setting up OAuth, Google may show an "Access Blocked" or login error during authorization.

To fix it:

1. Go to Google Cloud Console.
2. Select your project.
3. Navigate to **APIs & Services → Credentials**.
4. Open your OAuth Client (for example, **Web Client 1**).
5. Open the **Audience** section.
6. Click **Add Test User**.
7. Add the same Gmail account used during OAuth setup.
8. Save changes.
9. Retry the authorization process.

> **Note:** If your app is in testing mode and no Test User is added, Google may block the login process.

---

# Generating the Refresh Token Using OAuth 2.0 Playground

## 1. Open OAuth 2.0 Playground

Visit:

```text
https://developers.google.com/oauthplayground
```

---

## 2. Configure OAuth Playground

1. Click the gear icon (⚙️) in the top-right corner.
2. Check **Use your own OAuth credentials**.
3. Enter your:

* Client ID
* Client Secret

4. Set Access Type to:

```text
Offline
```

This is required to receive a Refresh Token.

---

## 3. Select Scopes

Under Step 1, enter:

```text
https://mail.google.com/
```

Then click:

```text
Authorize APIs
```

---

## 4. Authorize the Application

1. Sign in with the Gmail account used earlier.
2. Review permissions.
3. Click **Allow**.

After authorization, you will be redirected back to OAuth Playground.

---

## 5. Exchange Authorization Code for Tokens

Click:

```text
Exchange authorization code for tokens
```

OAuth Playground will generate:

* Access Token
* Refresh Token

* Now you have all 4/4 requried things

---

## 6. Copy Refresh Token

Locate the Refresh Token in the response.

Example:

```text
1//04XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Copy and save it securely.

---

# Installation

## Initialize Node.js Project

```bash
npm init -y
```

## Install Nodemailer

```bash
npm install nodemailer
```

## Install Dotenv

```bash
npm install dotenv
```

---

# Configuration

## 1. Create .env File

Create a `.env` file in the project root.

```env
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REFRESH_TOKEN=your-refresh-token
EMAIL_USER=your-email@example.com
```

Replace the placeholders with your actual values.

---

## 2. Set Up Nodemailer with OAuth2

Create `email.js`.

```javascript
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

module.exports = transporter;
```

---

## 3. Create a Function to Send Emails

Add the following to `email.js`.

```javascript
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    console.log(
      "Preview URL:",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
```

---

## 4. Use the Email Function

Create or update `app.js`.

```javascript
const sendEmail = require("./email");

sendEmail(
  "recipient@example.com",
  "Test Email Subject",
  "This is a test email sent with Nodemailer using OAuth2.",
  "<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>"
);
```

---

# Running the Application

Run:

```bash
node app.js
```

If everything is configured correctly, you should see:

```text
Email server is ready to send messages
Message sent: <message-id>
```

---

# Troubleshooting

## Invalid Credentials Error

Verify that:

* Client ID is correct.
* Client Secret is correct.
* Refresh Token is valid.
* EMAIL_USER matches the Gmail account used during OAuth setup.

---

## invalid_grant: Token has been expired or revoked

This usually happens when:

* The Refresh Token was revoked.
* The Google account password was changed.
* OAuth permissions were removed.
* A new Refresh Token replaced the old one.
* The app is in testing mode and the token expired.

Solution:

1. Generate a new Refresh Token.
2. Update `.env`.
3. Restart the application.

---

## Access Blocked During Login

Make sure:

* OAuth Consent Screen is configured.
* Test User is added.
* The Gmail account used during login is listed as a Test User.

---

## Email Not Sent

Check:

* Gmail API is enabled.
* OAuth scope includes:

```text
https://mail.google.com/
```

* Internet connection is active.
* Credentials are loaded properly from `.env`.

---

# References

* Nodemailer Documentation
* Google OAuth2 Documentation
* OAuth 2.0 Playground
