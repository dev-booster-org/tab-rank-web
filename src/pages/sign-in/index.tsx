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
import { Crown } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/modules/auth/contexts/auth-provider'

const formSchema = z.object({
  identifier: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
})

type FormSchema = z.infer<typeof formSchema>

export function SignIn() {
  const {
    handlers: { handleSignIn },
  } = useAuth()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const navigate = useNavigate()

  const onSubmit = useCallback(
    (data: FormSchema) => {
      handleSignIn({ params: data, onSuccess: () => navigate('/auth/home') })
    },
    [handleSignIn, navigate],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="w-4/5 lg:w-3/12">
        <CardHeader className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-1 mx-auto">
            <Crown />
            <span className="text-2xl font-bold">tabRank</span>
          </div>
          <CardTitle>Acesse sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname/Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nickame/email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Você pode usar seu nickname ou email para entrar.
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground w-full text-center">
            Não possui uma conta?{' '}
            <Link
              to="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Criar Conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
