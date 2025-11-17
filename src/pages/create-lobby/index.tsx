import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useListGames } from '@modules/game/hooks/use-list-games'
import { useCreateLobby } from '@/modules/lobby/hooks/use-create-lobby'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'

const formSchema = z.object({
  gameId: z.uuid({ message: 'Selecione um jogo' }),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateLobby() {
  const navigate = useNavigate()
  const {
    games,
    handlers: { handleListGames },
  } = useListGames()
  const {
    handlers: { handleCreateLobby },
  } = useCreateLobby()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameId: '',
    },
  })

  const onSubmit = useCallback(
    ({ gameId }: FormSchema) => {
      handleCreateLobby({
        params: { gameId },
        onSuccess: ({ id }) => {
          navigate(`/auth/lobby/${id}`)
          toast.success('Lobby criado com sucesso!')
        },
      })
    },
    [handleCreateLobby, navigate],
  )

  useEffect(() => {
    handleListGames({ params: {} })
  }, [handleListGames])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Criar Lobby</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Jogo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                          {games.map((game) => {
                            return (
                              <SelectItem key={game.id} value={game.id}>
                                {game.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={false}>
                Criar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
