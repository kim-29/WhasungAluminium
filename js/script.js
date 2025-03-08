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
      <span>${result.properties.work_title.rich_text[0].text.content}</span>
      <span><button class="list-work">${result.properties.order.select.name}</button></span>
      <span class="list-status" style= "color: ${result.properties.status.status.color}"> ${result.properties.status.status.name}</span>
      <span><input type="date" class="limit" aria-label="limit" value="${result.properties.limit_day.date.start}"></span>
      <span>${result.properties.weight.number?result.properties.weight.number+'kg':''}</span>
      <span>${result.properties.price.formula.number?(result.properties.price.formula.number).toLocaleString('en-US')+'원':''}</span>

      <span>
        <select class="payment" aria-label="payment">
					<option value="결재전" ${result.properties.payment.select.name === "결재전" ? "selected" : ""}>결재전</option>
					<option value="결재완료" ${result.properties.payment.select.name === "결재완료" ? "selected" : ""}>결재완료</option>
					<option value="외상" ${result.properties.payment.select.name === "외상" ? "selected" : ""}>외상</option>
        </select>
      </span>

      <span><button class="delete" style="background-color:red;color:white;">삭제</button></span>`;
    li.classList.add('list', 'grid');
		li.setAttribute('data-page',result.id);
		li.setAttribute('data-key',result.properties.worklist.url)
    list_ul.appendChild(li);
    /*li에 이벤트리스너 삽입*/
  }
	
	
	/*작업내역 클릭시*/
		const list_works = document.querySelectorAll('.list-work');

		list_works.forEach(list_work=>{
			list_work.addEventListener('click',async function(){
				console.log('hello world')
				const url_key = "https://shrill-hill-66e0.nameofwind.workers.dev/"+this.parentElement.parentElement.getAttribute('data-key');
				const pageId = this.parentElement.parentElement.getAttribute('data-page')

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


	/*작업기한 선택시*/
		const limits = document.querySelectorAll('.limit')
		limits.forEach(limit=>{
			limit.addEventListener('change',async function(){
				const pageId=this.parentElement.parentElement.getAttribute('data-page')
				const res = await fetch("https://shrill-hill-66e0.nameofwind.workers.dev/",{
					method:'PUT',
					headers:{'Content-Type': 'application/json'},
					body:JSON.stringify({button_name:"작업기한",pageId:pageId,date:this.value})
				})
				if(res.ok){
					console.log('change limit date')
				}else{
					console.log('change limit date error');
				}
			})
		})



	/*결재상태 선택시*/
		const payments = document.querySelectorAll('.payment')
		payments.forEach(payment=>{
			payment.addEventListener('change',async function(){
				const pageId=this.parentElement.parentElement.getAttribute('data-page')
				const res = await fetch("https://shrill-hill-66e0.nameofwind.workers.dev/",{
					method:'PUT',
					headers:{'Content-Type': 'application/json'},
					body:JSON.stringify({button_name:"결재상태",pageId:pageId,status:this.value})
				})
				if(res.ok){
					console.log('change limit date')
				}else{
					console.log('change limit date error');
				}
			})
		})
	
	/*삭제버튼 클릭시*/
	const del_btns = document.querySelectorAll('.delete')
	del_btns.forEach(del_btn=>{
		del_btn.addEventListener('click',async function(){
			alert('삭제 버튼은 아직 구현되지 않았습니다.')
		})
	})
	
})






