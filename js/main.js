let sideBarWidth = ($(".col-10").innerWidth())
$(".sideBar").css("left",`-${sideBarWidth}px`)


$("#sidebarTabClose").on("click",function(){
    let left = $(".sideBar").css("left")
    if(left=="0px"){
        $('.sideBar').animate({left: `-${sideBarWidth}px`},1000);
    } else {
        $('.sideBar').animate({left: `0px`},1000);
    }
})
console.log($(".sidebarTabClose").html());
$('.sidebarTabIcons,.sideBarListIcons,.sidebarTabClose').css("cursor","pointer")