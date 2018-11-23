let images = [
    {
    name:"rabbit",
    link: "img/p1.jpg",
    tags: ["Animators", "Illustrators"]
    },
    {
    name:"field",
    link: "img/p2.jpg",
    tags: ["Photographers", "Filmmakers"]
    },
    {
    name:"deer",
    link: "img/p3.jpg",
    tags: ["Photographers", "Filmmakers"]
    },
    {
    name:"new york city map",
    link: "img/p4.jpg",
    tags: ["Designers"]
    },
    {
    name:"musician",
    link: "img/p5.jpg",
    tags: ["Photographers", "Filmmakers"]
    },
    {
    name:"emblem",
    link: "img/p6.jpg",
    tags: ["Illustrators", "Designers"]
    },
    {
    name:"bike",
    link: "img/p7.jpg",
    tags: ["Photographers"]
    },
    {
    name:"aqua",
    link: "img/p8.jpg",
    tags: ["Designers"]
    },
    {
    name:"ghost",
    link: "img/p9.jpg",
    tags: ["Animators", "Illustrators"]
    }
];
let imgGallery = document.getElementById('gallery');
let search = document.getElementById('filter-search');

let buttons = document.getElementById('buttons');
let tagged = [];

let currentImgs = imgGallery.getElementsByTagName('img');
let counter=0;
for(let i of images) {
  let newImg = new Image(300, 150);
  newImg.src = i.link;
  newImg.dataset.tags = '';
  newImg.alt = i.name;
  for (let tag of i.tags){
    if (counter === 0) {
      newImg.dataset.tags += tag.toLowerCase();
    } else {
      newImg.dataset.tags += ',' + tag.toLowerCase();
    }
    counter++;
  }
  imgGallery.appendChild(newImg);
  counter = 0;
}

function filter() {                     // Declare filter() function
  let query = this.value.trim().toLowerCase();  // Get the query

  for (let oneImg of currentImgs) {
    //console.log(oneImg);
    if (oneImg.alt.includes(query) === true){
      oneImg.hidden = false;
    } else {
      oneImg.hidden = true;
    }
  }
};

search.addEventListener("input", filter);         // Use input event to call filter()

//adding all the tags to tagged
for (let oneImg of currentImgs) {
  let tags = oneImg.dataset.tags;
  let splitTags = tags.split(',');

  for(let tagName of splitTags) {
    if (tagged[tagName] == null && tagName !== "") {
      tagged[tagName] = [];
    }
    if (tagName !== "") {
      tagged[tagName].push(oneImg);
    }
  };
};


// adding the showAll button
let showAll = document.createElement('button');
showAll.className = 'active';
showAll.textContent = 'Show All';
showAll.onclick = function(){
  showAll.classList.add('active');
  allButtons = buttons.getElementsByTagName('button');
  for (bttns of allButtons) {
    if (bttns.textContent !== showAll.textContent) {
      bttns.classList.remove('active');
    }
  }
  for (oneImg of currentImgs) {
    oneImg.style.display = '';
  };

};

buttons.appendChild(showAll);

// adding the filter tag buttons
for (let oneTag in tagged) {
  let button = document.createElement('button');
  button.textContent = oneTag + ' (' + tagged[oneTag].length + ')';
  button.onclick = function() {
    button.classList.add('active');
    allButtons = buttons.getElementsByTagName('button');
    for (bttns of allButtons) {
      if (bttns.textContent !== button.textContent) {
        bttns.classList.remove('active');
      }
    }
    for(let oneImg of currentImgs) {
      console.log(oneImg.dataset.tags);
      let splitTags = oneImg.dataset.tags.split(',');
      console.log(splitTags);
      if (splitTags.includes(oneTag) === true) {
        oneImg.style.display = '';
      } else {
        oneImg.style.display = 'none';
      }
    };
  }
  buttons.appendChild(button);
};
