import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters: any = {}; // Store filter values
  private FilterSubject = new BehaviorSubject<string | null>(null);

  setFilter(filterUrl: any) {
    this.FilterSubject.next(filterUrl);
  }

  getFilters() {
    return this.filters;
  }

  clearFilter() {
    this.FilterSubject.next(null);
  }
}
