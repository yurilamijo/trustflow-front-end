var secretKey =
  "d9c2641b4f0308c5dd19252b0cccf0a17d98708eaba6758bb500969086be43a6f2e143c4726b387ed5966724d07ebc44753fdfa08d207f000783ac433849111a92ecaacb3c3370ddcfe7fd7cc94ac4f572333bd96b0397295d52f92f112d969e410ca84e2871520ecafe235bb53339374ad4405a470679a8b084212ba3afc238cba0d8d8ed3afb67ac371008a148c5cfd52446ad4358ac48f25869d5e3193576a2b6a8cdcb34125f58a0b990aed3fd00eb6e444740304b10c9a861a3e1753f0de215dd5de127b34adb9519bba1ab354e15cdf9002a52cbfc8140c974a9232da3cb831dc5eb25ca70c363b5fd7f3c031c04716e541f41c8a6a44e2f257d1dadec";

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

export { getJwtToken, decodeJwtToken, getUserIdFromJwtToken, getUserRoleFromJwtToken };
