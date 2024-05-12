import { Badge } from "@/components/ui/badge"
import { CardContent, Card } from "@/components/ui/card"
import { FC } from "react"

type TeamCardProps = {
  id: string
  team_name: string
  wins: number
  losses: number
  win_loss_ratio: number
  home_city: string
  home_arena: string
  championships_amount: number
}

export const TeamsCard: FC<TeamCardProps> = (props) => {
  return (
    <Card className="w-full max-w-md">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          alt="Team background"
          className="h-full w-full object-cover object-center"
          height="192"
          src="/placeholder.svg"
          style={{
            aspectRatio: "384/192",
            objectFit: "cover",
          }}
          width="384"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{props.team_name}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The Golden State Warriors are a professional basketball team based in San Francisco, California. They are
              members of the Western Conference&apos;s Pacific Division in the National Basketball Association (NBA).
            </p>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{props.championships_amount} NBA Championships</span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <Badge className="px-3 py-1 text-sm" variant="outline">
              Playoff Bound
            </Badge>
            <div className="text-right">
              <p className="text-2xl font-bold">{props.wins}-{props.losses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Win-Loss Record</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
