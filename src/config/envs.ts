import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
  PORT: z.number({ coerce: true }),
  NATS_SERVERS: z.string().transform((val) => val.split(',')),
  JWT_SECRET: z.string(),
});

const env = EnvSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const envs = env.data;
