function getJwtToken() {
  let token;
  if (localStorage.getItem("accessToken")) {
    token = localStorage.getItem("accessToken");
  }

  return token;
}

function decodeJwtToken() {
    const jwt_decode = require('jwt-decode');
    const token = getJwtToken();
    const decoded = jwt_decode.jwtDecode(token)
    console.log(decoded);

    return decoded;
}

function getUserIdFromJwtToken() {
  const token = decodeJwtToken();
  return token.userId;
}

function getUserRoleFromJwtToken() {
  const token = decodeJwtToken();
  return token.role;
}

export { getJwtToken, getUserIdFromJwtToken, getUserRoleFromJwtToken };
