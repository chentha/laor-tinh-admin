import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private valueSubject = new BehaviorSubject<any>(null); 
  value$ = this.valueSubject.asObservable(); 

  constructor() {}

  // Set value
  setValue(value: any): void {
    this.valueSubject.next(value);
  }

  // Get current value
  getValue(): any {
    return this.valueSubject.getValue();
  }
}
