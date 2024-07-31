import { Filter, Filters } from "@__feedback__/shared";

export const FiltersMapping = {
  idAndHidden: (id: string) => [new Map([[ "field", "_id"], ["operator", "="], ["value", id]  ]), new Map<string, any>([[ "field", "hidden"], ["operator", "="], ["value", false]  ]) ],
  id: (id: string) => new Filters([new Map([['field', '_id'],['operator', '='],['value', id]])].map(Filter.fromValues)),
  employeeNumber: (employeeNumber: string) => new Filters([new Map([['field', 'number'],['operator', '='],['value', employeeNumber]])].map(Filter.fromValues)),
}