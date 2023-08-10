import * as Logger from "../utils/logger.js";

export const getLogs = async (req, res) => {
  try {
    const result = Logger.readLog();
    response.set("Content-Type", "text/plain");
    return response.send(result);
  } catch (e) {
    return response.sendStatus(500);
  }
};
