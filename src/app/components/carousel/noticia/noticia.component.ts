import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  slides = [
    {
      name: "BOBBER",
      img: "../../../../assets/img/motos/bobber.png"},
    {
      name: "BRAD",
      img: "../../../../assets/img/motos/brad.png"},
    {
      name: "CAFÉ RACER",
      img: "../../../../assets/img/motos/cafe-racer.png"},
    {
      name: "CHOPPED",
      img: "../../../../assets/img/motos/chopped.png"},
    {
      name: "SCRAMBLET",
      img: "../../../../assets/img/motos/scramblet.png"},
    {
      name: "STREET-TRACKER",
      img: "../../../../assets/img/motos/street-tracker.png"}
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
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor() {


  }




  ngOnInit(): void {
  }


}
