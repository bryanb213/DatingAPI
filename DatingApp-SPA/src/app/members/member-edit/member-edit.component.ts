import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

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

  // need router to access data and auth to access token data  
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      // console.log(this.user);
    });
  }

  // d
  updateUser() {
    this.userService.updateUser({ id: this.authService.decodedToken.nameid, user: this.user }).subscribe( nexxt => {
      // console.log(this.user);
      this.alertify.success('Profile updated successfully!');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error.statusText);
    });
  }
}
