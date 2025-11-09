import { Crown, PlusCircle, Waypoints } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'

export function Home() {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <section className="flex gap-4">
        <Card className="flex-1 cursor-pointer">
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <PlusCircle className="h-6 w-6" />
            <CardTitle>Criar lobby</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1 cursor-pointer">
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <Waypoints className="h-6 w-6" />
            <CardTitle>Entrar em um lobby</CardTitle>
          </CardHeader>
        </Card>
      </section>
      <Card className="cursor-pointer">
        <CardHeader className="flex items-center gap-2 justify-center">
          <PlusCircle className="h-6 w-6" />
          <CardTitle>Cadastrar Jogo</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 justify-center">
          <Crown className="h-6 w-6" />
          <CardTitle>Ranking de vitórias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Ranking de Vencedores por jogo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Jogo</TableHead>
                <TableHead>NickName</TableHead>
                <TableHead>Vitórias</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Citadels</TableCell>
                <TableCell>10troi</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DixIt</TableCell>
                <TableCell>fadinha</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coup</TableCell>
                <TableCell>bruno</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Uno</TableCell>
                <TableCell>artimus</TableCell>
                <TableCell>3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
