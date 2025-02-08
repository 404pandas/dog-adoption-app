// ─── LOGIN ────────────────────────────────────────
// Endpoint: POST /auth/login
// Description: Authenticates a user and returns a session token.

// Body Parameters:
// - name  (string)  → The user’s name
// - email (string)  → The user’s email

// Example Request Body:
// {
//     "name": "John Doe",
//     "email": "john@example.com"
// }

// Response:
// - Status: 200 OK
// - Headers:
//   - Set-Cookie: fetch-access-token (Expires in 1 hour)

// ─── LOGOUT ───────────────────────────────────────
// Endpoint: POST /auth/logout
// Description: Ends the user session and invalidates the auth cookie.

// Example Request:
// (No body required)

// Response:
// - Status: 200 OK
// - Effect: The `fetch-access-token` cookie will be invalidated.
