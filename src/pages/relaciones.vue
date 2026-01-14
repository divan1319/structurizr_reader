<template>
  <div class="px-2 py-4">
    <h1 class="text-2xl font-bold text-slate-900">Relaciones</h1>
    <p class="text-slate-900 uppercase text-xs flex gap-x-1 italic font-semibold mb-2"><i class="pi pi-exclamation-circle"></i>Para ver el nombre en la relación de los sistemas deberá cargar los datos con anterioridad de elements.csv</p>
    <DataTable :value="csvRelationsData" ref="dtRelations" paginator :rows="15" :rows-per-page-options="[15, 30, 60, 100]">
        <template #empty>
            <p class="text-center uppercase text-xs">No se han cargado relaciones</p>
        </template>
        <template #header>
            <div class="w-full flex justify-between">
                <RelationsCSV />
                <Button label="Agregar registro" icon="pi pi-plus-circle" @click="dialogVisible = true" variant="outlined" severity="contrast" />
            </div>
        </template>
        <template #paginatorend>
            <Button icon="pi pi-download" text severity="contrast" @click="exportCSV($event)" />
        </template>
        <Column field="source" header="source">
            <template #body="{ data }">
                <span>{{ getTree(data.source!) }}</span>
            </template>
        </Column>
        <Column field="target" header="target">
            <template #body="{ data }">
                <span>{{ getTree(data.target!) }}</span>
            </template>
        </Column>
        <Column field="description" header="description"></Column>
        <Column field="technology" header="technology"></Column>
    </DataTable>
  </div>
  <Dialog v-model:visible="dialogVisible" header="Agregar relación" modal :style="{ width: '60vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" >
    <AgregarRelation @close="closeModal" />
  </Dialog>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import RelationsCSV from "@/components/RelationsCSV.vue";
import { useCsvStore } from "@/stores/csv";
import { findSystemById } from "@/utils/transformations";
import { Button, Column, DataTable, Dialog } from "primevue";
import AgregarRelation from "@/components/AgregarRelation.vue";

const csvStore = useCsvStore();


const csvRelationsData = computed(() => csvStore.csvRelationsData);
const csvElementsData = computed(() => csvStore.csvElementsData);

const dtRelations = ref()

const dialogVisible = ref(false);

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


const exportCSV = (event: any) => {
 dtRelations.value.exportCSV();   
}

const closeModal = () => {
    console.log("close");
    dialogVisible.value = false;
}
</script>
