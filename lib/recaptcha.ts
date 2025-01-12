export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfUlrUqAAAAACQoDHFUe5obu8EBukOjfvhX6MoK'

if (!RECAPTCHA_SITE_KEY) {
  throw new Error('Missing RECAPTCHA_SITE_KEY environment variable')
} 