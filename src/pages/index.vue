<template>
  <div class="px-2 py-4">
    <h2 class="text-2xl font-bold text-slate-900">Elementos</h2>
    <DataTable
      v-model:filters="filters"
      ref="dtElements"
      :value="csvData"
      paginator
      data-key="id"
      filter-display="row"
      :rows="15"
      :rows-per-page-options="[15, 30, 60, 100]"
    >
    <template #header>
        <div class="w-full flex justify-between">
            <ElementsCSV />
            <Button label="Agregar registro" icon="pi pi-plus-circle" @click="dialogVisible = true" variant="outlined" severity="contrast" />
        </div>
    </template>
      <template #empty>
        <p class="text-center uppercase text-xs">Datos no cargados</p>
      </template>
      <template #paginatorend>
        <Button icon="pi pi-download" text severity="contrast" @click="exportCSV($event)" />
      </template>
      <Column field="id" header="id" :showFilterMenu="false">
        <template #body="{ data }">
          {{ data.id }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Buscar por id"
          />
        </template>
      </Column>
      <Column field="type" header="type" :showFilterMenu="false">
        <template #body="{ data }">
          <span>{{ data.type }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="typesComputed"
            placeholder="Buscar por tipo"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="name" header="name" :showFilterMenu="false">
        <template #body="{ data }">
          <span>{{ data.name }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Buscar por nombre"
          />
        </template>
      </Column>
      <Column field="parent" header="parent" :showFilterMenu="false">
        <template #body="{ data }">
          <span>{{ data.parent }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="parentsComputed"
            placeholder="Buscar por parent"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="tags" header="tags" :showFilterMenu="false">
        <template #body="{ data }">
          <span>{{ data.tags }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="tagsComputed"
            placeholder="Buscar por tags"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="description" header="description" :showFilterMenu="false">
        <template #body="{ data }">
          <span>{{ data.description }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Buscar por descripción"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="dialogVisible" header="Agregar elemento" modal :style="{ width: '60vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" >
      <AgregarElement @close="closeModal" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { CSVElements } from "../types/types";
import ElementsCSV from "../components/ElementsCSV.vue";
import { Button, Column, DataTable, Dialog, InputText, MultiSelect } from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import { useCsvStore } from "@/stores/csv";
import AgregarElement from "@/components/AgregarElement.vue";
// 1. Creamos la referencia para guardar los datos

const csvStore = useCsvStore();

const dialogVisible = ref(false);
const dtElements = ref()

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.IN },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  parent: { value: null, matchMode: FilterMatchMode.IN },
  tags: { value: null, matchMode: FilterMatchMode.IN },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const csvData = computed(() => csvStore.csvElementsData);

const typesComputed = computed(() => csvStore.typesComputed);
const parentsComputed = computed(() => csvStore.parentsComputed);
const tagsComputed = computed(() => csvStore.tagsComputed);

const existData = computed(() => csvData.value.length > 0);

const exportCSV = (event: any) => {
 dtElements.value.exportCSV();   
}

const closeModal = () => {
    dialogVisible.value = false;
}
</script>
