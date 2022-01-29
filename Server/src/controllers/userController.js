import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing your email or password!",
    });
  } else {
    let userData = await userServices.handleUserLogin(email, password);
    res.status(200).json({
      errCode: userData.errCode,
      errMessage: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  }
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      user: {},
    });
  }
  let user = await userServices.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all user success!",
    user: user,
  });
};
let handleCreateNewUser = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing data entry!",
    });
  }

  let response = await userServices.createNewUser(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleEditUser = async (req, res) => {
  let userData = req.body;
  if (!userData.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let result = await userServices.editUser(userData);
  return res.status(200).json({
    errCode: result.errCode,
    errMessage: result.errMessage,
  });
};

let handleDeleteUser = async (req, res) => {
  let userId = req.body.id;
  if (!userId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let result = await userServices.deleteUser(userId);
  return res.status(200).json({
    errCode: result.errCode,
    errMessage: result.errMessage,
  });
};
let handleGetAllCode = async (req, res) => {
  let type = req.query.type;
  if (!type) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let result = await userServices.getAllCode(type);
  return res.status(200).json({
    errCode: result.errCode,
    errMessage: result.errMessage,
    data: result.data,
  });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  handleGetAllCode,
};
