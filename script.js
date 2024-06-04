let taskList = [];

const ttlHrsElm = document.getElementById("ttlHrs")
const savedHrsElm = document.getElementById("savedHrs")

const hoursperweek = 24*7;

const handleOnSubmit = (e) => {
  // const elm = document.getElementById("task")
  // console.log(elm.value)

  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hr = +newForm.get("hr");
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry"
  };

  //check if there is enough hours left
  
  taskList.push(obj);

  displayEntryList();
};

const displayEntryList = () => {
  console.log(taskList);
 let str = ""

  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === 'entry')

  entryList.map((item, i)=>{
    str += `
    <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td class="text-end">
        <button onclick ="handleOnDelete('${item.id}')"  class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        <button onclick = "switchTask('${item.id}', 'bad')" class="btn btn-success"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </td>
        </tr>`
  })

  entryElm.innerHTML = str;
taskTotal()
};

const displayBadList = () => {
    console.log(taskList);
   let str = ""
  
    const badElm = document.getElementById("badList");
  
    const badList = taskList.filter((item) => item.type === 'bad')
  
    badList.map((item, i)=>{
      str += `
      <tr>
          <td>${i + 1}</td>
          <td>${item.task}</td>
          <td>${item.hr}hr</td>
          <td class="text-end">
        
          <button onclick = "switchTask('${item.id}', 'entry')" class="btn btn-warning"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
          <button onclick ="handleOnDelete('${item.id}')"  class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </td>
          </tr>`
    })
  
    badElm.innerHTML = str;
  savedHrsElm.innerText = badList.reduce((acc, item) =>{
    return acc + item.hr
  }, 0)
  };

const randomIdGenerator = (length=6) =>{
const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"

let id = ""

for(i=0; i<6; i++){
   const randomIndex =  Math.floor(Math.random()* str.length); 

   id += str[randomIndex]
    }

    return id
}


const handleOnDelete = (id) =>{
    if(window.confirm("Are you sure you want to delete this?")){
    taskList = taskList.filter((item)=>item.id !== id)
 displayEntryList()
 displayBadList()
    }
}

const switchTask = (id, type) =>{
taskList = taskList.map((item)=>{
    if(item.id === id){
        item.type = type
    }
    return item
})
displayEntryList()
displayBadList()
}

const taskTotal = () =>{
const ttlHr = taskList.reduce((acc, item)=>{
    return acc +item.hr
},0);

ttlHrsElm.innerText = ttlHr
return ttlHr
}



