import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainDataRoutingModule } from './main-data-routing.module';
import { MainDataComponent } from './main-data.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { CalendarUtils as BaseCalendarUtils } from 'angular-calendar';
import { GetWeekViewArgs, WeekView, getWeekView } from 'calendar-utils';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatTimepickerModule } from 'mat-timepicker';

@Injectable()
export class CalendarUtils extends BaseCalendarUtils {

  constructor(private dateAdapter2: DateAdapter) {
    super(dateAdapter2)
  }

  // getWeekView(args: GetWeekViewArgs): WeekView {

  //   const milestoneEvents = args.events.filter(event => event.meta.type === 'holidayEvent');
  //   const calendarEvents = args.events.filter(event => event.meta.type !== 'holidayEvent');

  //   const milestoneView = getWeekView(this.dateAdapter2, {
  //     ...args,
  //     events: milestoneEvents
  //   })
  //   const calendarView = getWeekView(this.dateAdapter2, {
  //     ...args,
  //     events: calendarEvents
  //   })

  //   return {
  //     ...calendarView,
  //     allDayEventRows: [
  //       ...milestoneView.allDayEventRows,
  //       ...calendarView.allDayEventRows
  //     ]
  //   }

  // }
}

@NgModule({
  declarations: [MainDataComponent],
  imports: [
    CommonModule,
    MainDataRoutingModule,
    SharedModule,

    NgbModalModule,
    MatTimepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      utils: {
        provide: BaseCalendarUtils,
        useClass: CalendarUtils
      }
    })
  ]
})
export class MainDataModule { }
