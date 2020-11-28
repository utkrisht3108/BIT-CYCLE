function party1(){
     var part1 = document.querySelector(".part1");
     var checkRadio = document.querySelector('input[name="exist"]:checked');
     console.log(checkRadio);
     if(checkRadio!=null){
          part1.classList.remove("hidden");
          console.log("haha");
     }
}
function party2(){
     var part1 = document.querySelector(".part1");
     var checkRadio = document.querySelector('input[name="exist"]:checked');
     console.log(checkRadio);
     if(checkRadio!=null){
          part1.classList.add("hidden");
          console.log("sad");
     }
}
function party3(){
     var part1 = document.querySelector(".part2");
     var checkRadio = document.querySelector('input[name="exist1"]:checked');
     console.log(checkRadio);
     if(checkRadio!=null){
          part1.classList.remove("hidden");
          console.log("haha");
     }
}
function party4(){
     var part1 = document.querySelector(".part2");
     var checkRadio = document.querySelector('input[name="exist1"]:checked');
     console.log(checkRadio);
     if(checkRadio!=null){
          part1.classList.add("hidden");
          console.log("sad");
     }
}
