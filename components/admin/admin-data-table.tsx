"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
}

interface AdminDataTableProps<T> {
  title: string
  description: string
  columns: Column<T>[]
  data: T[]
  searchField: keyof T
  onAdd?: () => void
  formContent?: React.ReactNode
  getRowId: (item: T) => string
}

export function AdminDataTable<T>({
  title,
  description,
  columns,
  data,
  searchField,
  formContent,
  getRowId,
}: AdminDataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const filteredData = data.filter((item) => {
    const value = String(item[searchField]).toLowerCase()
    return value.includes(search.toLowerCase())
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">
                Adicionar {title.slice(0, -1)}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo. (Demonstracao - dados nao serao persistidos)
              </DialogDescription>
            </DialogHeader>
            {formContent || (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Formulario de demonstracao - os dados sao estaticos.
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="w-24 text-right">Accoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={getRowId(item)} className="hover:bg-muted/30">
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary"
                        aria-label="Editar"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <AlertDialog
                        open={deleteTarget === getRowId(item)}
                        onOpenChange={(open) =>
                          setDeleteTarget(open ? getRowId(item) : null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar eliminacao
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta accao nao pode ser revertida. (Demonstracao -
                              dados nao serao eliminados)
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => setDeleteTarget(null)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        A mostrar {filteredData.length} de {data.length} registos
      </p>
    </div>
  )
}
