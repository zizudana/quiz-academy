import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        /*const user_id = encodeURI(credentials.username)
        const user_password = encodeURI(credentials.password)

        const res = await fetch(
          process.env.REST_API_URL +
            "/logins/" +
            user_id +
            "?password=" +
            user_password
        )
        const user_profile = await res.json()
        
        if (user_profile.user_name) {
          const user = {
            name: user_profile.user_name,
            email: user_profile.user_type,
            image: user_profile.user_id,
          }
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          console.error(user_profile.message)

          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject("/error/invalid_user") // Redirect to a URL
        }*/
        const user = { id: 1, name: "test", email: "student" }
        if (user) {
          return user
        } else {
            return null
        }
      },
      callbacks: {
        /**
         * @param  {object} user     User object
         * @param  {object} account  Provider account
         * @param  {object} profile  Provider profile
         * @return {boolean|string}  Return `true` to allow sign in
         *                           Return `false` to deny access
         *                           Return `string` to redirect to (eg.: "/unauthorized")
         */
        signIn: async (user, account, profile) => {
          const isAllowedToSignIn = true
          if (isAllowedToSignIn) {
            return "/user"
          } else {
            return "/guest/signin?error=unauthorized"
          }
        },
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async (url, baseUrl) => {
          return url.startsWith(baseUrl) ? url : baseUrl
        },
        /**
         * @param  {object} session      Session object
         * @param  {object} token        User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client
         */
        session: async (session, token) => {
          // Add property to session, like an access_token from a provider.
          session.accessToken = token.accessToken
          return session
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
          // Add access_token to the token right after signin
          if (account?.accessToken) {
            token.accessToken = account.accessToken
          }
          return token
        },
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
}

export default (req, res) => NextAuth(req, res, options)
