import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface distance {
  name: string;
  length: number;
}

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.scss'],
})
export class CalculatePageComponent implements OnInit {
  distances: distance[] = [
    {
      name: '5k',
      length: 5,
    },
    {
      name: '10k',
      length: 10,
    },
    {
      name: '10 miles',
      length: 16.0934,
    },
    {
      name: 'Half Marathon',
      length: 21.0775,
    },
    {
      name: 'Marathon',
      length: 42.195,
    },
  ];

  km = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
}
