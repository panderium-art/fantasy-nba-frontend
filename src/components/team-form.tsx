"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { FC } from "react"

const formSchema = z.object({
  teamName: z.string({
    message: "Team name is required",
  }),
  wins: z.string().max(82, {
    message: "Wins must not exceed 82.",
  }),
  losses: z.string().max(82, {
    message: "Losses must not exceed 82.",
  }),
  homeCity: z.string({
    message: "Home city is required",
  }),
  homeArena: z.string({
    message: "Home arena is required",
  }),
  championshipsAmount: z.string({
    message: "Championships amount is required",
  })
})

type TeamFormProps = {
  initialFormValues?: z.infer<typeof formSchema>
  isEdit?: boolean
  teamId?: string
}

export const TeamForm: FC<TeamFormProps> = ({initialFormValues, isEdit = false, teamId = ''}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: initialFormValues?.teamName ?? "",
      wins: initialFormValues?.wins ?? "",
      losses: initialFormValues?.losses ?? "",
      homeCity: initialFormValues?.homeCity ?? "",
      homeArena: initialFormValues?.homeArena ?? "",
      championshipsAmount: initialFormValues?.championshipsAmount ?? ""
    },
    values: initialFormValues
  })
      
  async function onSubmitCreate(values: z.infer<typeof formSchema>) {
    const res = await fetch('http://localhost:3000/api/v1/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        team_name: values.teamName,
        wins: Number(values.wins),
        losses: Number(values.losses),
        home_city: values.homeCity,
        home_arena: values.homeArena,
        championships_amount: Number(values.championshipsAmount)
      })
    })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    router.push('/teams');
  }

  async function onSubmitEdit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`http://localhost:3000/api/v1/teams/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        team_name: values.teamName,
        wins: Number(values.wins),
        losses: Number(values.losses),
        home_city: values.homeCity,
        home_arena: values.homeArena,
        championships_amount: Number(values.championshipsAmount)
      })
    })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    router.push('/teams');
  }

  async function onDeleteHandler() {
    const res = await fetch(`http://localhost:3000/api/v1/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      credentials: 'same-origin',
    })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    router.push('/teams');
  }

  const onSubmitHandler = isEdit ? onSubmitEdit : onSubmitCreate;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Team name" {...field} />
              </FormControl>
              <FormDescription>
                Fill in team's name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wins"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wins</FormLabel>
              <FormControl>
                <Input placeholder="Wins" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Fill in amount of wins during the season
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="losses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Losses</FormLabel>
              <FormControl>
                <Input placeholder="Losses" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Fill in amount of losses during the season
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home City</FormLabel>
              <FormControl>
                <Input placeholder="Home City" {...field} />
              </FormControl>
              <FormDescription>
                Fill in home city of the team
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeArena"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Arena</FormLabel>
              <FormControl>
                <Input placeholder="Home Arena" {...field} />
              </FormControl>
              <FormDescription>
                Fill in home arena of the team
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="championshipsAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Championships Amount</FormLabel>
              <FormControl>
                <Input placeholder="Championships Amount" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Fill in amount of championships
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-8">
          <Button type="submit" className="flex-grow">Submit</Button>
          {
            isEdit && (
              <Button
                className="flex-grow"
                variant={"destructive"}
                onClick={onDeleteHandler}
              >
                Delete
              </Button>
            )
          
          }
        </div>
      </form>
    </Form>
  )
}
