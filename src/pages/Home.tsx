import { useIntl } from 'react-intl'
import { useAuthStore } from '@store/auth.store'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'

export default function HomePage() {
  const { formatMessage } = useIntl()
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {formatMessage({ id: 'dashboard.welcome' }, { name: user?.name ?? 'User' })}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's what's happening with your project today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Total Users', value: '2,340', change: '+12%' },
          { title: 'Revenue', value: '$45,231', change: '+8.2%' },
          { title: 'Active Now', value: '573', change: '+201' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-green-500">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
