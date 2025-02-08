// -      login   -
// POST /auth/login
// Body Parameters
// name - the user’s name
// email - the user’s email
// Example

// // API Request Function
// ...
// body: {
//     name: string,
//     email: string
// }
// ...
// Response
// 200 OK

// An auth cookie, fetch-access-token, will be included in the response headers. This will expire in 1 hour.

// -      logout   -
// POST /auth/logout
// Hit this endpoint to end a user’s session. This will invalidate the auth cookie.
