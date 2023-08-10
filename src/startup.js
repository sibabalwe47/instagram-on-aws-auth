import ssmClient from "./libs/ssm/ssm.js";
import envUtils from "./utils/env.utils.js";
import * as Logger from "./utils/logger.js";

const initialise = async () => {
  try {
    const parameters = await ssmClient.getAllParameters([
      `/${process.env.ENVIRONMENT}/environment/region`,
      `/${process.env.ENVIRONMENT}/userpool/id`,
      `/${process.env.ENVIRONMENT}/userpool_client/id`,
      `/${process.env.ENVIRONMENT}/dynamodb/name`,
      `/${process.env.ENVIRONMENT}/dynamodb/arn`,
    ]);

    envUtils.cacheConfigurationParameters(parameters);
    Logger.writeLog(`Server running on PORT:${process.env.PORT}`);
  } catch (error) {
    Logger.writeLog(error && error.message ? error.message : "Unknown error.");
  }
};

export default { initialise };
