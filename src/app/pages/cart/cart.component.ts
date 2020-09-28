import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/dataservice/cart.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import jsPDF from 'jspdf'


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
  login_info:any;
  nocartdata:boolean = false;

  title = 'ngx-qrcode-demo';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value :string;
  constructor(private cs: CartService,private router: Router) { 
    this.login_info = JSON.parse(sessionStorage.getItem('login_details'));
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
if(cart_session_data == null){
this.nocartdata = true;
}else{
cart_session_data.forEach(d => {
  this.cartdata.push({match_id:d.match_id,match_name:d.match_name,match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_image:d.team_one_img,
    team_two:d.team_two,team_two_image:d.team_two_img,ticket:d.ticket,ticket_price:d.ticket_price})
})
let ticket = this.cartdata[0].ticket;
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
    sessionStorage.removeItem('cartdata');
this.cs.ticketbooking(cartdata).then(res => {
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
  console.log(error);
})
  }

}
