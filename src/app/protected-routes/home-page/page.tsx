'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const router = useRouter()

  const handleLogout = () => {
    console.log('Usuário fez logout')
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        🎉 Bem-vindo ao Dashboard!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Você está logado e pronto para explorar.
      </p>

      <Button onClick={handleLogout} className="mt-6">
        Sair
      </Button>
    </div>
  )
}
