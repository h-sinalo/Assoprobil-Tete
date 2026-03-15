"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

type FormValues = {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setStatus("loading")
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    })
    if (error) {
      setStatus("error")
    } else {
      setStatus("success")
      reset()
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-10 text-center">
        <CheckCircle className="size-12 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-foreground">
          Mensagem Enviada!
        </h3>
        <p className="text-muted-foreground">
          A sua mensagem foi enviada para info@assoprobiltete.org e responderemos brevemente.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome completo *
          </label>
          <Input
            id="name"
            placeholder="O seu nome"
            {...register("name", { required: "Nome é obrigatório" })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Telefone
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+258 84 000 0000"
          {...register("phone")}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mensagem *
        </label>
        <Textarea
          id="message"
          placeholder="Escreva a sua mensagem aqui…"
          rows={5}
          {...register("message", {
            required: "Mensagem é obrigatória",
            minLength: { value: 10, message: "A mensagem deve ter pelo menos 10 caracteres" },
          })}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          Ocorreu um erro ao enviar a mensagem. Por favor tente novamente.
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "A enviar…" : "Enviar Mensagem"}
      </Button>
    </form>
  )
}
