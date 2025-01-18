export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

if (!RECAPTCHA_SITE_KEY) {
  console.warn('Missing RECAPTCHA_SITE_KEY environment variable')
} 