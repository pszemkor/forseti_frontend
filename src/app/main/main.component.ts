import {Component, OnInit} from '@angular/core';
import {Request} from "../shared/request";
import {Meeting} from "../shared/meeting";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MeetingService } from '../services/meeting-service.service';
import { RequestsService } from '../services/requests.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  requests$: Observable<Request[]> | undefined

  matchedMeetings$: Observable<Meeting[]> | undefined

  pastMeetings$: Observable<Meeting[]> | undefined

  constructor(private router: Router, private meetingService: MeetingService, private requestService: RequestsService) {
  }

  ngOnInit(): void {
    this.matchedMeetings$ = this.meetingService.getAllDoneUserMeetings()
      .pipe(take(1));
    this.pastMeetings$ = this.meetingService.getAllNotDoneUserMeetings()
      .pipe(take(1));
    this.requests$ = this.requestService.getAllRequests()
      .pipe(take(1));

  }

  openMeeting(meeting: Meeting) {
    this.router.navigate(["/meeting-details/", meeting.id])
  }

  openRequest(request: Request) {
    console.log(request)
    this.router.navigate(["/request-details/", request.requestId])
  }

}
