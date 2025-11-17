// discordWebhook.js

/**
 * Sends contact form data to Discord via webhook
 * @param {Object} formData - The form data to send
 * @param {string} formData.name - User's full name
 * @param {string} formData.email - User's email address
 * @param {string} formData.projectType - Type of project
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<boolean>} - Returns true if successful, false otherwise
 */
export async function sendToDiscord(formData) {
  // Get webhook URL from environment variable
  const DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL = import.meta.env
    .VITE_DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL;

  if (!DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL) {
    console.error("Discord webhook URL is not configured");
    return false;
  }

  // Get user's location and device info
  const getLocationInfo = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  };

  // Create timestamp
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Create Discord embed message
  const embed = {
    embeds: [
      {
        title: "📬 New Contact Form Submission!",
        color: 0x00d4ff, // Cyan color matching your theme
        fields: [
          {
            name: "📝 Contact Form Message",
            value: "A new user has reached out through your portfolio!",
            inline: false,
          },
          {
            name: "📧 Email Address",
            value: formData.email,
            inline: false,
          },
          {
            name: "👤 Full Name",
            value: formData.name || "Not provided",
            inline: true,
          },
          {
            name: "💼 Project Type",
            value: formData.projectType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            inline: true,
          },
          {
            name: "📋 Subject",
            value: formData.subject || "No subject",
            inline: false,
          },
          {
            name: "💬 Message",
            value: formData.message || "No message provided",
            inline: false,
          },
          {
            name: "🌍 Location",
            value: getLocationInfo(),
            inline: true,
          },
          {
            name: "📱 Device",
            value: getDeviceInfo(),
            inline: true,
          },
          {
            name: "🔗 Source",
            value: "Portfolio Website - Contact Form",
            inline: true,
          },
          {
            name: "⏰ Timestamp (IST)",
            value: timestamp,
            inline: false,
          },
        ],
        footer: {
          text:
            "Dev Kant Kumar Portfolio • Today at " +
            new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error sending to Discord:", error);
    return false;
  }
}

/**
 * Alternative version with username and avatar customization
 */
export async function sendToDiscordWithCustomBot(formData) {
  const DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL = import.meta.env
    .VITE_DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL;

  if (!DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL) {
    console.error("Discord webhook URL is not configured");
    return false;
  }

  const payload = {
    username: "Portfolio Contact Bot",
    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
    embeds: [
      {
        title: "📬 New Contact Form Submission!",
        color: 0x00d4ff,
        fields: [
          {
            name: "📝 Contact Form Message",
            value: "A new user has reached out through your portfolio!",
            inline: false,
          },
          {
            name: "📧 Email Address",
            value: formData.email,
            inline: false,
          },
          {
            name: "👤 Full Name",
            value: formData.name || "Not provided",
            inline: true,
          },
          {
            name: "💼 Project Type",
            value: formData.projectType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            inline: true,
          },
          {
            name: "📋 Subject",
            value: formData.subject || "No subject",
            inline: false,
          },
          {
            name: "💬 Message",
            value:
              formData.message.length > 1024
                ? formData.message.substring(0, 1021) + "..."
                : formData.message || "No message provided",
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(DISCORD_PORTFOLIO_CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error sending to Discord:", error);
    return false;
  }
}
