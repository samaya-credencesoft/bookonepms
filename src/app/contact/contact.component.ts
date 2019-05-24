import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
export interface Email {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;
}
export interface ServiceList {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;
}

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  lat = -36.79648;
  lng = 174.646926;
  constructor(private http: HttpClient) {}
  subject: FormControl = new FormControl("", [Validators.required]);
  name: FormControl = new FormControl("", [Validators.required]);
  fromEmail: FormControl = new FormControl("", [Validators.required]);
  toEmail: FormControl = new FormControl();
  message: FormControl = new FormControl("", [Validators.required]);

  serviceName: string;
  email: Email;
  emailSuccess: Boolean;
  form = new FormGroup({
    subject: new FormControl(),
    name: new FormControl(),
    fromEmail: new FormControl(),
    message: new FormControl()
  });

  contactForm: FormGroup = new FormGroup({
    name: this.name,
    fromEmail: this.fromEmail,
    message: this.message,
    subject: this.subject
  });

  ngOnInit() {
    this.email = {
      fromEmail: "",
      toEmail: "",
      message: "",
      subject: ""
    };
  }

  send() {
    const TO_EMAIL = "support@thehotelmate.com";
    const API_URL = "https://booking-api-csoft-in.appspot.com";

    //const API_URL = 'http://localhost:8080';
    this.email.fromEmail = this.fromEmail.value;
    this.email.toEmail = TO_EMAIL;
    console.log(this.serviceName);
    this.email.subject = "BookOne (One & Own Booking & Hotel Management System)";
    this.email.message = this.message.value;

    console.log(this.email);
    this.http
      .post<boolean>(API_URL + "/api/website/sendEmailFromWebSite", this.email)
      .subscribe(response => {
        this.emailSuccess = response;
        console.log(response);
        this.email = {
          fromEmail: "",
          toEmail: "",
          message: "",
          subject: ""
        };
      });
  }
}
