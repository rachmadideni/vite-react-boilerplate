import { useIntl } from 'react-intl'
import messages from '../messages'

interface DashboardStatsProps {
  className?: string
}

export function DashboardStats({ className }: DashboardStatsProps) {
  const intl = useIntl()

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4">
        {intl.formatMessage(messages.statsTitle)}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">150</p>
          <p className="text-sm text-gray-600">Users</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">42</p>
          <p className="text-sm text-gray-600">Projects</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">98%</p>
          <p className="text-sm text-gray-600">Success Rate</p>
        </div>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {intl.formatMessage(messages.viewDetails)}
      </button>
    </div>
  )
}
