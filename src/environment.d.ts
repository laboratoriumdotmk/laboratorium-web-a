declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      CONTACT_EMAIL?: string
      S3_ENDPOINT?: string
      S3_BUCKET?: string
      S3_ACCESS_KEY_ID?: string
      S3_SECRET_ACCESS_KEY?: string
      S3_REGION?: string
      RESEND_API_KEY?: string
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string
    }
  }
}

export {}
