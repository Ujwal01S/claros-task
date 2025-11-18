import Z from "zod";

const envSchema = Z.object({
  API_URL: Z.string().nonempty().default("https://api.escuelajs.co/api/v1/"),
});

const validateEnv = () => {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.log({ error: error });
    throw new Error("Enviroment validation failed");
  }
};

const env = validateEnv();

export const config = {
  API_URL: env.API_URL,
};
