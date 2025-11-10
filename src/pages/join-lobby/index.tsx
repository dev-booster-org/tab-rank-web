import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components'

const formSchema = z.object({
  joinCode: z
    .string({ message: 'Digite o código de entrada' })
    .min(7, { message: 'O código de entrada deve ter 7 caracteres' })
    .max(7, { message: 'O código de entrada deve ter 7 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export function JoinLobby() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joinCode: '',
    },
  })

  const onSubmit = useCallback((data: FormSchema) => {
    console.log(data)
  }, [])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Entrar em um Lobby</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="joinCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Entrada</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="ABC-123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={false}>
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
