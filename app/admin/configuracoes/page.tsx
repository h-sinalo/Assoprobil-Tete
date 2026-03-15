"use client"

import { useState, useEffect } from "react"
import { Settings, Info, Lock, Globe, Mail, Plus, Trash2, Tag, Loader2, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdminConfiguracoesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [newCatName, setNewCatName] = useState("")
    const [newCatType, setNewCatType] = useState("news")
    const [saving, setSaving] = useState(false)
    const [savingSettings, setSavingSettings] = useState(false)

    // Geral fields
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    // Social links
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    // Homepage stats
    const [statAnos, setStatAnos] = useState("")
    const [statAtletas, setStatAtletas] = useState("")
    const [statCampeonatos, setStatCampeonatos] = useState("")

    useEffect(() => {
        fetchCategories()
        loadSettings()
    }, [])

    async function loadSettings() {
        const { data } = await supabase.from("site_settings").select("key, value")
        if (data) {
            const map = Object.fromEntries(data.map((r: any) => [r.key, r.value]))
            setEmail(map.email ?? "")
            setPhone(map.phone ?? "")
            setAddress(map.address ?? "")
            setFacebook(map.facebook ?? "")
            setInstagram(map.instagram ?? "")
            setYoutube(map.youtube ?? "")
            setStatAnos(map.stat_anos ?? "5+")
            setStatAtletas(map.stat_atletas ?? "50+")
            setStatCampeonatos(map.stat_campeonatos ?? "10+")
        }
    }

    async function saveGeneralSettings() {
        setSavingSettings(true)
        const entries = [
            { key: "email", value: email },
            { key: "phone", value: phone },
            { key: "address", value: address },
        ]
        const { error } = await supabase.from("site_settings").upsert(entries, { onConflict: "key" })
        setSavingSettings(false)
        if (error) {
            toast.error("Erro ao guardar: " + error.message)
        } else {
            toast.success("Informações guardadas com sucesso!")
        }
    }

    async function saveSocialSettings() {
        setSavingSettings(true)
        const entries = [
            { key: "facebook", value: facebook },
            { key: "instagram", value: instagram },
            { key: "youtube", value: youtube },
        ]
        const { error } = await supabase.from("site_settings").upsert(entries, { onConflict: "key" })
        setSavingSettings(false)
        if (error) {
            toast.error("Erro ao guardar: " + error.message)
        } else {
            toast.success("Redes sociais guardadas com sucesso!")
        }
    }

    async function saveStatsSettings() {
        setSavingSettings(true)
        const entries = [
            { key: "stat_anos", value: statAnos },
            { key: "stat_atletas", value: statAtletas },
            { key: "stat_campeonatos", value: statCampeonatos },
        ]
        const { error } = await supabase.from("site_settings").upsert(entries, { onConflict: "key" })
        setSavingSettings(false)
        if (error) {
            toast.error("Erro ao guardar: " + error.message)
        } else {
            toast.success("Estatísticas guardadas com sucesso!")
        }
    }

    async function fetchCategories() {
        setLoading(true)
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("type", { ascending: true })
            .order("name", { ascending: true })
        if (error) {
            toast.error("Erro ao carregar categorias")
        } else {
            setCategories(data || [])
        }
        setLoading(false)
    }

    async function addCategory() {
        if (!newCatName.trim()) return
        setSaving(true)
        const { error } = await supabase
            .from("categories")
            .insert([{ name: newCatName.trim(), type: newCatType }])

        if (error) {
            if (error.code === "23505") {
                toast.error("Esta categoria já existe para este tipo")
            } else {
                toast.error("Erro ao guardar categoria")
            }
        } else {
            toast.success("Categoria adicionada!")
            setNewCatName("")
            fetchCategories()
        }
        setSaving(false)
    }

    async function deleteCategory(id: string) {
        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id)

        if (error) {
            toast.error("Erro ao eliminar categoria")
        } else {
            toast.success("Categoria eliminada")
            fetchCategories()
        }
    }

    const typeLabels: any = {
        news: "Notícias",
        championship: "Campeonatos",
        social: "Responsabilidade Social",
        gallery: "Galeria"
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                    Configurações
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Gerir as configurações gerais e categorias do site ASSOPROBIL Tete
                </p>
            </div>

            <Tabs defaultValue="geral" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="geral">Geral</TabsTrigger>
                    <TabsTrigger value="categorias">Categorias</TabsTrigger>
                    <TabsTrigger value="tecnico">Técnico</TabsTrigger>
                </TabsList>

                <TabsContent value="geral" className="space-y-6 pt-6">
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
                                    <Input value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Telefone</label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Morada</label>
                                <Input value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <Button className="w-fit" onClick={saveGeneralSettings} disabled={savingSettings}>
                                {savingSettings ? "A guardar…" : "Guardar Alterações"}
                            </Button>
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
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Facebook</label>
                                <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://www.facebook.com/assoprobiltete" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Instagram</label>
                                <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://www.instagram.com/assoprobiltete" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">YouTube</label>
                                <Input value={youtube} onChange={e => setYoutube(e.target.value)} placeholder="https://www.youtube.com/assoprobiltete" />
                            </div>
                            <Button className="w-fit" onClick={saveSocialSettings} disabled={savingSettings}>
                                {savingSettings ? "A guardar…" : "Guardar Redes Sociais"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Homepage Stats */}
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-serif text-lg">
                                <BarChart3 className="size-4 text-primary" />
                                Estatísticas da Página Inicial
                            </CardTitle>
                            <CardDescription>
                                Valores exibidos na secção de destaques do hero da homepage.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Anos de Actividade</label>
                                    <Input
                                        value={statAnos}
                                        onChange={e => setStatAnos(e.target.value)}
                                        placeholder="Ex: 5+"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Atletas Registados</label>
                                    <Input
                                        value={statAtletas}
                                        onChange={e => setStatAtletas(e.target.value)}
                                        placeholder="Ex: 50+"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Campeonatos Realizados</label>
                                    <Input
                                        value={statCampeonatos}
                                        onChange={e => setStatCampeonatos(e.target.value)}
                                        placeholder="Ex: 10+"
                                    />
                                </div>
                            </div>
                            <Button className="w-fit" onClick={saveStatsSettings} disabled={savingSettings}>
                                {savingSettings ? "A guardar…" : "Guardar Estatísticas"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categorias" className="space-y-6 pt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-serif text-lg">
                                <Tag className="size-4 text-primary" />
                                Gestão de Categorias
                            </CardTitle>
                            <CardDescription>
                                Adicione ou remova categorias para as diferentes secções do site.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                <div className="grid flex-1 gap-2">
                                    <label className="text-sm font-medium">Nome da Categoria</label>
                                    <Input
                                        placeholder="Ex: Torneios, Saúde..."
                                        value={newCatName}
                                        onChange={(e) => setNewCatName(e.target.value)}
                                    />
                                </div>
                                <div className="grid w-full gap-2 sm:w-60">
                                    <label className="text-sm font-medium">Secção</label>
                                    <Select value={newCatType} onValueChange={setNewCatType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="news">Notícias</SelectItem>
                                            <SelectItem value="championship">Campeonatos</SelectItem>
                                            <SelectItem value="social">Resp. Social</SelectItem>
                                            <SelectItem value="gallery">Galeria</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={addCategory} disabled={saving || !newCatName} className="gap-2">
                                    {saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                                    Adicionar
                                </Button>
                            </div>

                            <Separator />

                            <div className="overflow-hidden rounded-md border">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left font-medium">Nome</th>
                                            <th className="px-4 py-2 text-left font-medium">Secção</th>
                                            <th className="px-4 py-2 text-right font-medium">Acções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                                                    A carregar categorias...
                                                </td>
                                            </tr>
                                        ) : categories.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                                                    Nenhuma categoria encontrada.
                                                </td>
                                            </tr>
                                        ) : (
                                            categories.map((cat) => (
                                                <tr key={cat.id} className="border-b hover:bg-muted/30">
                                                    <td className="px-4 py-2 font-medium">{cat.name}</td>
                                                    <td className="px-4 py-2">
                                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                            {typeLabels[cat.type]}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                            onClick={() => deleteCategory(cat.id)}
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tecnico" className="space-y-6 pt-6">
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
                                    As mensagens submetidas através do formulário de contacto são enviadas para
                                    info@assoprobiltete.org e guardadas na tabela &quot;contact_messages&quot; do Supabase.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
