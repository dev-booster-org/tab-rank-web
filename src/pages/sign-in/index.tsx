import { Card, CardContent, CardHeader, CardTitle } from '@/components'

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="w-4/5">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <span>Hello</span>
        </CardContent>
      </Card>
    </div>
  )
}
