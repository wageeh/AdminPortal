import { CoreService } from '../core/core.service';
import { Injectable } from '@angular/core';



// Vehicle Status Class
export interface VehicleStatus {
  vin: string;
  laststatus: string;
}

@Injectable({
  providedIn: 'root'
})

export class VehiclestatusService {
  // the trivial bad scenario of fetching data from blob table
  // SAS URL for using blob table
  // private strurl = 'https://blobvehiclestatus.table.core.windows.net/BlobVechileStatus?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-02-05T19:49:40Z&st=2020-02-01T11:49:40Z&spr=https,http&sig=6mWPeJbJ4xliVP%2B5y8M5q%2FI6yXhiR6v8OZrgAc0Ai1U%3D'
  // better scenario is to call a url which i can control access to and don't expose the table data to the internet
  private  statusurl:string = 'https://prod-30.northeurope.logic.azure.com:443/workflows/9f3dbd47b2a342208fd0e26bb7c0ddce/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=abf4_PwkVG34Cddi3UkgZWllzrlFDQEkG1ieMfnfz9M'
  constructor(private coreService:CoreService) { }

  public async ListVehicleStatus()
  {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const data = await this.coreService.http<VehicleStatus[]>(
      new Request(
        this.statusurl,
        {
          method: "post",
          body: JSON.stringify({
            Minutes: 1
          }),
          headers:headers
        }
      )
    );

    return data;
  }
}
