import {
  SSMClient,
  GetParametersCommand,
  GetParametersByPathCommand,
  GetParameterCommand,
} from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({
  region: process.env.ENVIRONMENT_REGION,
});

const getAllParameters = async (params) => {
  try {
    const command = new GetParametersCommand({
      WithDecryption: false,
      Names: params,
    });

    const response = await ssmClient.send(command);

    return response.Parameters;
  } catch (error) {
    throw new Error(error && error.message ? error.message : "Unknown error.", {
      type: error && error.__type,
      message: error && error.message ? error.message : "Unknown error.",
    });
  }
};

export default { getAllParameters };
