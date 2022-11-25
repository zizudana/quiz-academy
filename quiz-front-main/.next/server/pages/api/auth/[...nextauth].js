"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers":
/*!**************************************!*\
  !*** external "next-auth/providers" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers */ \"next-auth/providers\");\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst options = {\n    providers: [\n        next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default().Credentials({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            authorize: async (credentials)=>{\n                const user_id = encodeURI(credentials.username);\n                const user_password = encodeURI(credentials.password);\n                const res = await fetch(process.env.REST_API_URL + \"/logins/\" + user_id + \"?password=\" + user_password);\n                const user_profile = await res.json();\n                if (user_profile.user_name) {\n                    const user = {\n                        name: user_profile.user_name,\n                        email: user_profile.user_type,\n                        image: user_profile.user_id\n                    };\n                    // Any object returned will be saved in `user` property of the JWT\n                    return Promise.resolve(user);\n                } else {\n                    console.error(user_profile.message);\n                    // If you return null or false then the credentials will be rejected\n                    return Promise.resolve(null);\n                // You can also Reject this callback with an Error or with a URL:\n                // return Promise.reject(new Error('error message')) // Redirect to error page\n                // return Promise.reject(\"/error/invalid_user\") // Redirect to a URL\n                }\n            },\n            callbacks: {\n                /**\n         * @param  {object} user     User object\n         * @param  {object} account  Provider account\n         * @param  {object} profile  Provider profile\n         * @return {boolean|string}  Return `true` to allow sign in\n         *                           Return `false` to deny access\n         *                           Return `string` to redirect to (eg.: \"/unauthorized\")\n         */ signIn: async (user, account, profile)=>{\n                    const isAllowedToSignIn = true;\n                    if (isAllowedToSignIn) {\n                        return \"/user\";\n                    } else {\n                        return \"/guest/signin?error=unauthorized\";\n                    }\n                },\n                /**\n         * @param  {string} url      URL provided as callback URL by the client\n         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)\n         * @return {string}          URL the client will be redirect to\n         */ redirect: async (url, baseUrl)=>{\n                    return url.startsWith(baseUrl) ? url : baseUrl;\n                },\n                /**\n         * @param  {object} session      Session object\n         * @param  {object} token        User object    (if using database sessions)\n         *                               JSON Web Token (if not using database sessions)\n         * @return {object}              Session that will be returned to the client\n         */ session: async (session, token)=>{\n                    // Add property to session, like an access_token from a provider.\n                    session.accessToken = token.accessToken;\n                    return session;\n                },\n                /**\n         * @param  {object}  token     Decrypted JSON Web Token\n         * @param  {object}  user      User object      (only available on sign in)\n         * @param  {object}  account   Provider account (only available on sign in)\n         * @param  {object}  profile   Provider profile (only available on sign in)\n         * @param  {boolean} isNewUser True if new user (only available on sign in)\n         * @return {object}            JSON Web Token that will be saved\n         */ jwt: async (token, user, account, profile, isNewUser)=>{\n                    // Add access_token to the token right after signin\n                    if (account?.accessToken) {\n                        token.accessToken = account.accessToken;\n                    }\n                    return token;\n                }\n            }\n        }), \n    ],\n    session: {\n        jwt: true,\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWdDO0FBQ1c7QUFFM0MsTUFBTUUsT0FBTyxHQUFHO0lBQ2RDLFNBQVMsRUFBRTtRQUNURixzRUFBcUIsQ0FBQztZQUNwQkksSUFBSSxFQUFFLGFBQWE7WUFDbkJDLFdBQVcsRUFBRTtnQkFDWEMsUUFBUSxFQUFFO29CQUFFQyxLQUFLLEVBQUUsVUFBVTtvQkFBRUMsSUFBSSxFQUFFLE1BQU07aUJBQUU7Z0JBQzdDQyxRQUFRLEVBQUU7b0JBQUVGLEtBQUssRUFBRSxVQUFVO29CQUFFQyxJQUFJLEVBQUUsVUFBVTtpQkFBRTthQUNsRDtZQUNERSxTQUFTLEVBQUUsT0FBT0wsV0FBVyxHQUFLO2dCQUNoQyxNQUFNTSxPQUFPLEdBQUdDLFNBQVMsQ0FBQ1AsV0FBVyxDQUFDQyxRQUFRLENBQUM7Z0JBQy9DLE1BQU1PLGFBQWEsR0FBR0QsU0FBUyxDQUFDUCxXQUFXLENBQUNJLFFBQVEsQ0FBQztnQkFFckQsTUFBTUssR0FBRyxHQUFHLE1BQU1DLEtBQUssQ0FDckJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxZQUFZLEdBQ3RCLFVBQVUsR0FDVlAsT0FBTyxHQUNQLFlBQVksR0FDWkUsYUFBYSxDQUNoQjtnQkFDRCxNQUFNTSxZQUFZLEdBQUcsTUFBTUwsR0FBRyxDQUFDTSxJQUFJLEVBQUU7Z0JBRXJDLElBQUlELFlBQVksQ0FBQ0UsU0FBUyxFQUFFO29CQUMxQixNQUFNQyxJQUFJLEdBQUc7d0JBQ1hsQixJQUFJLEVBQUVlLFlBQVksQ0FBQ0UsU0FBUzt3QkFDNUJFLEtBQUssRUFBRUosWUFBWSxDQUFDSyxTQUFTO3dCQUM3QkMsS0FBSyxFQUFFTixZQUFZLENBQUNSLE9BQU87cUJBQzVCO29CQUNELGtFQUFrRTtvQkFDbEUsT0FBT2UsT0FBTyxDQUFDQyxPQUFPLENBQUNMLElBQUksQ0FBQztpQkFDN0IsTUFBTTtvQkFDTE0sT0FBTyxDQUFDQyxLQUFLLENBQUNWLFlBQVksQ0FBQ1csT0FBTyxDQUFDO29CQUVuQyxvRUFBb0U7b0JBQ3BFLE9BQU9KLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDNUIsaUVBQWlFO2dCQUNqRSw4RUFBOEU7Z0JBQzlFLG9FQUFvRTtpQkFDckU7YUFDRjtZQUNESSxTQUFTLEVBQUU7Z0JBQ1Q7Ozs7Ozs7V0FPRyxDQUNIQyxNQUFNLEVBQUUsT0FBT1YsSUFBSSxFQUFFVyxPQUFPLEVBQUVDLE9BQU8sR0FBSztvQkFDeEMsTUFBTUMsaUJBQWlCLEdBQUcsSUFBSTtvQkFDOUIsSUFBSUEsaUJBQWlCLEVBQUU7d0JBQ3JCLE9BQU8sT0FBTztxQkFDZixNQUFNO3dCQUNMLE9BQU8sa0NBQWtDO3FCQUMxQztpQkFDRjtnQkFDRDs7OztXQUlHLENBQ0hDLFFBQVEsRUFBRSxPQUFPQyxHQUFHLEVBQUVDLE9BQU8sR0FBSztvQkFDaEMsT0FBT0QsR0FBRyxDQUFDRSxVQUFVLENBQUNELE9BQU8sQ0FBQyxHQUFHRCxHQUFHLEdBQUdDLE9BQU87aUJBQy9DO2dCQUNEOzs7OztXQUtHLENBQ0hFLE9BQU8sRUFBRSxPQUFPQSxPQUFPLEVBQUVDLEtBQUssR0FBSztvQkFDakMsaUVBQWlFO29CQUNqRUQsT0FBTyxDQUFDRSxXQUFXLEdBQUdELEtBQUssQ0FBQ0MsV0FBVztvQkFDdkMsT0FBT0YsT0FBTztpQkFDZjtnQkFDRDs7Ozs7OztXQU9HLENBQ0hHLEdBQUcsRUFBRSxPQUFPRixLQUFLLEVBQUVuQixJQUFJLEVBQUVXLE9BQU8sRUFBRUMsT0FBTyxFQUFFVSxTQUFTLEdBQUs7b0JBQ3ZELG1EQUFtRDtvQkFDbkQsSUFBSVgsT0FBTyxFQUFFUyxXQUFXLEVBQUU7d0JBQ3hCRCxLQUFLLENBQUNDLFdBQVcsR0FBR1QsT0FBTyxDQUFDUyxXQUFXO3FCQUN4QztvQkFDRCxPQUFPRCxLQUFLO2lCQUNiO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7SUFDREQsT0FBTyxFQUFFO1FBQ1BHLEdBQUcsRUFBRSxJQUFJO1FBQ1RFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ3pCQyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0tBQ3hCO0NBQ0Y7QUFFRCxpRUFBZSxDQUFDQyxHQUFHLEVBQUVqQyxHQUFHLEdBQUtmLGdEQUFRLENBQUNnRCxHQUFHLEVBQUVqQyxHQUFHLEVBQUViLE9BQU8sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3F1aXotZnJvbnQvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzUyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IFByb3ZpZGVycyBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVyc1wiXG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIFByb3ZpZGVycy5DcmVkZW50aWFscyh7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICB1c2VybmFtZTogeyBsYWJlbDogXCJVc2VybmFtZVwiLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhdXRob3JpemU6IGFzeW5jIChjcmVkZW50aWFscykgPT4ge1xuICAgICAgICBjb25zdCB1c2VyX2lkID0gZW5jb2RlVVJJKGNyZWRlbnRpYWxzLnVzZXJuYW1lKVxuICAgICAgICBjb25zdCB1c2VyX3Bhc3N3b3JkID0gZW5jb2RlVVJJKGNyZWRlbnRpYWxzLnBhc3N3b3JkKVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgIHByb2Nlc3MuZW52LlJFU1RfQVBJX1VSTCArXG4gICAgICAgICAgICBcIi9sb2dpbnMvXCIgK1xuICAgICAgICAgICAgdXNlcl9pZCArXG4gICAgICAgICAgICBcIj9wYXNzd29yZD1cIiArXG4gICAgICAgICAgICB1c2VyX3Bhc3N3b3JkXG4gICAgICAgIClcbiAgICAgICAgY29uc3QgdXNlcl9wcm9maWxlID0gYXdhaXQgcmVzLmpzb24oKVxuXG4gICAgICAgIGlmICh1c2VyX3Byb2ZpbGUudXNlcl9uYW1lKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgICAgIG5hbWU6IHVzZXJfcHJvZmlsZS51c2VyX25hbWUsXG4gICAgICAgICAgICBlbWFpbDogdXNlcl9wcm9maWxlLnVzZXJfdHlwZSxcbiAgICAgICAgICAgIGltYWdlOiB1c2VyX3Byb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQW55IG9iamVjdCByZXR1cm5lZCB3aWxsIGJlIHNhdmVkIGluIGB1c2VyYCBwcm9wZXJ0eSBvZiB0aGUgSldUXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1c2VyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IodXNlcl9wcm9maWxlLm1lc3NhZ2UpXG5cbiAgICAgICAgICAvLyBJZiB5b3UgcmV0dXJuIG51bGwgb3IgZmFsc2UgdGhlbiB0aGUgY3JlZGVudGlhbHMgd2lsbCBiZSByZWplY3RlZFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbClcbiAgICAgICAgICAvLyBZb3UgY2FuIGFsc28gUmVqZWN0IHRoaXMgY2FsbGJhY2sgd2l0aCBhbiBFcnJvciBvciB3aXRoIGEgVVJMOlxuICAgICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2Vycm9yIG1lc3NhZ2UnKSkgLy8gUmVkaXJlY3QgdG8gZXJyb3IgcGFnZVxuICAgICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlamVjdChcIi9lcnJvci9pbnZhbGlkX3VzZXJcIikgLy8gUmVkaXJlY3QgdG8gYSBVUkxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSB1c2VyICAgICBVc2VyIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGFjY291bnQgIFByb3ZpZGVyIGFjY291bnRcbiAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSBwcm9maWxlICBQcm92aWRlciBwcm9maWxlXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfSAgUmV0dXJuIGB0cnVlYCB0byBhbGxvdyBzaWduIGluXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuIGBmYWxzZWAgdG8gZGVueSBhY2Nlc3NcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm4gYHN0cmluZ2AgdG8gcmVkaXJlY3QgdG8gKGVnLjogXCIvdW5hdXRob3JpemVkXCIpXG4gICAgICAgICAqL1xuICAgICAgICBzaWduSW46IGFzeW5jICh1c2VyLCBhY2NvdW50LCBwcm9maWxlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNBbGxvd2VkVG9TaWduSW4gPSB0cnVlXG4gICAgICAgICAgaWYgKGlzQWxsb3dlZFRvU2lnbkluKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIvdXNlclwiXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIi9ndWVzdC9zaWduaW4/ZXJyb3I9dW5hdXRob3JpemVkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgIFVSTCBwcm92aWRlZCBhcyBjYWxsYmFjayBVUkwgYnkgdGhlIGNsaWVudFxuICAgICAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2VVcmwgIERlZmF1bHQgYmFzZSBVUkwgb2Ygc2l0ZSAoY2FuIGJlIHVzZWQgYXMgZmFsbGJhY2spXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgVVJMIHRoZSBjbGllbnQgd2lsbCBiZSByZWRpcmVjdCB0b1xuICAgICAgICAgKi9cbiAgICAgICAgcmVkaXJlY3Q6IGFzeW5jICh1cmwsIGJhc2VVcmwpID0+IHtcbiAgICAgICAgICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgoYmFzZVVybCkgPyB1cmwgOiBiYXNlVXJsXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHNlc3Npb24gICAgICBTZXNzaW9uIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHRva2VuICAgICAgICBVc2VyIG9iamVjdCAgICAoaWYgdXNpbmcgZGF0YWJhc2Ugc2Vzc2lvbnMpXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04gV2ViIFRva2VuIChpZiBub3QgdXNpbmcgZGF0YWJhc2Ugc2Vzc2lvbnMpXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgICAgIFNlc3Npb24gdGhhdCB3aWxsIGJlIHJldHVybmVkIHRvIHRoZSBjbGllbnRcbiAgICAgICAgICovXG4gICAgICAgIHNlc3Npb246IGFzeW5jIChzZXNzaW9uLCB0b2tlbikgPT4ge1xuICAgICAgICAgIC8vIEFkZCBwcm9wZXJ0eSB0byBzZXNzaW9uLCBsaWtlIGFuIGFjY2Vzc190b2tlbiBmcm9tIGEgcHJvdmlkZXIuXG4gICAgICAgICAgc2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuXG4gICAgICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSAge29iamVjdH0gIHRva2VuICAgICBEZWNyeXB0ZWQgSlNPTiBXZWIgVG9rZW5cbiAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSAgdXNlciAgICAgIFVzZXIgb2JqZWN0ICAgICAgKG9ubHkgYXZhaWxhYmxlIG9uIHNpZ24gaW4pXG4gICAgICAgICAqIEBwYXJhbSAge29iamVjdH0gIGFjY291bnQgICBQcm92aWRlciBhY2NvdW50IChvbmx5IGF2YWlsYWJsZSBvbiBzaWduIGluKVxuICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICBwcm9maWxlICAgUHJvdmlkZXIgcHJvZmlsZSAob25seSBhdmFpbGFibGUgb24gc2lnbiBpbilcbiAgICAgICAgICogQHBhcmFtICB7Ym9vbGVhbn0gaXNOZXdVc2VyIFRydWUgaWYgbmV3IHVzZXIgKG9ubHkgYXZhaWxhYmxlIG9uIHNpZ24gaW4pXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgICBKU09OIFdlYiBUb2tlbiB0aGF0IHdpbGwgYmUgc2F2ZWRcbiAgICAgICAgICovXG4gICAgICAgIGp3dDogYXN5bmMgKHRva2VuLCB1c2VyLCBhY2NvdW50LCBwcm9maWxlLCBpc05ld1VzZXIpID0+IHtcbiAgICAgICAgICAvLyBBZGQgYWNjZXNzX3Rva2VuIHRvIHRoZSB0b2tlbiByaWdodCBhZnRlciBzaWduaW5cbiAgICAgICAgICBpZiAoYWNjb3VudD8uYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NUb2tlblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9rZW5cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBqd3Q6IHRydWUsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICAgIHVwZGF0ZUFnZTogMjQgKiA2MCAqIDYwLCAvLyAyNCBob3Vyc1xuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMpID0+IE5leHRBdXRoKHJlcSwgcmVzLCBvcHRpb25zKVxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiUHJvdmlkZXJzIiwib3B0aW9ucyIsInByb3ZpZGVycyIsIkNyZWRlbnRpYWxzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXJfaWQiLCJlbmNvZGVVUkkiLCJ1c2VyX3Bhc3N3b3JkIiwicmVzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiUkVTVF9BUElfVVJMIiwidXNlcl9wcm9maWxlIiwianNvbiIsInVzZXJfbmFtZSIsInVzZXIiLCJlbWFpbCIsInVzZXJfdHlwZSIsImltYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiY2FsbGJhY2tzIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJpc0FsbG93ZWRUb1NpZ25JbiIsInJlZGlyZWN0IiwidXJsIiwiYmFzZVVybCIsInN0YXJ0c1dpdGgiLCJzZXNzaW9uIiwidG9rZW4iLCJhY2Nlc3NUb2tlbiIsImp3dCIsImlzTmV3VXNlciIsIm1heEFnZSIsInVwZGF0ZUFnZSIsInJlcSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();