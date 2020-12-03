/* eslint-disable */
export default class Cycle {
    constructor(id, owner, model, comments,available,brand,color,accessories,images,forbuy,forrent,buyPrice) {
      this.id = id;
      this.owner=owner;
      this.model = model;
      this.el = null;
      this.comments = comments;
      this.available=available;
      this.brand=brand;
      this.color=color;
      this.accessories=accessories;
      this.images=images;
      this.forbuy=forbuy;
      this.forrent=forrent;
      this.buyPrice=buyPrice;
    }
    getelement() {
      var image_temp=this.get_image_template(this.images);
      var temp = this.gettemplate(
        this.model,
        this.brand,
        image_temp,
        this.buyPrice
      );
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      this.el = temp_div.children[0];
      this.eventlisterners();
      return this.el;
    }
    gettemplate(model,brand,image_temp,buyPrice) {
      return`
      <div class="col-lg-3 col-md-4 col-sm-6 ">
                        <div class="card  mb-4 box-shadow">
                            ${image_temp}
                            <div class="card-body">
                                <p class="card-text cycle-model">${brand}-${model}</p>
                                <div class="d-flex justify-content-between sidethoda1">
                                         <div class="row2 forbuy-btn">
                                             <button type="button" class="btn btn-md btn-primary neeche buy-btn">Buy</button>
                                             <div class="text-muted cycle-price neeche sidethoda"> ${buyPrice}rs</div>
                                         </div>
                                         <div class="row2 forrent-btn">
                                              <button type="button" class="btn btn-md btn-danger neeche book-btn">Book</button>
                                             <div class="text-muted cycle-price neeche sidethoda"> 20 rs/hr</div>
                                         </div>
                                </div>
                            </div>
                        </div>
                    </div>
      `;
      }
      eventlisterners(){
        const buybtn=this.el.querySelector(".buy-btn");
        const bookbtn=this.el.querySelector(".book-btn");
        buybtn.onclick= () =>{
          window.open("../selected_cycle/selected.html?id="+this.id+"&buybook=1");
        }
        bookbtn.onclick= () =>{
          window.open("../selected_cycle/selected.html?id="+this.id+"&buybook=2");
        }
        

      }
      get_image_template(images){
        if(images.length==0){
          return`
          <img class="card-img-top" src="../backend/img/cycle/b45d18c2d27a383e95d03bf5ddfe469c.jpg" alt="Card image cap">
          `;

        }
        else{
          return`
        <img class="card-img-top" src="../backend/img/cycle/${images[0]}" alt="Card image cap">
        `;

        }
      }
    }
    
  