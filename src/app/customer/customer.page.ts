import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../providers/post-provider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {


  customers: any = [];
  limit: number = 13;
  start: number = 0;
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.customers = [];
    this.start  = 0;
    this.loadCustomer();
  }

  addCustomer(){
    this.router.navigate(['/addcustomer']);
  }

  updateCustomer(id,name,desc){
    this.router.navigate(['/addcustomer/' + id + '/' + name + '/' +desc]);
  }

  showCustomer(id,name,desc){
    this.router.navigate(['/showcustomer/' + id + '/' + name + '/' +desc]);
  }
   doRefresh(event){
     setTimeout(() =>{
       this.ionViewWillEnter();
       event.target.complete();
     }, 500);
   }

   loadData(event: any){
    this.start += this.limit;
    setTimeout(() =>{
    this.loadCustomer().then(()=>{
      event.target.complete();
    });
    }, 500);
   }


  delCustomer(id){
   
      let body = {
        aksi : 'delete',
        customer_id: id
      };
     
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
         this.ionViewWillEnter();
      });
  }

  loadCustomer(){
    return new Promise(resolve => {
      let body = {
        aksi : 'getdata',
        limit : this.limit,
        start : this.start,
      };
     
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let customer of data.result){
            this.customers.push(customer);
          }
          resolve(true);
      });
    });
  }
}
