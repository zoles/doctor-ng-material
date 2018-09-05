import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { DoctorsService } from '../doctors.service';
import { Doctor } from '../doctor.model';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
  private doctorId: string;

  isLoading = false;
  isValid = true;
  doctor: Doctor;
  form: FormGroup;

  addressLat: number;
  addressLng: number;

  constructor(
    private doctorsService: DoctorsService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'username': new FormControl(null, { validators: [Validators.required] }),
      'email': new FormControl(null, { validators: [Validators.required] }),
      'phone': new FormControl(null, { validators: [Validators.required] }),
      'website': new FormControl(null, { validators: [Validators.required] }),

      'companyName': new FormControl(null, { validators: [Validators.required] }),
      'companycatchPhrase': new FormControl(null, { validators: [Validators.required] }),
      'companyBs': new FormControl(null, { validators: [Validators.required] }),

      'street': new FormControl(),
      'suite': new FormControl(),
      'city': new FormControl(),
      'zipcode': new FormControl()
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.doctorId = paramMap.get("doctorId");
      this.isLoading = true;
      this.doctorsService.getDoctor(this.doctorId).subscribe(
        docData => {
          this.isLoading = false;
          this.form.setValue({
            name: docData.name,
            username: docData.username,
            email: docData.email,
            phone: docData.phone,
            website: docData.website,

            companyName: docData.company.name,
            companycatchPhrase: docData.company.catchPhrase,
            companyBs: docData.company.bs,

            street: docData.address.street,
            suite: docData.address.suite,
            city: docData.address.city,
            zipcode: docData.address.zipcode
          });
          this.addressLat = parseInt(docData.address.geo.lat);
          this.addressLng = parseInt(docData.address.geo.lng);

          this.doctorsService.doctorId.next(this.doctorId);
        },
      err => {
        this.isValid = false;
        this.isLoading = false;
        console.log("There was an error while loading the doctor detail page.");
      });
    });
  }
}
