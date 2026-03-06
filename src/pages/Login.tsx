import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useAuthStore } from '@store/auth.store'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/card'

export default function LoginPage() {
  const { formatMessage } = useIntl()
  const { setUser, setToken } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate API call — replace with real auth
    await new Promise((r) => setTimeout(r, 800))

    setToken('mock-jwt-token')
    setUser({ id: '1', name: 'John Doe', email })
    navigate(from, { replace: true })

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="mb-2 text-4xl">⚡</div>
        <CardTitle className="text-2xl">{formatMessage({ id: 'auth.login.title' })}</CardTitle>
        <CardDescription>{formatMessage({ id: 'auth.login.subtitle' })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {formatMessage({ id: 'auth.login.email' })}
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {formatMessage({ id: 'auth.login.password' })}
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit} isLoading={isLoading}>
          {formatMessage({ id: 'auth.login.submit' })}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {formatMessage({ id: 'auth.login.noAccount' })}{' '}
          <span className="cursor-pointer text-primary hover:underline">
            {formatMessage({ id: 'auth.login.register' })}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
