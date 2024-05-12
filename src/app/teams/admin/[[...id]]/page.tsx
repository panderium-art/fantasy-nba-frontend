'use client'

import { TeamForm } from "@/components/team-form";
import { LoginForm } from "@/components/login-form";
import { TeamsCard } from "@/components/teams-card";
import { use, useEffect, useState } from "react";


export type Team = {
  id: string;
  team_name: string;
  wins: number;
  losses: number;
  win_loss_ratio: number;
  home_city: string;
  home_arena: string;
  championships_amount: number;
}

const defautTeamData: Team = {
  id: '',
  team_name: '',
  wins: 0,
  losses: 0,
  win_loss_ratio: 0,
  home_city: '',
  home_arena: '',
  championships_amount: 0
}

export default function TeamsAdminPage({params}: {params: {id: string}}) {

  const [teamData, setTeamData] = useState<Team>(defautTeamData);

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
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id])

  const isEditMode = !!params.id;

  const formValues = {
    teamName: teamData.team_name,
    wins: String(teamData.wins),
    losses: String(teamData.losses),
    homeCity: teamData.home_city,
    homeArena: teamData.home_arena,
    championshipsAmount: String(teamData.championships_amount)
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <div className="relative z-10 px-6 py-8 sm:px-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Create Team</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter your new team&apos;s details</p>
            </div>
            <TeamForm initialFormValues={formValues} isEdit={isEditMode} teamId={params.id} />
          </div>
        </div>
      </div>
    </main>
  )
}