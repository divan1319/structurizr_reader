<template>
  <div class="px-2 py-4">
    <h1 class="text-2xl font-bold text-slate-900">Relaciones</h1>
    <p class="text-slate-900">Aquí se mostrarán las relaciones de los sistemas.</p>
    <DataTable :value="csvRelationsData" ref="dtRelations" paginator :rows="15" :rows-per-page-options="[15, 30, 60, 100]">
        <template #empty>
            <p class="text-center uppercase text-xs">No se han cargado relaciones</p>
        </template>
        <template #header>
            <div class="w-full flex justify-between">
                <RelationsCSV />
                <Button label="Agregar registro" icon="pi pi-plus-circle" />
            </div>
        </template>
        <template #paginatorend>
            <Button icon="pi pi-download" @click="exportCSV($event)" />
        </template>
        <Column field="source" header="Source">
            <template #body="{ data }">
                <span>{{ getTree(data.source!) }}</span>
            </template>
        </Column>
        <Column field="target" header="Target">
            <template #body="{ data }">
                <span>{{ getTree(data.target!) }}</span>
            </template>
        </Column>
        <Column field="description" header="Description"></Column>
        <Column field="technology" header="Technology"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import RelationsCSV from "@/components/RelationsCSV.vue";
import { useCsvStore } from "@/stores/csv";
import { findSystemById } from "@/utils/transformations";
import { Button, Column, DataTable } from "primevue";

const csvStore = useCsvStore();


const csvRelationsData = computed(() => csvStore.csvRelationsData);
const csvElementsData = computed(() => csvStore.csvElementsData);

const dtRelations = ref()

const getTree = (source:string) => {
    if(source=="" || source==undefined) return "";
    const tree = source.split(".");

    let treeString = ""

    for( let i = 0; i < tree.length; i++){
        if(i==tree.length-1){
            treeString += findSystemById(tree[i]!, csvElementsData.value);
        }else{
            treeString += findSystemById(tree[i]!, csvElementsData.value) + " -> ";
        }
    }
    return treeString;    
}


const exportCSV = () => {
 dtRelations.value.exportCSV();   
}
</script>
