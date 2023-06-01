import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/User.model';


@Pipe({ name: 'UsersFilter' })
export class UsersFilterPipe implements PipeTransform {
  /** * Pipe filters the list of elements based on the search text provided * * @param items list of elements to search in * @param searchText search string * @returns list of elements filtered by search text or [] */
  transform(items: User[], searchText: string): any[] {
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
