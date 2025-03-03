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
    console.log(result.properties.limit_day.date.start);
		console.log(result.properties.payment.select.name)
			
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${result.properties.clients.title[0].text.content}</span>
      <span>${result.properties.work_title.rich_text[0].text.content}</span>
      <span><button class="list-work" data-page="${result.id}" data-key="${result.properties.worklist.url}">${result.properties.order.select.name}</button></span>
      <span class="list-status" style= "color: ${result.properties.status.status.color}"> ${result.properties.status.status.name}</span>
      <span><label for="date"><input type="date" id="date" name="date" value="${result.properties.limit_day.date.start}"></label></span>
      <span>${result.properties.weight.number?result.properties.weight.number+'kg':''}</span>
      <span>${result.properties.price.formula.number?(result.properties.price.formula.number).toLocaleString('en-US')+'원':''}</span>

      <label for="payment">
        <select id="payment" name="payment" value="${result.properties.payment.select.name}">
          <option value="결재전">결재전</option>
          <option value="결재완료">결재완료</option>
          <option value="외상">외상</option>
        </select>
      </label>

      <span><button class="delete" style="background-color:red;color:white;">삭제</button></span>`;
    li.classList.add('list', 'grid');
    list_ul.appendChild(li);
    /*li에 이벤트리스너 삽입*/
  }
  
  
  /*작업내역 클릭시*/
  const list_works = document.querySelectorAll('.list-work');
  
  list_works.forEach(list_work=>{
    list_work.addEventListener('click',async function(){
      const url_key = "https://shrill-hill-66e0.nameofwind.workers.dev/"+this.getAttribute('data-key');
      const pageId = this.getAttribute('data-page')
      const order = this.textContent
      console.log(pageId,order)
      const res = await fetch(url_key);
      if (res.ok) {
        const htmlText = await res.text();
        const newWindow = window.open();
        newWindow.document.write(htmlText);
        newWindow.document.close();
        newWindow.onload = function() {
          newWindow.getValue(pageId,order)
        };
      } else {
        console.error('failed to load kv html document:', res.status);
      }
    })
  })
})







