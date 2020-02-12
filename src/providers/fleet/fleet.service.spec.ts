import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FleetService, Customer } from './fleet.service';

describe('FleetService', () => {
  let fleetService: FleetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FleetService
      ],
    });

    fleetService = TestBed.get(FleetService);
    httpMock = TestBed.get(HttpTestingController);
  });

  /*it(`should fetch the basic fleet data`, async(inject([HttpTestingController, FleetService],
    async ( fleetService: FleetService) => {     
      var customerlistobject = await fleetService.ListCustomerData('');
      expect(customerlistobject).toBeGreaterThan(3);

    })));*/

    it(`should fetch the basic fleet data`, async( async () => {     
        
          var customerlistobject = await fleetService.ListCustomerData('');
          expect(customerlistobject).toBeGreaterThan(3);
    
        }));
});