import { useCallback } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { Crown } from 'lucide-react'
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
import { useCreateUser } from '@/modules/user/hooks/use-create-user'
import { toast } from 'sonner'

const formSchema = z.object({
  nickName: z
    .string()
    .min(4, { message: 'Nickname deve ter pelo menos 4 caracteres.' })
    .max(20, { message: 'Nickname deve ter no máximo 20 caracteres.' }),
  email: z.email({ message: 'Email inválido.' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
    .max(32, { message: 'Senha deve ter no máximo 32 caracteres.' }),
})

type FormSchema = z.infer<typeof formSchema>

export function SignUp() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickName: '',
      email: '',
      password: '',
    },
  })
  const {
    loading,
    handlers: { handleCreateUser },
  } = useCreateUser()
  const navigate = useNavigate()

  const onSubmit = useCallback(
    (data: FormSchema) => {
      handleCreateUser({
        params: data,
        onSuccess: () => {
          navigate('/')
          toast.success('Conta criada com sucesso!')
        },
      })
    },
    [handleCreateUser, navigate],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="w-4/5">
        <CardHeader className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-1 mx-auto">
            <Crown />
            <span className="text-2xl font-bold">tabRank</span>
          </div>
          <CardTitle>Crie sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="nickname" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este será seu nome de usuário público.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
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
              <Button type="submit" className="w-full" disabled={loading}>
                Criar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground w-full text-center">
            Já possui uma conta?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
