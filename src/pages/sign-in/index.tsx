import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components'
import { useCallback } from 'react'

const formSchema = z.object({
  identifier: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
})

type FormSchema = z.infer<typeof formSchema>

export function SignIn() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = useCallback((data: FormSchema) => {
    console.log(data)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="w-4/5">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
