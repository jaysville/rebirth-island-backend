const generateWelcomeEmail = (fullName) => {
  return `
      <h1>Welcome to Rebirth Island! 🌴</h1>
      <p>Hi ${fullName},</p>
      <p>Welcome to the Rebirth Island family! We’re thrilled to have you on board. 🎉</p>
      <p>At Rebirth Island, we believe in the power of transformation and self-expression through fashion. By joining us, you’ve taken the first step towards discovering unique styles that resonate with your individuality.</p>
      <p>Here’s what you can look forward to:</p>
      <ul>
          <li>Exclusive Offers: Be the first to know about our latest collections, special discounts, and members-only promotions.</li>
          <li>Personalized Recommendations: Get style tips and outfit ideas tailored just for you.</li>
          <li>Seamless Shopping Experience: Enjoy a smooth and secure shopping journey with our user-friendly platform.</li>
      </ul>
      <p>If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at  <a href="mailto:RebirthIsland7@gmail.com">
              RebirthIsland7@gmail.com
            </a> or check out our <a href="http://rebirth-island.vercel.app/terms-of-use-and-conduct">
  Terms of Use
</a>.</p>
      <p>Thank you for choosing Rebirth Island. We can’t wait to see how you express your unique style with our collections!</p>
      <p>Stay stylish,</p>
      <p>The Rebirth Island Team</p>
    `;
};

module.exports = generateWelcomeEmail;
