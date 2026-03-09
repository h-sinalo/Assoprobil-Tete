"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail } from "lucide-react"
import Image from "next/image"

import { login as loginAction } from "./actions"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        const result = await loginAction(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
        // Redirect is handled by the action
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Image
                            src="/images/logo.png"
                            alt="ASSOPROBIL"
                            width={80}
                            height={80}
                            className="h-20 w-20 object-contain"
                        />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="font-serif text-2xl font-bold text-primary">Painel Administrativo</CardTitle>
                        <CardDescription aria-label="admin login">Entre com as suas credenciais para gerir o site</CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="admin@assoprobil.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Palavra-passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "A entrar..." : "Entrar"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
