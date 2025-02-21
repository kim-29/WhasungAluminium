/*window를 load 할 때 list update 할 수 있도록 수정*/


window.addEventListener('load',async ()=>{
  async function getNotionPage() {
    const url = 'https://shrill-hill-66e0.nameofwind.workers.dev';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log(`Failed to retrieve data: ${response.status}`);
    }

  }

  const data = await getNotionPage();
  console.log(data);
  
  const list_ul = document.querySelector('.lists');
  for (let i = 0; i < 20 && i < data.results.length; i++) {
    const result = data.results[i];
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${result.properties.clients.title[0].text.content}</span>
      <span><button class="list-work" data-key="${result.properties.worklist.url}">작업내용</button></span>
      <span class="list-status">${result.properties.status.status.name}</span>
      <span class="request-day">${new Date(result.properties["request day"].created_time).toLocaleDateString('ko-KR')}</span>
      <span>${result.properties.weight.number===null?"":result.properties.weight.number}</span> <span>${result.properties.price.formula.string===null?"":result.properties.price.formula.string}</span>`;
    li.classList.add('list', 'grid');
    list_ul.appendChild(li);
    /*li에 이벤트리스너 삽입*/
  }
  const list_works = document.querySelectorAll('.list-work');
  
  list_works.forEach(list_work=>{
    list_work.addEventListener('click',async function(){
      const url_key = "https://shrill-hill-66e0.nameofwind.workers.dev/"+this.getAttribute('data-key');
      console.log(url_key)
      const res = await fetch(url_key);
      if (res.ok) {
        const htmlText = await res.text();
        const newWindow = window.open();
        newWindow.document.write(htmlText);
        newWindow.document.close();
      } else {
        console.error('failed to load kv html document:', res.status);
      }
    })
  })
  
    /**/
})







