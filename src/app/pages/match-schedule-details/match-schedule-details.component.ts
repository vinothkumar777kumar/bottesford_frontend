import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';
import { MatchService } from 'src/app/dataservice/match.service';

@Component({
  selector: 'app-match-schedule-details',
  templateUrl: './match-schedule-details.component.html',
  styleUrls: ['./match-schedule-details.component.css']
})
export class MatchScheduleDetailsComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  match_id:any;
  singlematchdata = {
    match_date:'',
    match_name:'',
    round:'',
    start_time:'',
    end_time:'',
    team_one:'',
    team_one_image:'',
    team_two:'',
    team_two_image:''
  }
  match_image_api:any;
  emptyleaguetable:boolean = false;
  leaguetabledata = [];
  filterleagetable:any;
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private router: Router,
    private matsr:MatchService,private fb: FormBuilder,private Activate: ActivatedRoute) {
      this.match_image_api = this.matsr.getmatchimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.match_id = res.match_id;
      if(this.match_id){
        this.matsr.editmatch('editmatch/'+res.match_id).then(res => {
          console.log(res);
          if(res['status'] == 'success'){
            let data = res['data'];
             this.singlematchdata.match_date = data.match_date;
             this.singlematchdata.match_name = data.match_name;
             this.singlematchdata.start_time = data.start_time;
             this.singlematchdata.team_one = data.team_one;
             this.singlematchdata.team_one_image = this.match_image_api+''+data.team_one_image;
             this.singlematchdata.team_two = data.team_two;
             this.singlematchdata.team_two_image = this.match_image_api+''+data.team_two_image;
    
    
          }
        });
      }else{
        this.router.navigateByUrl('/match-schedule');
      }

    });
    this.getleaguetabledata();
   }

  ngOnInit(): void {
  }

  getleaguetabledata(){
    this.matsr.getdata('getleaguetabledata').then(res => {
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
          this.emptyleaguetable = true;
        }else{
          console.log(data);
          let legtbl = [];
        data.forEach(lt => {
          this.leaguetabledata.push({team:lt.team,mp:lt.mp,win:lt.win,draw:lt.draw,loss:lt.loss,win_match:lt.win});
        })

        let unique = {};
        let distinct = [];
        this.leaguetabledata.forEach((x) => {
          
          var mp = 0;
          var win = 0;
          var draw = 0;
          var loss = 0;
       if (!unique[x.team]) {
        let team =   this.leaguetabledata.filter(res => res.team == x.team);
        team.forEach(tm => {
          let match_play = tm.mp;
          mp += +match_play;

          let match_win = tm.win;
          win += +match_win;

          let match_draw = tm.draw;
          draw += +match_draw;

          let match_loss = tm.loss;
          loss += +match_loss;
        })
        // console.log(team);
              
         distinct.push({ team: x.team, mp: mp,win_match:win,draw:draw,loss:loss });
         unique[x.team] = true;
       }
      });
        this.filterleagetable = distinct;
      }
      }

    },error => {
      console.log(error);
    })
  }

}
