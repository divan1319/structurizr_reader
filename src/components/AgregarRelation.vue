<template>
  <div class="grid grid-cols-2 gap-x-2 gap-y-2">
    <FloatLabel variant="in">
      <Select
        v-model="stateForm.source"
        :options="sources"
        option-label="name"
        option-value="id"
        class="w-full"
        variant="filled"
      />
      <label for="sourceText">Origen</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <Select
        v-model="stateForm.target"
        :options="targets"
        option-label="name"
        option-value="id"
        class="w-full"
        variant="filled"
      />
      <label for="targetText">Destino</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputText
        v-model="stateForm.description"
        id="descriptionText"
        class="w-full"
      />
      <label for="descriptionText">Descripción</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputText
        v-model="stateForm.technology"
        id="technologyText"
        class="w-full"
      />
      <label for="technologyText">Tecnología</label>
    </FloatLabel>
  </div>
  <div class="w-full flex justify-end py-3">
    <Button label="Agregar" @click="agregarRelation" />
  </div>
</template>

<script setup lang="ts">
import { useCsvStore } from "@/stores/csv";
import { buildFullPath } from "@/utils/transformations";
import { Button, FloatLabel, InputText, Select, useToast } from "primevue";
import { computed, reactive } from "vue";

const csvStore = useCsvStore();
const csvData = computed(() => csvStore.csvElementsData);
const emit = defineEmits(['close']);


const toast = useToast();
const stateForm = reactive({
  source: "",
  target: "",
  description: "",
  technology: "",
});

/**
 * Obtiene una lista de componentes disponibles para la relación.
 * Filtra los elementos del almacén que son de tipo "Component".
 */
const sources = computed(() =>
  csvData.value.filter((item) => item.type === "Component")
);

/**
 * Obtiene una lista de componentes disponibles para la relación.
 * Filtra los elementos del almacén que son de tipo "Component" y que no son el mismo que el origen.
 */
const targets = computed(() =>
  csvData.value.filter(
    (item) => item.id !== stateForm.source && item.type == "Component"
  )
);

/**
 * Agrega una nueva relación entre componentes al almacén de datos.
 * Calcula las rutas completas de origen y destino, envía la información
 * al store, limpia el formulario y cierra el componente.
 */
const agregarRelation = () => {
    const [error, message] =validationForm()
    if (error){
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });
        return;
    }
  const sourcePath = buildFullPath(stateForm.source, csvData.value);
  const targetPath = buildFullPath(stateForm.target, csvData.value);
  const data = {
    source: sourcePath,
    target: targetPath,
    description: stateForm.description,
    technology: stateForm.technology,
  };
  csvStore.agregarRelacion(data);
  cleanForm();
  emit("close");
};

/**
 * Restablece los valores de los campos del formulario a su estado inicial.
 */
const cleanForm = () => {
  stateForm.source = "";
  stateForm.target = "";
  stateForm.description = "";
  stateForm.technology = "";
};

/**
 * Valida el formulario.
 * @returns {Array} Un array con dos elementos: el primer elemento es un booleano que indica si hay error,
 * el segundo es un string con el mensaje de error.
 */
const validationForm = () => {
    if (stateForm.source === "" ) return [true, "Debe seleccionar el origen"]
    if(stateForm.target === "") return [true, "Debe seleccionar el destino"]
    return [false, ""];
}
</script>
