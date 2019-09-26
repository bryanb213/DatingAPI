import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-deatail',
  templateUrl: './member-deatail.component.html',
  styleUrls: ['./member-deatail.component.css']
})
export class MemberDeatailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImage: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions =  [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

    this.galleryImage = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
      return imageUrls;
    }
  }

  // members/4 to access the id you need the router
  // loadUser() {                                     // params.id works too
  //   this.userService.getUser(+ this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error.statusText);
  //   });
  // }
}
