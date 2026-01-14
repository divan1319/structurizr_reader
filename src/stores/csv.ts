import type { CSVElements, CSVRelations } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCsvStore = defineStore("csvStore", () => {
  const csvElementsData = ref<CSVElements[]>([]);
  const csvRelationsData = ref<CSVRelations[]>([]);

  function setCvsElementsData(data: CSVElements[]) {
    if (csvElementsData.value.length === 0) {
      csvElementsData.value = data.map((item) => ({
        ...item,
        uuid: crypto.randomUUID(),
      }));
    } else {
      csvElementsData.value.push(
        ...data.map((item) => ({
          ...item,
          uuid: crypto.randomUUID(),
        }))
      );
    }
  }

  function setCvsRelationsData(data: CSVRelations[]) {
    if (csvRelationsData.value.length === 0) {
      csvRelationsData.value = data.map((item) => ({
        ...item,
        uuid: crypto.randomUUID(),
      }));
    } else {
      csvRelationsData.value.push(
        ...data.map((item) => ({
          ...item,
          uuid: crypto.randomUUID(),
        }))
      );
    }
  }

  function agregarElemento(data: CSVElements) {
    console.log("agregarElemento store", data);
    csvElementsData.value.push({
      ...data,
      uuid: crypto.randomUUID(),
    });
  }

  function agregarRelacion(data: CSVRelations) {
    csvRelationsData.value.push({
      ...data,
      uuid: crypto.randomUUID(),
    });
  }

  /**
   * Edita un elemento existente en csvElementsData por su índice o lo agrega si el índice es nulo.
   * @param data - Los datos del elemento a actualizar o insertar.
   * @param index - La posición del elemento en el arreglo o null para inserción.
   */
  function editarElemento(data: CSVElements) {
    console.log("editarElemento store", data);
    const index = csvElementsData.value.findIndex(
      (item) => item.uuid === data.uuid
    );
    if (index > -1) {
      csvElementsData.value[index] = data;
    } else {
      if (!data.uuid) {
        data.uuid = crypto.randomUUID();
      }
      csvElementsData.value.push(data);
    }
  }

  /**
   * Elimina un elemento del arreglo csvElementsData basado en su índice.
   * @param index - El índice del elemento a remover.
   */
  function eliminarElemento(uuid: string) {
    const index = csvElementsData.value.findIndex(
      (item) => item.uuid === uuid
    );
    if (index > -1) {
      csvElementsData.value.splice(index, 1);
    }
  }

  /**
   * Propiedades computadas de elementsCSV
   */

  const typesComputed = computed(() => {
    return [
      ...new Set(
        csvElementsData.value.map((item) => item.type).filter(Boolean)
      ),
    ];
  });

  const parentsComputed = computed(() => {
    return [
      ...new Set(
        csvElementsData.value.map((item) => item.parent).filter(Boolean)
      ),
    ];
  });

  const tagsComputed = computed(() => {
    return [
      ...new Set(
        csvElementsData.value.map((item) => item.tags).filter(Boolean)
      ),
    ];
  });

  const csvElementsDataComputed = computed(() => csvElementsData.value);

  /**
   * Propiedades computadas de relationsCSV
   */

  return {
    //state
    csvElementsData,
    csvRelationsData,
    //actions
    setCvsElementsData,
    setCvsRelationsData,
    agregarElemento,
    agregarRelacion,
    editarElemento,
    eliminarElemento,
    //getters
    typesComputed,
    parentsComputed,
    tagsComputed,
    csvElementsDataComputed,
  };
});
