export type Partner = {
  name: string
  type: "institutional" | "corporate" | "media"
}

export const partners: Partner[] = [
  { name: "Governo Provincial de Tete", type: "institutional" },
  { name: "Federacao Nacional de Bilhar", type: "institutional" },
  { name: "Direccao Provincial de Desporto", type: "institutional" },
  { name: "Clube Recreativo de Tete", type: "corporate" },
  { name: "Cervejas de Mocambique", type: "corporate" },
  { name: "Banco Comercial de Tete", type: "corporate" },
  { name: "TVM - Televisao de Mocambique", type: "media" },
  { name: "Radio Tete", type: "media" },
]
