import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../doctors.service';
import { Doctor } from '../doctor.model';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[];

  constructor(public doctorsService: DoctorsService) {}

  ngOnInit() {
    this.doctorsService.getDoctors().subscribe(postData => {
      this.doctors = postData;
    });
  }
}
