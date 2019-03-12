import { Component, OnInit } from '@angular/core';

import {Expo} from 'gsap/all';

declare var TweenMax: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.animation();
  }

  animation(){

    TweenMax.to(".overlay h1", 2, {
      opacity: 0,
      y: -60,
      ease: Expo.easeInOut
    })

    TweenMax.to(".overlay", 2, {
          delay: 1,
          top: "-100%",
          ease: Expo.easeInOut
    })

    TweenMax.from(".logo", 1, {
          delay: 2.4,
          opacity: 0,
          y: 20,
          ease: Expo.easeInOut
    })

    TweenMax.staggerFrom(".nav ul li", 1, {
          delay: 2.4, opacity: 0, y: 20, ease: Expo.easeInOut
    }, 0.2)

    TweenMax.from(".row", 2, {
          delay: 2.4,
          opacity: 0,
          x: 40,
          ease: Expo.easeInOut
    })

    TweenMax.from(".row h6", 2, {
          delay: 3,
          opacity: 0,
          y: 40,
          ease: Expo.easeInOut
    })

    TweenMax.from(".row p", 2, {
          delay: 3.2,
          opacity: 0,
          y: 20,
          ease: Expo.easeInOut
    })

    TweenMax.from(".header h1", 2, {
          delay: 3.2,
          opacity: 0,
          y: 20,
          ease: Expo.easeInOut
    })

    TweenMax.from(".header p", 2, {
          delay: 3.4,
          opacity: 0,
          y: 20,
          ease: Expo.easeInOut
    })

    TweenMax.from(".header button", 2, {
          delay: 3.6,
          opacity: 0,
          y: 20,
          ease: Expo.easeInOut
    })





    }

}
