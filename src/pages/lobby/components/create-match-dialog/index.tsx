import { useCallback } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Lobby } from '@/modules/lobby/types'
import type { User } from '@/modules/user/types'
import type { Game } from '@/modules/game/types'

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { useCreateMatch } from '@/modules/match/hooks/use-create-match'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const formSchema = z.object({
  duration: z.string().min(1, 'Duração é obrigatória'),
  winnerId: z.string().min(1, 'Vencedor é obrigatório'),
})

type FormSchema = z.infer<typeof formSchema>

interface LobbyWithRelations extends Lobby {
  game: Game
  host: User
  players: User[]
}

interface CreateMatchDialogProps {
  lobby: LobbyWithRelations
  handleCloseModal: () => void
}

export function CreateMatchDialog({
  lobby,
  handleCloseModal,
}: CreateMatchDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const {
    handlers: { handleCreateMatch },
  } = useCreateMatch()

  const onSubmit = useCallback(
    ({ duration, winnerId }: FormSchema) => {
      handleCreateMatch({
        params: {
          lobbyId: lobby.id,
          gameId: lobby.game.id,
          duration: Number(duration),
          winnerId,
          playerIds: [
            lobby.host.id,
            ...lobby.players.map((player) => player.id),
          ],
        },
        onSuccess: () => {
          handleCloseModal()
          toast.success('Partida registrada com sucesso')
        },
      })
    },
    [
      handleCloseModal,
      handleCreateMatch,
      lobby.game.id,
      lobby.host.id,
      lobby.id,
      lobby.players,
    ],
  )

  return (
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Registrar Partida</DialogTitle>
          <DialogClose>
            <Button variant="ghost" size="icon" onClick={handleCloseModal}>
              <X />
            </Button>
          </DialogClose>
        </div>
      </DialogHeader>
      <DialogDescription>
        Esté uma ação temporária, a forma como as partidas são registradas irão
        mudar no futuro
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                  O registro manual é temporário, ele servirá para entendermos a
                  média de tempo de partida de cada jogo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="winnerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Vencedor</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um jogo" />
                    </SelectTrigger>
                    <SelectContent>
                      {[lobby.host, ...lobby.players].map(
                        ({ nickName, id }) => {
                          return (
                            <SelectItem key={id} value={id}>
                              {nickName}
                            </SelectItem>
                          )
                        },
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Registrar Partida
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
