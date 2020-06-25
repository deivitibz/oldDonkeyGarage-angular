import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class carouselComponent implements OnInit {
  // slides = [
  //   { img: 'https://picsum.photos/1900/500/' },
  //   { img: 'https://picsum.photos/1900/500/' },
  //   { img: 'https://picsum.photos/1900/500/' },
  //   { img: 'https://picsum.photos/1900/500/' },
  //   { img: 'https://picsum.photos/1900/500/' },
  //   { img: 'https://picsum.photos/1900/500/' },
  // ];

  // slideConfig = {
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   draggable: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //   ],
  // };

  constructor() {}

  ngOnInit(): void {}
}
