import { cn } from '@utils/index'

interface LoadingSpinnerProps {
  className?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ className, fullScreen = false }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div
          className={cn(
            'h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent',
            className
          )}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div
        className={cn(
          'h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent',
          className
        )}
      />
    </div>
  )
}
