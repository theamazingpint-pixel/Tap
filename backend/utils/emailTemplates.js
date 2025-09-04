const BRAND = 'TAP – The Amazing Pint';
const PRIMARY = '#eace01';

const wrap = (title, bodyHtml) => `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;">
    <div style="max-width:560px;margin:0 auto;padding:24px 20px;">
      <h2 style="margin:0 0 12px;font-size:22px;color:${PRIMARY};">${title}</h2>
      <div>${bodyHtml}</div>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="font-size:12px;color:#666;margin:0;">
        © ${new Date().getFullYear()} ${BRAND}. If you didn’t request this, please ignore.
      </p>
    </div>
  </div>
`;

exports.welcomeEmail = ({ email, password }) => {
  const subject = `Welcome to ${BRAND} 🎉`;
  const html = wrap(
    `Welcome to ${BRAND}!`,
    `
      <p>Hi there,</p>
      <p>Your account has been created successfully.</p>
      <p><strong>Login details</strong></p>
      <ul style="padding-left:18px;margin:8px 0;">
        <li><strong>Email (username):</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>You can now sign in and start exploring.</p>
      <p>Cheers,<br><strong>The TAP Team 🍺</strong></p>
    `
  );
  const text =
    `Welcome to ${BRAND}!\n\n` +
    `Your account has been created.\n\n` +
    `Email: ${email}\nPassword: ${password}\n\n` +
    `Cheers,\nThe TAP Team`;
  return { subject, html, text };
};

// Subscription activated (first payment verified)
exports.subscriptionActivatedEmail = ({ email, planName = 'Monthly Plan' }) => {
  const subject = `Your ${BRAND} subscription is active ✅`;
  const html = wrap(
    `Subscription Activated`,
    `
      <p>Hi ${email},</p>
      <p>Your subscription (<strong>${planName}</strong>) is now active. Thank you! 🎉</p>
      <p>You’ll be billed as per your plan cycle. You can manage your subscription anytime from your account.</p>
      <p>Cheers,<br><strong>The TAP Team 🍺</strong></p>
    `
  );
  const text =
    `Subscription Activated\n\n` +
    `Your ${planName} is now active. Thanks for subscribing!\n\n` +
    `— The TAP Team`;
  return { subject, html, text };
};
