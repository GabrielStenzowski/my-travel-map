'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      alert('Preencha todos os campos!')
      return
    }
    console.log('Login:', { email, password, rememberMe })
    router.push('protected-routes/home-page')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Bem-vindo de volta! 👋
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Faça login para continuar
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label htmlFor="rememberMe">Lembrar-me</Label>
              </div>
              <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Esqueceu a senha?
              </button>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Entrar
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Ainda não tem uma conta?{' '}
              <button
                className="text-blue-600 hover:underline dark:text-blue-400"
                onClick={() => router.push('/register')}
              >
                Registre-se
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
