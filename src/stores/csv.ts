import type { CSVElements, CSVRelations } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCsvStore = defineStore("csvStore", () => {
  const csvElementsData = ref<CSVElements[]>([]);
  const csvRelationsData = ref<CSVRelations[]>([]);

  function setCvsElementsData(data: CSVElements[]) {
    csvElementsData.value = data;
  }

  function setCvsRelationsData(data: CSVRelations[]) {
    csvRelationsData.value = data;
  }

  function agregarElemento(data: CSVElements) {
    csvElementsData.value.push(data);
  }

  function agregarRelacion(data: CSVRelations) {
    csvRelationsData.value.push(data);
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
    //getters
    typesComputed,
    parentsComputed,
    tagsComputed,

  };
});
