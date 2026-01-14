import type { CSVElements } from "@/types/types";

export const findSystemById = (id: string, elements: CSVElements[]) => {
    if(id=="" || id==undefined) return "";
    return elements.find((element) => element.id === id)?.name || id;
}

/**
 * Construye la ruta completa de un elemento.
 * @param id - ID del elemento.
 * @param elements - Lista de elementos.
 * @returns {string} - Ruta completa del elemento.
 */
export const buildFullPath = (id:string, elements: CSVElements[]):string => {
    const item = elements.find(i => i.id === id)

    if(!item) return id

    if(!item.parent || item.parent === "") return item.id

    const parentPath = buildFullPath(item.parent, elements)

    return `${parentPath}.${item.id}`
}