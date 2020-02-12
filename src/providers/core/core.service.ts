import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  public async http<T>(
    request: RequestInfo
  ): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  };
}
