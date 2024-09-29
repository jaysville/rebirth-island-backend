const generateResetEmail = (user) => {
  let url;
  if (process.env.NODE_ENV === "production") {
    url = "https://rebirth-island.vercel.app";
  } else {
    url = "http://localhost:3000";
  }
  return `
  <html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi ${user.fullName.split(" ")[0]},</p>
      <p>You requested to reset your password. Click the button below to reset it:</p>
      <a href="${url}/reset-password/${
    user.resetPasswordToken
  }">Reset Password</a>
      <p>Link Expires in 1 hour</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Rebirth Island. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

module.exports = generateResetEmail;
