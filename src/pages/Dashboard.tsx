import { useIntl } from 'react-intl'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/card'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import http from '@lib/http'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=6')
      return data
    },
  })
}

export default function DashboardPage() {
  const { formatMessage } = useIntl()
  const { data: posts, isLoading, isError } = usePosts()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p className="text-destructive">{formatMessage({ id: 'common.error' })}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{formatMessage({ id: 'dashboard.title' })}</h1>
        <p className="mt-1 text-muted-foreground">Sample data fetched with React Query + Axios</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1 text-base capitalize">{post.title}</CardTitle>
              <CardDescription>Post #{post.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
