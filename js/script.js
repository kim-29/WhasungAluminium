/*window를 load 할 때 list update 할 수 있도록 수정*/
const book = {
      "diesbook": {
        /*형번호:무게(kg/m)*/
        "3036":0.760,
				"100D-3201(도어)":0.655,
				"100D-3307-5(도어)":1.633,
				"100D-3903(도어)":1.230,
				"100SL-516":0.909,
				"1102(오사이 : 벙어리)":0.210,
				"1103(오사이)":0.243,
				"1103-1(오사이)":0.222,
				"1110(오사이)":0.172,
				"1116(오사이)":0.150,
				"1116-1(오사이)":0.138,
				"1132(오사이)":0.213,
				"2106(30mm앵글 3T)":0.464,
				"2106-1(30mm앵글 1.6T)":0.238,
				"2106-2(30mm앵글 1T)":0.191,
				"2106-4(30mm앵글 2T)":0.266,
				"2132(45mm앵글 1T)":0.211,
				"2139(50mm앵글 2T)":0.537,
				"3000(100X100mm 각 파이프)":1.266,
				"3001(100X45mm 각 파이프)":0.792,
				"3010(120X45mm 각 파이프)":1.267,
				"3081(80X35mm 각 파이프)":0.758,
				"3206(미니도어)":0.652,
				"3501(도어 후라)":0.154,
				"3502(도어 후라)":0.153,
				"3603(도어 다리)":0.146,
				"3800(80X80mm 각 파이프)":0.826,
				"4200(10X20mm 각 파이프)":0.189,
				"4203(25X25mm 각 파이프)":0.281,
				"4204(45X45mm 각 파이프)":0.551,
				"4206(40X20mm 각 파이프)":0.270,
				"4207(35X35mm 각 파이프)":0.412,
				"45P-16-1(창문)":0.480,
				"45P-19(창틀)":0.476,
				"80SL-508-1":0.598,
				"COR-100(코너 바)":1.101,
				"CW-4464(마리온)":2.611,
				"CW-5169(마리온)":1.668,
				"CW-726(마리온)":0.349,
				"GAL-1(겔러리)":0.215,
				"GAL-17(겔러리)":0.301,
				"GAL-18(겔러리)":0.379,
				"GAL-4-1(겔러리)":0.234,
				"HAT130SL-103":1.736,
				"HAT130SL-601":1.055,
				"HAT130SL-801":0.375,
				"N560016(마리온)":0.325,
				"NS112-B":0.641,
				"NS112-D":1.365,
				"NS112SL-104":1.158,
				"NS112SL-401":0.599,
				"NS112SL-403":0.606,
				"NS112SL-404":0.592,
				"NS112SL-417":0.556,
				"NS112SL-601":1.308,
				"NS112SL-602":1.283,
				"NS112SL-603":1.078,
				"NS112SL-604":1.046,
				"NS112SL-605":0.969,
				"NS112SL-607":1.234,
				"NS112SL-622":0.967,
				"NS112SL-701":0.637,
				"NS112SL-701-A":0.248,
				"NS112SL-702":0.687,
				"NS112SL-704":0.724,
				"NS112SL-707":0.692,
				"NS112SL-801":0.629,
				"NS112SL-802":0.673,
				"NS112SL-804":0.697,
				"NS112SL-805":0.670,
				"NS112SL-807":0.677,
				"NS85SL-401":0.413,
				"NS85SL-601":0.503,
				"NS88SL-114":0.886,
				"NS88SL-403":0.419,
				"NS85SL-603":0.518,
				"NS88SL-701":0.529,
				"NS88SL-703":0.490,
				"NS88SL-801":0.464,
				"NS88SL-803":0.459,
				"RP-19*17(19mm 파이프)":0.147,
				"RP-25*22.6(25mm 파이프)":0.215,
				"SC-19":0.327,
				"SC-20":0.340,
				"SC-21":0.095,
				"SC-5":0.326,
				"SC-8":0.172,
				"SC-9":0.147,
				"SPA-1501":0.916,
				"SWL-F-50(마리온)":2.155,
				"SWL-F-51(마리온)":1.690,
				"SWL-F-64(마리온)":1.931,
				"SWL-F-8(마리온)":1.761,
				"SWL-F-86(마리온)":1.860,
				"SWL-GB-2(마리온)":0.482,
				"SWL-MD-2(마리온)":0.470,
				"SWL-MD-4(마리온)":0.388,
				"SWL-PF-5(마리온)":1.043,
				"SWL-V-10(마리온)":1.263,
				"SWL-V-6(마리온)":1.237,
				"TB-A3123":1.531,
				"TBSW230SL-101":3.246,
				"TBSW230SL-601":0.869,
				"TBSW230SL-602":1.048,
				"TBSW230SL-801":0.370,
				"TBSW230SL-GB28(오사이)":0.140,
      },
      "colorbook": {
        /*색상바 단가*/
        "헨켈": 10500,
        "메탈실버": 11000,
        "백색": 11000,
        "검정색": 11500,
        "코팅색상": 12000,
      },
    }


let socket

/*websocket connect*/
socket = new WebSocket('wss://whasung-websocket.onrender.com');
connectWebSocket();

window.addEventListener('load',async ()=>{
	  const soundButton = document.querySelector('.soundButton')
		soundButton.addEventListener('click', function() {
			
			const soundEnabled = localStorage.getItem('soundEnabled');
			if(soundEnabled==='true'){
				soundButton.innerHTML="소리켜짐";
				soundButton.style="background-color:dodgerblue"
				localStorage.setItem('soundEnabled', 'false'); // 상태 저장
			}else{
				soundButton.innerHTML="소리꺼짐";
				soundButton.style="background-color:"
				const audio = new Audio('./sound/sound.mp3');
				audio.play().then(() => {
					console.log('오디오 재생 성공!');
					localStorage.setItem('soundEnabled', 'true'); 
					
					// 상태 저장
				}).catch(error => {
						console.error('오디오 재생 실패:', error);
				});	
				
			}
		});
	const soundEnabled = localStorage.getItem('soundEnabled');
	if(soundEnabled==='true'){
		soundButton.innerHTML="소리꺼짐";
		soundButton.style="background-color:red"
		console.log(soundEnabled)
	}else{
		soundButton.innerHTML="소리켜짐";
		soundButton.style="background-color:dodgerblue"
		console.log(soundEnabled)
	}
	

	
  data = await getData();
		
	/*data update*/
	putData(data.database)
  
	/*작업내역 클릭시*/
		const list_works = document.querySelectorAll('.list-work');
		console.log(list_works)
		list_works.forEach(list_work=>{
			list_work.addEventListener('click',async function(){
				const url_key = "https://shrill-hill-66e0.nameofwind.workers.dev/"+this.parentElement.parentElement.getAttribute('data-key');
				const work_Id = this.parentElement.parentElement.getAttribute('data-id')

				const order = this.textContent
				const res = await fetch(url_key);
				if (res.ok) {
					const htmlText = await res.text();
					console.log(htmlText);
					const newWindow = window.open();
					newWindow.document.write(htmlText);
					newWindow.document.close();
					newWindow.onload = function() {
						newWindow.getValue(work_Id,order)
					};
				} else {
					console.error('failed to load kv html document:', res.status);
				}
			})
		})

	/*금액확인 클릭시*/
		const prices = document.querySelectorAll('.price');
		prices.forEach(price=>{
			price.addEventListener('click', async function(){
				const work_Id=this.parentElement.parentElement.getAttribute('data-id')
				try{
					const res = await fetch('https://shrill-hill-66e0.nameofwind.workers.dev/',{
						method:'PUT',
						headers:{'Content-Type': 'application/json'},
						body:JSON.stringify({button_name:"금액확인",id:work_Id})
					})
					if(res.ok){
						const response = await res.json();		
						console.log(response)
						const title = response.work[0].work_title
						const weight = response.work[0].weight
						const part_price = response.work[0].part_price
						const order = response.work[0].work_order
						const expect_weight = response.work[0].weight_sum
						const count_sum = response.work[0].count_sum
						const cost = response.work[0].cost
						const result_items = response.list

						let price_html = document.createElement('html');
						
						price_html.innerHTML = `
							<!DOCTYPE html>
							<html lang="ko">
							<head>
								<meta charset="UTF-8">
								<title>price window</title>
								<link rel="stylesheet" href="./css/styles.css">
							</head>
							<body>
								<section class="price-container container">
									<h1 class="section-title">판매가격</h1>
									<ul class="price-list">
										<li class="title price">
											<span>형번호</span><span>길이</span><span>색상</span><span>총무게(kg)/수량</span><span>단가</span><span>금액</span>
										</li>
									</ul>
								</section>
							</body>
							</html>`
						
						let item_price =0,sum=0;
						
						
						let weight_ratio = weight/expect_weight
						prices_list = price_html.querySelector('.price-list')
						
						result_items.forEach(result_item=>{
							elements = document.createElement('li')
							if(result_item.length!=0){
								item_weight = Math.round((book.diesbook[result_item.barname]*result_item.length/1000*weight_ratio)*100)/100	
							}else{
								item_weight = 0
							}
							
							color_price = book.colorbook[result_item.color]
							
							item_price = Math.round(color_price*item_weight/100)*100
							elements.innerHTML=`
								<span>${result_item.barname}</span>
								<span>${result_item.length.toLocaleString("en-US")}</span>
								<span>${result_item.color}</span>
								<span>${item_weight.toLocaleString("en-US")}</span>
								<span>${color_price.toLocaleString("en-US")}</span>
								<span>${item_price.toLocaleString("en-US")}</span>`
							elements.classList.add('price', 'price-item')
							prices_list.appendChild(elements)
							sum = sum + item_price
							
						})

						/*자재비 소계 예상견적가*/
						elements = document.createElement('li')
						elements.innerHTML=`
								<span>자재비 소개</span>
								<span></span>
								<span></span>
								<span>${weight}</span>
								<span></span>
								<span>${sum.toLocaleString("en-US")}</span>`
						elements.classList.add('price', 'price-item')
						prices_list.appendChild(elements)		

						/*제작비(인건비) 예상견적가*/
						if(order!='절단 작업'){
							elements = document.createElement('li')
							switch(title){
								case "방범창살(고시)" ||"겔러리(환풍구)":
									sumValue = count_sum
									break;
								case "45mm 프로젝트 윈도우" ||"88mm 슬라이딩 윈도우" ||"112mm 슬라이딩 윈도우" || "130mm 슬라이딩 윈도우" || "230mm 슬라이딩 윈도우":
									sumValue = weight
									break;
								default:
									sumValue = 0;//other(기타자재)의 경우에 해당됨
									break;
							}
							elements.innerHTML=`
									<span>인건비(제작비)</span>
									<span></span>
									<span></span>
									<span>${sumValue}</span>
									<span>${cost}</span>
									<span>${(sumValue*cost).toLocaleString("en-US")}</span>`
							elements.classList.add('price', 'price-item')
							prices_list.appendChild(elements)		
							sum = sum+sumValue*cost
						}
						/*부속(소모품비) 예상견적가*/
						elements = document.createElement('li')
						elements.innerHTML=`
								<span>부속(소모품비)</span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span>${part_price.toLocaleString("en-US")}</span>`
						elements.classList.add('price', 'price-item')
						prices_list.appendChild(elements)		
						sum = sum+part_price

						/*총 제작비*/
						elements = document.createElement('li')
						elements.innerHTML=`
								<span>판매금액</span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span>${sum.toLocaleString("en-US")}</span>`
						elements.classList.add('price', 'price-total')
						prices_list.appendChild(elements)	
						console.log(prices_list)
						
						/*판매금액 윈도우를 띄웁니다.*/
						const popupWidth = window.screen.width*2/3; // 새 창 너비
						const popupHeight = window.screen.height*2/3; // 새 창 높이

						// 화면 크기 가져오기
						const screenWidth = window.screen.width; // 화면 너비
						const screenHeight = window.screen.height; // 화면 높이

						// 새 창의 중앙 위치 계산
						const leftPosition = (screenWidth - popupWidth) / 2;
						const topPosition = (screenHeight - popupHeight) / 2;
						let price_Window = window.open('', '판매금액', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`);
						price_Window.document.write(price_html.innerHTML);
						price_Window.document.close();
					}else{
						alert('금액을 확인할 수 없습니다.')
					}
				}catch{
					console.log('fetch error')
				}
			})
		})
	/*작업기한 선택시*/
		const limits = document.querySelectorAll('.limit')
		limits.forEach(limit=>{
			limit.addEventListener('change',async function(){
				const work_Id=this.parentElement.parentElement.getAttribute('data-id')
				try{
					const res = await fetch("https://shrill-hill-66e0.nameofwind.workers.dev/",{
						method:'PUT',
						headers:{'Content-Type': 'application/json'},
						body:JSON.stringify({button_name:"작업기한",id:work_Id,limit_day:this.value})
					})
					if(res.ok){
						console.log('change limit date')
					}else{
						console.log('change limit date error');
					}
				}catch(error){
					alert("데이터베이스에 반영되지 않았습니다. 다시 시도하세요")
					console.log(error)
				}
			})
		})



	/*결재상태 선택시*/
		const payments = document.querySelectorAll('.payment')
		payments.forEach(payment=>{
			payment.addEventListener('change',async function(){
				const work_Id=this.parentElement.parentElement.getAttribute('data-id')
				try{
					const res = await fetch("https://shrill-hill-66e0.nameofwind.workers.dev/",{
						method:'PUT',
						headers:{'Content-Type': 'application/json'},
						body:JSON.stringify({button_name:"결제상태",id:work_Id,payment:this.value})
					})
					if(res.ok){
						console.log('change payment')
					}else{
						console.log('change payment error');
					}	
				}catch(error){
					alert("데이터베이스에 반영되지 않았습니다. 다시 시도하세요")
					console.log(error)
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


/*websocket connect function*/
function connectWebSocket() {
	
	socket = new WebSocket('wss://whasung-websocket.onrender.com');
	
	
	socket.onopen = () => {
		console.log('WebSocket 연결 성공!');
	};
	
	
	socket.onmessage = (event) => {
		if(event.data=='update'){
			location.reload(); // 새로고침
		}else{
			const soundEnabled = localStorage.getItem('soundEnabled');
			if (soundEnabled === 'true') {
        const audio = new Audio('./sound/sound.mp3');
        audio.play().catch(error => {
          console.error('오디오 재생 실패:', error);
        });
				// 효과음이 끝난 후에 reload 실행
				audio.onended = function () {
					location.reload(); // 페이지 새로고침	
				};
			}
		}
	};
	
	socket.onclose = () => {
		console.log('WebSocket 연결 종료. 다시 연결 시도 중...');
		setTimeout(connectWebSocket, 1000); // 1초 후 다시 연결
	};
	
	socket.onerror = (error) => {
		console.error('WebSocket 오류:', error);
		socket.close(); // 오류 발생 시 연결 종료
	};
	
}


/*get Notion Page*/
async function getData() {
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

/*dataUpdate*/
function putData(database){
	console.log('database:',database);
	const list_ul = document.querySelector('.lists');
  for (let i = 0; i < database.results.length; i++) {
    const result = database.results[i];
		console.log(result);
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${result.client}</span>
      <span>${result.work_title}</span>
      <span><button class="list-work">${result.work_order}</button></span>
      <span class="list-status"> ${result.work_status}</span>
      <span><input type="date" class="limit" aria-label="limit" value="${result.limit_day}"></span>
      <span>${result.weight==null?"":result.weight+'kg'}</span>
      <span><button class="price" style="background-color:purple">금액확인</button></span>

      <span>
        <select class="payment" aria-label="payment">
					<option value="결제전" ${result.ppayment === "결제전" ? "selected" : ""}>결제전</option>
					<option value="결제완료" ${result.payment === "결제완료" ? "selected" : ""}>결제완료</option>
					<option value="외상" ${result.payment=== "외상" ? "selected" : ""}>외상</option>
        </select>
      </span>

      <span><button class="delete" style="background-color:red;color:white;">삭제</button></span>`;
    li.classList.add('list', 'grid');
		li.setAttribute('data-key',result.worklist)
		li.setAttribute('data-id',result.id)
    list_ul.appendChild(li);
    /*li에 이벤트리스너 삽입*/
  }
}


