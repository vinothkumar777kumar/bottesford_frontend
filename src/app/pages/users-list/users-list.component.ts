import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  usersdata = [];
  emptymatchdata:boolean = false;
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getusers_data();
   }

  ngOnInit(): void {
  }

  getusers_data(){
    this.matsr.getdata('users').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptymatchdata = true;
    }else{
      data.forEach(u => {
        this.usersdata.push({id:u.id,address_one:u.address_one,email:u.email,
          mobile:u.mobile,name:u.name,postcode:u.postcode,status:u.status,town:u.town});
      })
    }
            }
    },error => {
      console.log(error);
     if(error['error']){
      this.toastr.error(error['error'].message, 'Error', {
        progressBar:true
      });
      return;
     }
     
    })
  }

}
