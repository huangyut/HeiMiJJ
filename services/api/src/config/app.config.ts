export interface ApplicationConfig {
  port: number
  corsOrigins: string[] | true
}

export function getApplicationConfig(): ApplicationConfig {
  const configuredOrigins = process.env.CORS_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return {
    port: Number(process.env.PORT ?? 3000),
    corsOrigins: configuredOrigins?.length ? configuredOrigins : true,
  }
}
