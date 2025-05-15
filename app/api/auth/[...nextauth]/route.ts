import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        // Add logic here to look up the user from the credentials supplied
        // IMPORTANT: This is a placeholder. You'll need to implement user lookup
        // against your database and password verification.
        // For now, let's mock a user for demonstration.
        // DO NOT use this in production.
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          // Any object returned will be saved in `user` property of the JWT
          return { id: "1", name: "J Smith", email: "user@example.com" }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  // secret: process.env.NEXTAUTH_SECRET, // Uncomment and set this in your .env.local for production
  pages: {
    signIn: '/auth/login', // Redirect users to your custom login page
    // error: '/auth/error', // Error code passed in query string as ?error=
    // signOut: '/auth/logout', // Optional: Custom sign out page
    // verifyRequest: '/auth/verify-request', // (used for email provider)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     if (user) {
  //       token.id = user.id
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     if (session.user) {
  //       session.user.id = token.id as string; // Add id to session
  //     }
  //     return session
  //   }
  // }
})

export { handler as GET, handler as POST } 