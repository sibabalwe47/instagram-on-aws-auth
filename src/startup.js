import ssmClient from "./libs/ssm/ssm.js";
import envUtils from "./utils/env.utils.js";

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

    console.log(`Server running on PORT:${process.env.PORT}`);
  } catch (error) {
    console.log(error && error.message ? error.message : "Unknown error.");
  }
};

export default { initialise };
