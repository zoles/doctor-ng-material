import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DoctorsService } from './doctors.service';

describe('Doctors service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorsService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getting all doctors', () => {
    it('returns doctors with id 5, 6', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const mockResponse = [
        {
          "id": 5,
          "name": "Test5",
          "username": "username5",
          "email": "email5@email.ca",
          "address": {
            "street": "street5",
            "suite": "suite5",
            "city": "city5",
            "zipcode": "12345",
            "geo": {
              "lat": "-31.8129",
              "lng": "62.5342"
            }
          },
          "phone": "(11)123-456",
          "website": "demarco.info",
          "company": {
            "name": "asdf",
            "catchPhrase": "aaa",
            "bs": "wtf"
          }
        },
        {
          "id": 6,
          "name": "Test6",
          "username": "username6",
          "email": "email6@email.ca",
          "address": {
            "street": "street6",
            "suite": "suite6",
            "city": "city6",
            "zipcode": "12345",
            "geo": {
              "lat": "-31.8129",
              "lng": "62.5342"
            }
          },
          "phone": "(11)123-456",
          "website": "demarco.info",
          "company": {
            "name": "asdf",
            "catchPhrase": "aaa",
            "bs": "wtf"
          }
        }
      ];

      const doctorsService = getTestBed().get(DoctorsService);
      doctorsService.getDoctors().subscribe(
        actualUsers => {
          expect(actualUsers.length).toBe(2);
          expect(actualUsers[1].id).toEqual(6);
        }
      );

      const req = httpMock.expectOne(doctorsService.apiUrlUsers);
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }));

    it('should throw an error message when API returns an error',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        const doctorsService = getTestBed().get(DoctorsService);
        doctorsService.getDoctors().subscribe(
          response => fail('should have failed with 500 status'),
         (error: HttpErrorResponse) => {
            expect(error).toBeTruthy();
            expect(error.status).toEqual(500);
          }
        );

        const req = httpMock.expectOne(doctorsService.apiUrlUsers);
        expect(req.request.method).toEqual('GET');

        req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
        httpMock.verify();
      }));
  });

  describe('getting doctor', () => {
    it('should get doctor', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const doctorsService = getTestBed().get(DoctorsService);
      doctorsService.getDoctor("1").subscribe((doc) => {
        expect(doc["id"]).toBe(1)
        expect(doc["title"]).toBe("Mock title")
      });

      const req = httpMock.expectOne(doctorsService.apiUrlUsers + "1")
      req.flush({
        "id": 1,
        "title": "Mock title",
        "body": "Mock body"
      });

      httpMock.verify();
    }));
  });
});
