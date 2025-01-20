import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, captchaToken } = body

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    })

    const recaptchaData = await recaptchaResponse.json()
    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'Invalid captcha' },
        { status: 400 }
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    const { error } = await supabase
      .from('recruiter_contacts')
      .insert([{ name, email, subject, message }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Failed to save contact' },
      { status: 500 }
    )
  }
} 