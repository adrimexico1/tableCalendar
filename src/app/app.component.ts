import { Component, OnInit } from '@angular/core';
// Importo el archivo JSON 
import listadeUsuarios from '../assets/json/users.json';
import * as moment from 'moment';
// Importo el archivo JSON 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   // Exporto los datos del archivo JSON a la  vista 
  Usuarios: any = listadeUsuarios;
  week: any = [    
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];


  monthSelect: any[];
  dateSelect: any;
  dateValue: any;


  constructor() {

  }

  ngOnInit(): void {
    this.getDaysFromDate(moment().format('MM'), moment().format('YYYY'))
  }

  getDaysFromDate(month, year) {    
    const startDate = moment(`${year}/${month}/01`)
    //Crea el objeto de tipo date con los parametros de mes y año 
    const endDate = moment(startDate).endOf('month');
    console.log(startDate.toDate());
    console.log(endDate.toDate());
    //Para finalizar el mes, clone para que no se itere <-
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true)
    //Nos trae la cantidad de Dias de diferencia entre inicio y fin
    const numberDays = Math.round(diffDays);
    //Redondear la cantidad de dias 

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}/${month}/${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }

}
