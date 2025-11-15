import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'

import { useCreateGame } from '@/modules/game/hooks/use-create-game'
import type { GameTypes } from '@/modules/game/types'
import { gameTypeOptions } from '@/modules/game/utils/game-type-options'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  maxPlayers: z.number().min(1, 'Deve ter no mínimo 1 jogador'),
  minPlayers: z.number().min(1, 'Deve ter no mínimo 1 jogador'),
  coverImageUrl: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateGame() {
  const navigate = useNavigate()
  const {
    loading,
    handlers: { handleCreateGame },
  } = useCreateGame()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = useCallback(
    (data: FormSchema) => {
      handleCreateGame({
        params: {
          ...data,
          type: [data.type as GameTypes],
        },
        onSuccess: () => {
          navigate('/auth/game')
          toast.success('Jogo criado com sucesso!')
        },
      })
    },
    [handleCreateGame, navigate],
  )

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Criar Jogo</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                          {gameTypeOptions.map(({ label, value }) => {
                            return (
                              <SelectItem key={value} value={value}>
                                {label}
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
              <FormField
                control={form.control}
                name="minPlayers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. de Jogadores</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mínimo de jogadores"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPlayers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. de Jogadores</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="máximo de jogadores"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
      </Card>
    </div>
  )
}
