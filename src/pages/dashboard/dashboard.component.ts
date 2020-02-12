import { Component, OnInit } from '@angular/core';
import { FleetService, Vehicle, Customer } from '../../providers/fleet/fleet.service';
import { VehiclestatusService } from '../../providers/vehiclestatus/vehiclestatus.service';

interface CustomerResult{
  city:string;
  name:string;
  vehicles:VehicleDetails[]
}

interface VehicleDetails extends Vehicle{  
  status:boolean,
  laststatustime:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public CustomerList:any;
  public VehicleStatus:any;
  public Result:CustomerResult[];
  public FliteredStatus:string;
  public TriggerTime:string;
  filteredName: string;

  constructor(private fleetService:FleetService,
    private vehiclestatusService:VehiclestatusService) { 
      this.FliteredStatus = 'All';
      this.filteredName = '';
  }

  ngOnInit() {

    this.initNewCall();

    setInterval( ()=>{
      this.initNewCall();
    }, (1000 * 60));
    
  }

  public async initNewCall() {
    this.TriggerTime = new Date().toLocaleString();
    this.CustomerList = await this.fleetService.ListCustomerData(this.filteredName);
    this.VehicleStatus = await this.vehiclestatusService.ListVehicleStatus();
    
    this.fillResultList();
  }

  public fillResultList(){
    this.Result = [];

    this.CustomerList.forEach(customer => {
      
      var customeritem = {} as CustomerResult;
      customeritem.city = customer.address.city;
      customeritem.name = customer.name;
      customeritem.vehicles = [];
      customer.vehicles.forEach(element => {        
        var vehicleItem = {} as VehicleDetails;
        vehicleItem.vin = element.vin;
        vehicleItem.regid = element.regid;
        var time = this.findFromStatus(element.vin);
        if(time!=''){
          vehicleItem.laststatustime = time;
          vehicleItem.status = true;
        }else{
          vehicleItem.status = false;
        }
        if(this.FliteredStatus=='All'){
          customeritem.vehicles.push(vehicleItem); 
        } else if(this.FliteredStatus=='On' && vehicleItem.status) {
          customeritem.vehicles.push(vehicleItem); 
        } else if(this.FliteredStatus=='Off' && !vehicleItem.status) {
          customeritem.vehicles.push(vehicleItem); 
        } 
      });
      this.Result.push(customeritem);
    });
  }

  public findFromStatus(key:string){
    if(this.VehicleStatus!= undefined){
        var found = this.VehicleStatus.find(item=>item.VehId == key);
        if(found!=null)
        {
          return found.SentTime;
        }
    }
    return '';
  }

  public async customerNameChanged(event: any)
  {
    this.filteredName = event.target.value;
    this.initNewCall();
  }

  public selectOnChange(target:any){
    this.initNewCall();
  }

}
