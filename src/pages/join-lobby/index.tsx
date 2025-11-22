import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useNavigate } from 'react-router'
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

import { useJoinLobby } from '@/modules/lobby/hooks/use-join-lobby'
import { toast } from 'sonner'

const formSchema = z.object({
  joinCode: z
    .string({ message: 'Digite o código de entrada' })
    .min(6, { message: 'O código de entrada deve ter 6 caracteres' })
    .max(6, { message: 'O código de entrada deve ter 6 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export function JoinLobby() {
  const navigate = useNavigate()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joinCode: '',
    },
  })

  const {
    handlers: { handleJoinLobby },
  } = useJoinLobby()

  const onSubmit = useCallback(
    (data: FormSchema) => {
      handleJoinLobby({
        params: {
          joinCode: data.joinCode,
        },
        onSuccess: (data) => {
          navigate(`/auth/lobby/${data.id}`)
          toast.success('Agora você faz parte do lobby!')
        },
      })
    },
    [handleJoinLobby, navigate],
  )

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
                      <Input type="text" placeholder="ABC123" {...field} />
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
