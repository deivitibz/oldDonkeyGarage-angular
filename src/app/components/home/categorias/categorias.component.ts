import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  slides = [
    {
      name: 'BOBBER',
      img: '../../../../assets/img/motos/bobber2.png',
      category: 'bobber'
    },
    {
      name: 'SCRAMBLER',
      img: '../../../../assets/img/motos/scrambler2.png',
      category: 'scrambler'
    },
    {
      name: 'RACER',
      img: '../../../../assets/img/motos/cafe_racer2.png',
      category: 'cafe_racer'
    },
    {
      name: 'CHOPPED',
      img: '../../../../assets/img/motos/chopped2.png',
      category: 'chopped'
    },
    {
      name: 'BRAD',
      img: '../../../../assets/img/motos/brad2.png',
      category: 'brad'
    },
    {
      name: 'TRACKER',
      img: '../../../../assets/img/motos/street2.png',
      category: 'street_tracker'
    },
  ];

  slideConfig = {
    infinite: true,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }

}
