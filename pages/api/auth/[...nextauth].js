import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  pages: {
    signIn: "/guest/signin",
    // signOut: "/auth/signout",
    error: "/guest/signin", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new_user", // If set, new users will be directed here on first sign in
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "ID" },
        password: { label: "Password", type: "password", placeholder: "•••••••••••••••" },
      },
      authorize: async (credentials) => {
        const user_id = encodeURI(credentials.username)
        const user_password = encodeURI(credentials.password)

        const res = await fetch(process.env.REST_API_URL + "/logins/" + user_id + "?password=" + user_password)
        const user_profile = await res.json()

        if (user_profile.user_name) {
          const user = { name: user_profile.user_name, email: user_profile.user_type, image: user_profile.user_id }
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          console.error(user_profile.message)

          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject("/error/invalid_user") // Redirect to a URL
        }
      },
      callbacks: {
        /**
         * @param  {object} user     User object
         * @param  {object} account  Provider account
         * @param  {object} profile  Provider profile
         * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
         *                           Return `false` to deny access
         */
        signIn: async (user, account, profile) => {
          const isAllowedToSignIn = true
          if (isAllowedToSignIn) {
            return Promise.resolve(true)
          } else {
            // Return false to display a default error message
            return Promise.resolve(false)
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        },
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async (url, baseUrl) => {
          return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl)
        },
        /**
         * @param  {object} session      Session object
         * @param  {object} user         User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client
         */
        session: async (session, user, sessionToken) => {
          // session.foo = "bar" // Add property to session
          return Promise.resolve(session)
        },
        /**
         * @param  {object}  token     Decrypted JSON Web Token
         * @param  {object}  user      User object      (only available on sign in)
         * @param  {object}  account   Provider account (only available on sign in)
         * @param  {object}  profile   Provider profile (only available on sign in)
         * @param  {boolean} isNewUser True if new user (only available on sign in)
         * @return {object}            JSON Web Token that will be saved
         */
        jwt: async (token, user, account, profile, isNewUser) => {
          const isSignIn = user ? true : false
          // Add auth_time to token on signin in
          if (isSignIn) {
            token.auth_time = Math.floor(Date.now() / 1000)
          }
          return Promise.resolve(token)
        },
      },
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
}

export default (req, res) => NextAuth(req, res, options)
