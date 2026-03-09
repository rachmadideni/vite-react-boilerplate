import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@store/auth.store'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/card'
import { http } from '@lib/http'

// Define validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { formatMessage } = useIntl()
  const { setUser, setToken } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // Call the login API endpoint (intercepted by MSW)
      const response = await http.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      const { token, user } = response.data

      setToken(token)
      setUser(user)
      navigate(from, { replace: true })
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="mb-2 text-4xl">⚡</div>
        <CardTitle className="text-2xl">{formatMessage({ id: 'auth.login.title' })}</CardTitle>
        <CardDescription>{formatMessage({ id: 'auth.login.subtitle' })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit(onSubmit)(e)
        }} className="space-y-4">
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
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {formatMessage({ id: 'auth.login.password' })}
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            {formatMessage({ id: 'auth.login.submit' })}
          </Button>
        </form>
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
