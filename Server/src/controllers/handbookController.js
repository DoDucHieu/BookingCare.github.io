import handbookServices from "../services/handbookServices";

let handleCreateHandbook = async (req, res) => {
  let data = req.body;
  if (
    !data ||
    !data.handbookName ||
    !data.handbookImg ||
    !data.contentHTML ||
    !data.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameters required!",
    });
  }
  let response = await handbookServices.createHandbook(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetHandbook = async (req, res) => {
  let handbookId = req.query.handbookId;
  if (!handbookId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing query string parameter!",
    });
  }
  let response = await handbookServices.getHandbook(handbookId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleEditHandbook = async (req, res) => {
  let data = req.body;
  if (
    !data ||
    !data.handbookId ||
    !data.handbookName ||
    !data.handbookImg ||
    !data.contentHTML ||
    !data.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameters required!",
    });
  }
  let response = await handbookServices.editHandbook(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

module.exports = {
  handleCreateHandbook: handleCreateHandbook,
  handleGetHandbook: handleGetHandbook,
  handleEditHandbook: handleEditHandbook,
};
