'use client'

import { useState, ChangeEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ReCAPTCHA from 'react-google-recaptcha'
import { useToast } from '@/components/ui/use-toast'
import { RECAPTCHA_SITE_KEY } from '@/lib/recaptcha'

interface RecruiterContactProps {
  isOpen: boolean
  onClose: () => void
}

export function RecruiterContact({ isOpen, onClose }: RecruiterContactProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: (value: string) => void) => {
    setter(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken) {
      toast({
        title: 'Error',
        description: 'Please complete the CAPTCHA',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/recruiter-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          captchaToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      toast({
        title: 'Success',
        description: 'Your message has been sent successfully!',
      })
      onClose()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border border-white/20 backdrop-blur-lg text-white p-6 max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">
            Contact Me
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              required
              value={name}
              onChange={(e) => handleInputChange(e, setName)}
              placeholder="Your name"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              placeholder="Your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input
              required
              value={subject}
              onChange={(e) => handleInputChange(e, setSubject)}
              placeholder="Message subject"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              required
              value={message}
              onChange={(e) => handleInputChange(e, setMessage)}
              placeholder="Your message"
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex justify-center my-4">
            {RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            ) : (
              <div className="text-red-400 text-sm">
                reCAPTCHA not configured
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="bg-transparent border border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 