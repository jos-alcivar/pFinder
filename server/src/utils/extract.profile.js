export default function extractGoogleProfile(profile) {
  // Extract basic profile info
  const userProfile = {
    displayName:
      profile.displayName ||
      profile.name.givenName + " " + profile.name.familyName, // Full name
    first_name: profile.name.givenName, // First name
    last_name: profile.name.familyName, // Last name
    email: profile.emails[0]?.value, // Email address (from the emails array)
    email_verified: profile.emails[0]?.verified, // Whether the email is verified
    profile_photo: profile.photos[0]?.value, // Profile photo URL
    oauth_provider: profile.provider, // OAuth provider (should be 'google')
    oauth_id: profile.id, // Google OAuth ID
  };

  return userProfile;
}
