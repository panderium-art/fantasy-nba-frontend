'use client'
import { Button } from '@/components/ui/button';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams<{ id: string }>()
  let isAdminRole = false;
  const isTeamPage = params && params.id;

  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

  if(localStorage) {
    const userStringified = localStorage.getItem('user');
    const user = userStringified ? JSON.parse(userStringified) : null;
    isAdminRole = user?.role === 'ADMIN';
  }
  
  return (
    <html lang="en">
      <body className={inter.variable}>
        <header className='h-16 bg-slate-300 px-4 flex justify-end'>
          {
            isAdminRole && (
              <Link href='/teams/admin'>
                <Button>Create team</Button>
              </Link>
            )
          }
          {
            (isAdminRole && isTeamPage) && (
              <Link href={`/teams/admin/${params.id}`}>
                <Button>Edit Team</Button>
              </Link>
            )
          }
        </header>
        {children}
      </body>
    </html>
  )
}