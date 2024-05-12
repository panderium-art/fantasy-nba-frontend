'use client'

import { TeamsCard } from "@/components/teams-card";
import { use, useEffect, useState } from "react";


type Team = {
  id: string;
  team_name: string;
  wins: number;
  losses: number;
  win_loss_ratio: number;
  home_city: string;
  home_arena: string;
  championships_amount: number;
}

export default function TeamsPage({params}: {params: {id: string}}) {
  const [teamData, setTeamData] = useState<Team>();

  useEffect(() => {
    async function getTeamData() {
      const res = await fetch(`http://localhost:3000/api/v1/teams/${params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      const data = await res.json();
    
      return data;
    }

    const fetchData = async () => {
      const result = await getTeamData();
      setTeamData(result);
      console.log(`Team Data: ${JSON.stringify(result)}`);
    };

    fetchData();
  }, [])

  return (
    <main className="flex h-screen w-full m-auto items-start justify-center bg-gray-100 dark:bg-gray-950">
      <div className="flex flex-wrap justify-center gap-5">
        {
          teamData && <TeamsCard key={teamData.id} {...teamData} />
        }
      </div>
    </main>
  )
}