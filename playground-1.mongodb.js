/* global use, db */
// MongoDB Playground for Migration
// Select the database to use.
// use('test'); // Default DB for Atlas connection strings without DB name

// 1. Initialize addresses array for all users who don't have it
db.getCollection('users').updateMany(
  { addresses: { $exists: false } },
  { $set: { addresses: [] } }
);

// 2. Initialize cart object for all users who don't have it
db.getCollection('users').updateMany(
  { cart: { $exists: false } },
  {
    $set: {
      cart: {
        items: [],
        updatedAt: new Date()
      }
    }
  }
);

// 3. Initialize preferences for all users who don't have it
db.getCollection('users').updateMany(
  { preferences: { $exists: false } },
  {
    $set: {
      preferences: {
        newsletter: true,
        notifications: {
          email: true,
          push: true
        },
        theme: 'auto'
      }
    }
  }
);

// 4. Migrate socialLinks from profile.socialLinks to profile.socialLinks (Ensure structure)
// Note: In our Schema, socialLinks IS inside profile.
// If data was previously stored at root (user.socialLinks), move it back to profile.socialLinks.
// If data was stored in profile.socialLinks, ensure it matches the sub-schema.

// Let's ensure 'role' is set to 'user' if missing
db.getCollection('users').updateMany(
  { role: { $exists: false } },
  { $set: { role: 'user' } }
);

// 5. Initialize passwordChangedAt for existing users (optional, set to now or account creation)
// We'll leave it undefined for old passwords so "Last changed: Never" is accurate.

console.log('Migration completed: addresses, cart, and preferences initialized for all users.');
