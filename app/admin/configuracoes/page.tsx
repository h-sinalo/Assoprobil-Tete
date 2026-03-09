"use client"

import { Settings, Info, Lock, Globe, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AdminConfiguracoesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                    Configurações
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Gerir as configurações gerais do site ASSOPROBIL Tete
                </p>
            </div>

            {/* Site Info */}
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif text-lg">
                        <Info className="size-4 text-primary" />
                        Informações do Site
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Nome da Associação</label>
                        <Input defaultValue="Associação Provincial de Bilhar de Tete (ASSOPROBIL Tete)" readOnly className="opacity-70" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Email de Contacto</label>
                            <Input defaultValue="info@assoprobil.co.mz" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Telefone</label>
                            <Input defaultValue="+258 84 000 0000" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Morada</label>
                        <Input defaultValue="Cidade de Tete, Província de Tete, Moçambique" />
                    </div>
                    <Button className="w-fit">Guardar Alterações</Button>
                </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif text-lg">
                        <Globe className="size-4 text-primary" />
                        Redes Sociais
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {["Facebook", "Instagram", "YouTube"].map((social) => (
                        <div key={social} className="grid gap-2">
                            <label className="text-sm font-medium">{social}</label>
                            <Input placeholder={`https://www.${social.toLowerCase()}.com/assoprobiltete`} />
                        </div>
                    ))}
                    <Button className="w-fit">Guardar Redes Sociais</Button>
                </CardContent>
            </Card>

            {/* Supabase Info */}
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif text-lg">
                        <Lock className="size-4 text-primary" />
                        Informações Técnicas
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm font-medium text-foreground">Base de Dados Supabase</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Projecto: ASSOPROBIL Tete · Região: EU West (Ireland)
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            URL: https://zrvldtlpfdzvzgkodcrc.supabase.co
                        </p>
                    </div>
                    <Separator />
                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2">
                            <Mail className="size-4 text-secondary" />
                            <p className="text-sm font-medium text-foreground">Mensagens de Contacto</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            As mensagens submetidas através do formulário de contacto são guardadas na
                            base de dados e podem ser consultadas na tabela &quot;contact_messages&quot; do Supabase.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
