import fs from "fs";
import os from "os";

const cacheConfigurationParameters = (parameters) => {
  const existingVariables = fs
    .readFileSync("../.env", "utf8")
    .split(os.EOL)
    .filter((variable) => variable != "");

  parameters.forEach((param) => {
    const splitParamName = param.Name.trim().split("/");
    const variable = `${splitParamName[2].toUpperCase()}_${splitParamName[3].toUpperCase()}=${
      param.Value
    }`;

    existingVariables.push(variable);
  });

  const newVariables = [...new Set(existingVariables)];

  fs.writeFileSync("../.env", newVariables.join(os.EOL));
};

export default { cacheConfigurationParameters };
