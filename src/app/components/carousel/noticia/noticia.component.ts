import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio.model';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent implements OnInit {
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
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
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

  @Output() category: EventEmitter<Anuncio>;

  constructor() {
    this.category = new EventEmitter();
  }

  ngOnInit(): void {}

  onClick(categoria: Anuncio){
    this.category.emit(categoria);

  }
}
