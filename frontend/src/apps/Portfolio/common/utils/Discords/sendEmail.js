// ====================================
// Discord Webhook Integration
// ====================================

// Import the webhook URL from environment variables
// Add this to your .env file:
// VITE_DISCORD_NEWSLETTER_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
const DISCORD_NEWSLETTER_WEBHOOK_URL = import.meta.env
  .DISCORD_NEWSLETTER_WEBHOOK_URL;

/**
 * Sends a newsletter signup notification to Discord
 * @param {string} email - The subscriber's email address
 * @returns {Promise<boolean>} - Returns true if successful, false otherwise
 */
const sendNewsletterNotificationToDiscord = async (email) => {
  // Validate webhook URL exists
  if (!DISCORD_NEWSLETTER_WEBHOOK_URL) {
    console.error("Discord webhook URL is not configured");
    return false;
  }

  try {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Get user's location info (optional - works in browser)
    const locationInfo = await getUserLocationInfo();

    // Create Discord embed message
    const discordPayload = {
      // Optional: Username that appears as sender
      username: "Portfolio Newsletter Bot",

      // Optional: Avatar URL for the bot
      avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",

      // Main message content
      content: "📧 **New Newsletter Subscription!**",

      // Rich embed for better formatting
      embeds: [
        {
          title: "✉️ Newsletter Signup",
          description: "A new user has subscribed to your newsletter!",
          color: 3447003, // Blue color (decimal format)
          fields: [
            {
              name: "📧 Email Address",
              value: `\`${email}\``,
              inline: false,
            },
            {
              name: "🌍 Location",
              value: locationInfo.location || "Unknown",
              inline: true,
            },
            {
              name: "📱 Device",
              value: locationInfo.device || "Unknown",
              inline: true,
            },
            {
              name: "🔗 Source",
              value: "Portfolio Website - Footer",
              inline: false,
            },
            {
              name: "⏰ Timestamp (IST)",
              value: formattedDate,
              inline: false,
            },
          ],
          footer: {
            text: "Dev Kant Kumar Portfolio",
            icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          timestamp: timestamp,
        },
      ],
    };

    // Send to Discord webhook
    const response = await fetch(DISCORD_NEWSLETTER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log("✅ Newsletter notification sent to Discord");
    return true;
  } catch (error) {
    console.error("❌ Failed to send Discord notification:", error);
    // Don't throw error - we don't want to break user experience if Discord fails
    return false;
  }
};

/**
 * Helper function to get user's location and device info
 * @returns {Promise<Object>} - Location and device information
 */
const getUserLocationInfo = async () => {
  try {
    // Get device info from user agent
    const userAgent = navigator.userAgent;
    let device = "Desktop";

    if (/mobile/i.test(userAgent)) {
      device = "Mobile";
    } else if (/tablet/i.test(userAgent)) {
      device = "Tablet";
    }

    // Try to get approximate location from browser (requires user permission)
    // For privacy, we only get city/country level info
    let location = "Unknown";

    // You can use a free IP geolocation API like ipapi.co
    try {
      const geoResponse = await fetch("https://ipapi.co/json/");
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        location = `${geoData.city || "Unknown"}, ${
          geoData.country_name || "Unknown"
        }`;
      }
    } catch (geoError) {
      // Silently fail - location is optional
      console.log("Could not fetch location");
    }

    return {
      location,
      device,
      browser: getBrowserName(userAgent),
    };
  } catch (error) {
    return {
      location: "Unknown",
      device: "Unknown",
      browser: "Unknown",
    };
  }
};

/**
 * Helper function to detect browser name
 * @param {string} userAgent - Browser user agent string
 * @returns {string} - Browser name
 */
const getBrowserName = (userAgent) => {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Unknown";
};

// ====================================
// Updated Newsletter Submit Handler
// ====================================

// ====================================
// Alternative: Simpler Version (No Location Tracking)
// ====================================

/**
 * Simplified Discord notification without location tracking
 * Use this if you want a lighter implementation
 */
const sendSimpleDiscordNotification = async (email) => {
  if (!DISCORD_NEWSLETTER_WEBHOOK_URL) {
    console.error("Discord webhook URL not configured");
    return false;
  }

  try {
    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const payload = {
      content:
        `📧 **New Newsletter Signup**\n\n` +
        `**Email:** ${email}\n` +
        `**Time:** ${now}\n` +
        `**Source:** Portfolio Website`,
    };

    const response = await fetch(DISCORD_NEWSLETTER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error("Discord notification failed:", error);
    return false;
  }
};

// ====================================
// Export functions
// ====================================
export { sendNewsletterNotificationToDiscord, sendSimpleDiscordNotification };
