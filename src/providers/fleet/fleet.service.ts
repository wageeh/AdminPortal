import { CoreService } from '../core/core.service';import { Injectable } from '@angular/core';

// Customer Class
export interface Customer {
  id: string;
  name: boolean;
  vehicles:Vehicle[];
  address:{
    details: string;
    city: string;
  }
}

// vehicle Class
export interface Vehicle{
  vin: string;
  regid: string;
}

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private  statusurl:string = 'https://altenfmapi.azurewebsites.net/api/fleet'
  constructor(private coreService:CoreService) { }

  public async ListCustomerData(name:string='')
  {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    var url:string;
    if(name!=''){
      url = this.statusurl+'?name='+name;
    }else{
      url = this.statusurl;
    }
    const data = await this.coreService.http<Customer[]>(
      new Request(
        url,
        {
          method: "get",
          headers:headers
        }
      )
    );

    return data;
  }
}
