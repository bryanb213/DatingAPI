import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  // for the form
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window.beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  // nee router to access data
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      // console.log(this.user);
    });
  }

  // d
  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated successfully!');
    this.editForm.reset(this.user);
  }
}
