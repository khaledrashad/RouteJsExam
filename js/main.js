import { mainData } from "./api.module.js"
let mainDataUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
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
$('.sidebarTabIcons,.sideBarListIcons,.sidebarTabClose').css("cursor","pointer")

mainData(mainDataUrl).then(data=>{
    console.log(data)
})