<template>
  <div class="grid grid-cols-2 gap-x-2 gap-y-2">
    <FloatLabel variant="in">
      <InputText v-model="stateForm.id" id="idText" class="w-full" />
      <label for="idText">Id</label>
    </FloatLabel>

    <div class="grid grid-cols-4 gap-x-2 gap-y-2">
      <FloatLabel variant="in" class="col-span-4">
        <Select
          v-model="stateForm.type"
          :options="typesComputed"
          class="w-full"
          variant="filled"
        />
        <label for="typeText">Type</label>
      </FloatLabel>
      <!---------<div v-if="typesComputed.length > 0" class="flex items-center gap-x-1 col-span-1">
        <Checkbox v-model="checks.type" binary input-id="checkType" />
        <label for="checkType">Crear tipo</label>
      </div>------->
    </div>

    <FloatLabel variant="in">
      <InputText v-model="stateForm.name" id="nameText" class="w-full" />
      <label for="nameText">Name</label>
    </FloatLabel>
    <div class="grid grid-cols-4 gap-x-2 gap-y-2">
      <FloatLabel
        variant="in"
        :class="[parentsComputed.length > 0 ? 'col-span-3' : 'col-span-4']"
      >
        <InputText
          v-if="checks.parent || parentsComputed.length === 0"
          v-model="stateForm.parent"
          id="parentText"
          class="w-full"
        />
        <Select
          v-else
          v-model="stateForm.parent"
          :options="parentsListComputed"
          optionLabel="name"
          optionValue="id"
          filter
          class="w-full"
          variant="filled"
        />
        <label for="parentText">Parent</label>
      </FloatLabel>
      <div
        v-if="parentsComputed.length > 0"
        class="flex items-center gap-x-1 col-span-1"
      >
        <Checkbox v-model="checks.parent" binary input-id="checkParent" />
        <label for="checkParent">Crear parent</label>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-x-2 gap-y-2">
      <FloatLabel
        variant="in"
        :class="[tagsComputed.length > 0 ? 'col-span-3' : 'col-span-4']"
      >
        <InputText
          v-if="checks.tag || tagsComputed.length === 0"
          v-model="stateForm.tags"
          id="tagsText"
          class="w-full"
        />
        <Select
          v-else
          v-model="stateForm.tags"
          :options="tagsComputed"
          class="w-full"
          variant="filled"
        />
        <label for="tagsText">Tags</label>
      </FloatLabel>
      <div
        v-if="tagsComputed.length > 0"
        class="flex items-center gap-x-1 col-span-1"
      >
        <Checkbox v-model="checks.tag" binary input-id="checkTags" />
        <label for="checkTags">Crear tag</label>
      </div>
    </div>

    <FloatLabel variant="in">
      <InputText
        v-model="stateForm.description"
        id="descriptionText"
        class="w-full"
      />
      <label for="descriptionText">Description</label>
    </FloatLabel>
  </div>
  <div class="w-full flex justify-end py-3">
    <Button label="Agregar" @click="agregarElemento" />
  </div>

</template>

<script setup lang="ts">
import { useCsvStore } from "@/stores/csv";
import {
  Button,
  Checkbox,
  FloatLabel,
  InputText,
  Select,
  useToast,
} from "primevue";
import { computed, reactive } from "vue";

const csvStore = useCsvStore();
const emit = defineEmits(["close"]);
const toast = useToast();

const stateForm = reactive({
  id: "",
  type: "",
  name: "",
  parent: "",
  tags: "",
  description: "",
});

const checks = reactive({
  tag: false,
  type: false,
  parent: false,
});

/**
 * Obtiene los datos de los elementos del almacén de datos.
 * @returns {Array} - Lista de elementos.
 */
const csvData = computed(() => csvStore.csvElementsData);

/**
 * Obtiene los tipos de elementos disponibles.
 * @returns {Array} - Lista de tipos.
 */
const typesComputed = computed(() => csvStore.typesComputed);

/**
 * Obtiene los padres disponibles.
 * @returns {Array} - Lista de padres.
 */
const parentsComputed = computed(() => csvStore.parentsComputed);

const parentsListComputed = computed(()=>{
  return parentsComputed.value.map(p =>{
    const parent = csvData.value.find(e => e.id === p)
    return {
      id: parent?.id,
      name: `${parent?.id} - ${parent?.name}`
    }
  })
})

/**
 * Obtiene los tags disponibles.
 * @returns {Array} - Lista de tags.
 */
const tagsComputed = computed(() => csvStore.tagsComputed);

/**
 * Agrega un nuevo elemento al almacén de datos.
 * Limpia el formulario y cierra el componente.
 */
const agregarElemento = () => {
  const [error, message] = validationForm();
  if (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
    return;
  }

  const data = {
    id: stateForm.id,
    type: stateForm.type,
    name: stateForm.name,
    parent: stateForm.parent,
    tags: stateForm.tags,
    description: stateForm.description,
  };
  csvStore.agregarElemento(data);
  cleanForm();
  emit("close");
};

/**
 * Limpia el formulario.
 */
const cleanForm = () => {
  stateForm.id = "";
  stateForm.type = "";
  stateForm.name = "";
  stateForm.parent = "";
  stateForm.tags = "";
  stateForm.description = "";
};

const validationForm = () => {
  if (stateForm.id === "") return [true, "Debe ingresar un id"];
  if (stateForm.type === "") return [true, "Debe ingresar un tipo"];
  if (stateForm.name === "") return [true, "Debe ingresar un nombre"];
  return [false, ""];
};
</script>
