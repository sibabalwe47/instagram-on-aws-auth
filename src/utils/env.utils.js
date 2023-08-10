import fs from "fs";
import os from "os";
import * as Logger from "./logger.js";

const cacheConfigurationParameters = (parameters) => {
  Logger.writeLog({
    parameters: parameters,
  });
  let existingVariables = [];

  Logger.writeLog({
    source: "env_file",
    exists: fs.existsSync("../.env") ? true : false,
  });
  if (fs.existsSync("../.env")) {
    existingVariables = fs
      .readFileSync("../.env", "utf8")
      .split(os.EOL)
      .filter((variable) => variable != "");
  }

  parameters.forEach((param) => {
    const splitParamName = param.Name.trim().split("/");
    const variable = `${splitParamName[2].toUpperCase()}_${splitParamName[3].toUpperCase()}=${
      param.Value
    }`;

    existingVariables.push(variable);
  });

  const newVariables = [...new Set(existingVariables)];

  Logger.writeLog({
    source: "existing variables",
    vars: newVariables,
  });

  //fs.writeFileSync("../.env", newVariables.join(os.EOL));
  fs.writeFile("../.env", newVariables.join(os.EOL).toString(), (err) => {
    if (err) {
      Logger.writeLog({
        source: "Writing .env file",
        error: err,
      });
    } else {
      Logger.writeLog({
        source: "Writing .env file",
        error: err,
      });
    }
  });
};

export default { cacheConfigurationParameters };
