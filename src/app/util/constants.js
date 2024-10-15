const url = "http://127.0.0.1:8080";

const Token = {
  accessToken: "accessToken",
  sessionToken: "sessionToken",
};

const CustomHeaders = {
    trustflowSession: "trustflow_session"
}

const APIPaths = {
  login: `${url}/login`,
  logout: `${url}/logout`,
  register: `${url}/register`,
  allTasks: `${url}/tasks`,
  userDetails: `${url}/user`,
  userUpdate: `${url}/user/update`,
  userDelete: `${url}/user/delete`,
};

export { APIPaths, Token, CustomHeaders };
