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
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // getting member setails from the route
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

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    // for (const photo of this.user.photos) {
    //   imageUrls.push({
    //     small: photo.url,
    //     medium: photo.url,
    //     big: photo.url,
    //     description: photo.description
    //   });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description,
      });
    }
    return imageUrls;
    }
  }

  // members/4 to access the id you need the router
  // loadUser() {                                     // params.id works too
  //   this.userService.getUser(+ this.route.snapshot.params['id'] ).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error.statusText);
  //   });
  // }
