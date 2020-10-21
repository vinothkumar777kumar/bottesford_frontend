import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/dataservice/cart.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import jsPDF from 'jspdf'
import { ToastrService } from 'ngx-toastr';


declare global {
  interface Window {
    mainjsEvent: any;
  }
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartdata = [];
  removecartdata = [];
  login_info:any;
  nocartdata:boolean = false;
  isshowticketprice:boolean = true;
  total_ticket = 0;
  total_price:any = 0;
  title = 'ngx-qrcode-demo';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value :string;
  constructor(private cs: CartService,private router: Router,private cars:CartService,private toastr: ToastrService) { 
    this.login_info = JSON.parse(sessionStorage.getItem('login_details'));
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
    console.log(cart_session_data);
if(cart_session_data == null || cart_session_data.length == 0){
this.nocartdata = true;
this.isshowticketprice = false;
}else{
  let p =0;
cart_session_data.forEach(d => {
  this.cartdata.push({match_id:d.match_id,match_name:d.match_name,match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_image:d.team_one_image,
    team_two:d.team_two,team_two_image:d.team_two_image,ticket:d.ticket,ticket_price:d.ticket_price,
    start_time:d.start_time});
    this.total_ticket = this.cartdata.length;
    let tp =  d.ticket_price;
    p += +tp;
    console.log(p);
    this.total_price = p.toFixed(2);
})
let ticket = Math.floor((new Date()).getTime() / 1000);
this.value = ticket.toString();
} 
  }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
    // this.cartdata.forEach(d => {
    //   console.log(d)
    
    // })
  
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  downloadqr(){
    const qrcode = document.getElementById('qrticket');
    let doc = new jsPDF();

    let imageData= this.getBase64Image(qrcode.firstChild.firstChild);
    doc.addImage(imageData, "JPG", 10, 10);

    doc.save('BftblQR.pdf');
  }
  

  checkout(){
    if(this.removecartdata.length != 0){
      let data = {
        data:this.removecartdata,
        user_id:this.login_info.user_id
      }
      sessionStorage.removeItem('cartdata');
      this.cs.ticketbooking(data).then(res => {
        if(res['status'] == 'success'){
          Swal.fire({
            title: 'Success',
            text: res['message'],
            icon: 'success',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/myaccount');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // this.router.navigateByUrl('/register');
            }
          })
        }
      },error => {
        if(error['status'] == 401){
          let er = error['error'];
          this.toastr.error(er.message, er.error, {
            progressBar:true
          });
          return;
        }
      })

    }else{
      let data = {
        data:this.cartdata,
        user_id:this.login_info.user_id
      }
      sessionStorage.removeItem('cartdata');
      this.cs.ticketbooking(data).then(res => {
        if(res['status'] == 'success'){
          Swal.fire({
            title: 'Success',
            text: res['message'],
            icon: 'success',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/myaccount');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // this.router.navigateByUrl('/register');
            }
          })
        }
      },error => {
        if(error['status'] == 401){
          let er = error['error'];
          this.toastr.error(er.message, er.error, {
            progressBar:true
          });
          return;
        }
      })
    }
    // let data = [];
    // this.cartdata.forEach(d => {
    //   data.push({match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_img:d.team_one_img,
    //     team_two:d.team_two,team_two_img:d.team_two_img,ticket:d.ticket,ticket_price:d.ticket_price,user_id:this.login_info.user_id
    //   })
    // })
    let cartdata = {
      match_id:this.cartdata[0].match_id,
      match_type: this.cartdata[0].match_name,
      matchdate:this.cartdata[0].matchdate,
      team_one:this.cartdata[0].team_one,
      team_one_img:this.cartdata[0].team_one_image,
      team_two:this.cartdata[0].team_two,
      team_two_img:this.cartdata[0].team_two_image,
      ticket:this.cartdata[0].ticket,
      ticket_price:this.cartdata[0].ticket_price,
      user_id:this.login_info.user_id

    }

  }

  ticketremovefromcart(data){
    this.total_price = 0;
    this.total_ticket = 0;
    let index = this.cartdata.findIndex(d => d.match_id === data.match_id);
    this.cartdata.splice(index, 1);
    sessionStorage.setItem('cartdata',JSON.stringify(this.cartdata));
    this.cars.getticket(this.cartdata);
    let p = 0;
    this.cartdata.forEach(d => {
      this.removecartdata.push({match_id:d.match_id,match_name:d.match_name,match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_image:d.team_one_image,
        team_two:d.team_two,team_two_image:d.team_two_image,ticket:d.ticket,ticket_price:d.ticket_price,
        start_time:d.start_time});
        this.total_ticket = this.cartdata.length;
        let tp =  d.ticket_price;
        p += +tp;
        this.total_price = p.toFixed(2);
    })
    if(this.cartdata.length == 0){
      this.isshowticketprice = false;
      this.nocartdata = true;
    }
    this.toastr.info('Ticket Removed from Cart.', 'Info', {
      progressBar:true,
      timeOut:3000
    });
  }

}
