export interface CSVElements {
    
    id: string;
    type: string;
    name:string
    parent:string
    tags:string
    description:string
    doc?:string
    uuid?:string
}

export interface CSVRelations{
    source:string
    target:string
    description:string
    technology:string
    uuid?:string
}