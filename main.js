//button
const btn = document.getElementById("btn");

//result
const result = document.getElementById("result");

//checkbox
let noodleElement = document.getElementById("noodle");
let riceElement = document.getElementById("rice");
let boxedLunchElement = document.getElementById("boxedLunch");
let goodElement = document.getElementById("good");
let othersElement = document.getElementById("others");
let checkBoxList = [noodleElement , riceElement , boxedLunchElement , goodElement , othersElement];

//勾選狀態List
let checkedList = [];

//sort
let sortList = [
    {
        name : "noodle",
        filter : true
    },
    {
        name : "rice",
        filter : true
    },
    {
        name : "boxedLunch",
        filter : true
    },
    {
        name : "good",
        filter : true
    },
    {
        name : "others",
        filter : true
    }
];
let mealCheckedList = [];

//checked determine
function checkedDetermine (){

    //復歸sortList的filter
    sortList.forEach((element)=>{
        element.filter = true;
    });

    //勾選判斷
    mealCheckedList = [];
    checkedList = checkBoxList.map((element)=>{
        if(element.checked){
            return true;    //有勾為True
        }else{
            return false;   //沒勾為false
        }
    });

    //把有勾選的選項對照sortList切換true/false
    if(checkedList.includes(true)){ //有勾才改,沒勾就全部都維持true
        checkedList.forEach((element , index)=>{
            if(element == false){
                sortList[index].filter = false;
            }
        });
    }
};

//獲取JSON
let mealData = [];
fetch('mealList.json')
  .then(res => res.json())
  .then(data => mealData = data)
  .catch(error => console.log(error));

//產生過濾後的清單
let filteredList = [];
function generateFilteredList (){
    filteredList = [];
    sortList.forEach((target)=>{
        //如果該類型有勾選
       if(target.filter === true) {
            //就找出mealData內分類是該類型的店家放入過濾清單中
            mealData.forEach((element)=>{
                if(element.category.includes(target.name)){
                    filteredList.push(element.name);
                }
            });
       }
    });
}

//產生結果
let mealResult;
function generateResult (){
    let random = Math.floor(Math.random() * filteredList.length);
    mealResult = filteredList[random];
    result.innerHTML = mealResult + "!";
}

//show emoji思考
let emoji = document.getElementById("emojiThinking");
function showEmoji (){
    emoji.style.visibility = "visible";
}
//hide emoji思考
function hideEmoji (){
    emoji.style.visibility = "hidden";
}

//按鈕執行動作
btn.addEventListener("click" , ()=>{
    showEmoji();

    setTimeout(() => {
        checkedDetermine();
        generateFilteredList();
        generateResult();
        console.log(filteredList);
        hideEmoji();
    },700)

});