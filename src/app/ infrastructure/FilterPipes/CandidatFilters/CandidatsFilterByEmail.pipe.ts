import {Pipe, PipeTransform} from '@angular/core';
import { Candidat } from 'src/app/models/Candidat.model';
import {Element} from '../../../models/Element.model';


@Pipe({ name: 'CandidatsFilterByNom' })
export class ElementsFilterByDescriptionPipe implements PipeTransform {
  /** * Pipe filters the list of elements based on the search text provided * * @param items list of elements to search in * @param searchText search string * @returns list of elements filtered by search text or [] */
  transform(items: Candidat[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.nom.toLocaleLowerCase().includes(searchText);
    });
  }
}
