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




  constructor(private tutorialService: WeatherService) {

  }

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
  barChartData = [
    { data: [], label: '', yAxisID: '', type:''}
  ];
  barChartData2 = [
    { data: [], label: '', yAxisID: '', type:''}
  ];

  ngOnInit() {
    var ort="Struppen";
    this.retrieveTutorials(ort);
    var ort2="Ralbitz";
    this.retrieveTutorials2(ort2);
  }

  retrieveTutorials(ort) {

    this.tutorialService.getAll(ort)
      .subscribe(

        data => {
          console.log(data);
          var dataTemp = [];
          var dataRain = [];
          var dataTime = [];
          var dataT0 = [];
          var dataMoisture = [];

          dataTemp = data[0].temp
          dataRain = data[1].rain
          dataTime = data[2].time
          dataMoisture = data[3].moisture
          dataT0 = data[4].t0
          // console.log(ndata);
          this.barChartData = [
            { data: dataTemp , label: 'Temp', yAxisID: 'A', type: 'line'},
            { data: dataRain , label: 'Rain', yAxisID: 'B', type: 'bar'},
            { data: dataMoisture , label: 'Moisture', yAxisID: 'A', type: 'line'},
            { data: dataT0 , label: 'Bodentemperatur', yAxisID: 'A', type: 'line'}
          ];
         this.barChartLabels = dataTime

        },
        error => {
          console.log(error);
        });
  }

  retrieveTutorials2(ort2) {

    this.tutorialService.getAll(ort2)
      .subscribe(

        data => {
          console.log(data);
          var dataTemp = [];
          var dataRain = [];
          var dataTime = [];
          var dataT0 = [];
          var dataMoisture = [];

          dataTemp = data[0].temp
          dataRain = data[1].rain
          dataTime = data[2].time
          dataMoisture = data[3].moisture
          dataT0 = data[4].t0
          // console.log(ndata);
          this.barChartData2 = [
            { data: dataTemp , label: 'Temp', yAxisID: 'A', type: 'line'},
            { data: dataRain , label: 'Rain', yAxisID: 'B', type: 'bar'},
            { data: dataMoisture , label: 'Moisture', yAxisID: 'A', type: 'line'},
            { data: dataT0 , label: 'Bodentemperatur', yAxisID: 'A', type: 'line'}
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
