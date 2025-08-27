// app.js
const msalConfig = {
  auth: {
    clientId: azureConfig.clientId,
    authority: `https://login.microsoftonline.com/${azureConfig.tenantId}`,
    redirectUri: window.location.origin
  }
};
const msalInstance = new msal.PublicClientApplication(msalConfig);
function login() {
  const loginRequest = { scopes: ["User.Read"] };
  msalInstance.loginPopup(loginRequest)
    .then(response => {
      console.log("Logged in:", response);
      document.getElementById("profileCircle").innerText =
        response.account.username[0].toUpperCase();
    })
    .catch(error => console.error(error));
}
