import type { CSVElements } from "@/types/types";

export const findSystemById = (id: string, elements: CSVElements[]) => {
    if(id=="" || id==undefined) return "";
    return elements.find((element) => element.id === id)?.name || "No encontrado";
}