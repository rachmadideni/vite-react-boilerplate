import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/ui/button'

export default function NotFoundPage() {
  const { formatMessage } = useIntl()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-8xl font-bold text-muted-foreground/30">404</h1>
      <h2 className="text-2xl font-semibold">{formatMessage({ id: 'error.notFound' })}</h2>
      <p className="text-muted-foreground">{formatMessage({ id: 'error.notFound.description' })}</p>
      <Button onClick={() => navigate('/')}>Go back home</Button>
    </div>
  )
}
