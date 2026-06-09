import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("GOOGLE LOGIN STARTED");

        const email = profile.emails[0].value;
        console.log("EMAIL:", email);

        let user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("USER FOUND:", user);

        if (!user) {
          user = await prisma.user.create({
            data: {
              fullName: profile.displayName,
              email: email,
              username: email.split("@")[0] + Date.now(),
              password: "GOOGLE_AUTH_USER",
              isVerified: true,
            },
          });

          console.log("NEW USER CREATED:", user.email);
        }

        return done(null, user);
      } catch (err) {
        console.error("GOOGLE ERROR:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;