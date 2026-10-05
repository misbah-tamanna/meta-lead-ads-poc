# Meta Lead Ads + React Native PoC

## Setup Instructions
1. Run `npm install` in both the backend and frontend folders.
2. Start the backend with `node index.js`.
3. Update the `SERVER_URL` in `index.tsx` with your local IP address.
4. Start the frontend with `npx expo start`.

## Assumptions Made
* Used Ngrok to expose the local Node.js server to Meta's webhooks, as Meta requires a public HTTPS URL.
* Bypassed local Wi-Fi AP isolation by binding the server to a direct IP to ensure the WebSocket connection between the computer and phone remained stable.
