function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function(){
     $(".sanchit").mouseover(function(){
         $("i").css("color","#818181");
     });
});
$(document).ready(function(){
     $(".account").mouseover(function(){
         $(".account1").css("color", "black");
     });
});
$(document).ready(function(){
     $(".mess").mouseover(function(){
         $(".mess1").css("color", "green");
     });
});
$(document).ready(function(){
     $(".mess").mouseover(function(){
         $(".mess1").css("color", "green");
     });
});
$(document).ready(function(){
     $(".wish").mouseover(function(){
         $(".wish1").css("color", "red");
     });
});
$(document).ready(function(){
     $(".edit").mouseover(function(){
         $(".edit1").css("color", "yellow");
     });
});
$(document).ready(function(){
     $(".phone").mouseover(function(){
         $(".phone1").css("color", "darkblue");
     });
});
$(document).ready(function(){
     $(".logout").mouseover(function(){
         $(".logout1").css("color", "brown");
     });
});