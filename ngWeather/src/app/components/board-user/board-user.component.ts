import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeatherService } from 'src/app/_services/weather.service';



@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent {


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        id: "A",
        position: 'left',
        type: 'linear',
        ticks: {
          beginAtZero:true
        },
        scaleLabel: {
          display: true,
          labelString: 'Temp'
        }
      },
      {
        id: "B",
        position: 'right',
        type: 'linear',
        ticks: {
          beginAtZero:true,
          labelString: 'Rain [mm]'
        }
      }]
    }
  };

  public barChartType = 'line';
  public barChartLegend = true;


  ngxData: any;
  barChartLabels: any;

  constructor(private tutorialService: WeatherService) {

  }

  barChartData = [
    { data: [], label: '', yAxisID: '', type:''}
  ];

  ngOnInit() {
    this.retrieveTutorials();
  }

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(

        data => {
          console.log(data);
          // this.ngxData = data;
          this.ngxData = data;
          var dataTemp = [];
          var dataRain = [];
          var dataTime = [];
          dataTemp = data[0].temp
          dataRain = data[1].rain
          dataTime = data[2].time
          // console.log(ndata);
          this.barChartData = [
            { data: dataTemp , label: 'Temp', yAxisID: 'A', type: 'line'},
            { data: dataRain , label: 'Rain', yAxisID: 'B', type: 'bar'}
          ];
         this.barChartLabels = dataTime

        },
        error => {
          console.log(error);
        });
  }








  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
