/**
 * breadcrumbs 네비게이션
 * : 탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해준다.
 *   브레드크럼을 통해 사용자는 탐색 중인 화면의 상위 수준 화면으로 이동할 수 있다.
 * 출처 : https://uiux.egovframe.go.kr/guide/component/component_03_03.html
 */

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
	id: 'group-erp',
	title: '메뉴',
	type: 'group',
	url: 'main' /* 요청 URL : '/'를 작성하면 절대경로로 인식한다. */,
	children: [
		{
			id: 'dashboard',
			title: '대시보드',
			url: '/main/dashboard' /* '/'를 작성하면 전체경로를 입력해야한다. */,
			type: 'item'
		},
		{
			id: 'customer',
			title: '고객 관리',
			url: '/main/customer', /* 부모 경로부터 누적된 상대경로를 요청 */
			type: 'item'
		},
		{
			id: 'member',
			title: '직원 관리',
			url: '/main/member',
			type: 'item'
		},
		{
			id: 'service',
			title: '서비스 관리',
			url: '/main/service',
			type: 'item'
		},
		{
			id: 'reservation',
			title: '예약 관리',
			url: 'reservation' /* '/main/reservation' 페이지 요청 */,
			type: 'collapse',
			children: [
				{
					id: 'status',
					title: '예약 대기',
					url: '/main/reservation',
					type: 'item'
				},
				{
					id: 'payment',
					title: '예약 현황',
					url: '/main/payment',
					type: 'item'
				}
			]
		},
		{
			id: 'product',
			title: '상품 관리',
			url: 'productB',
			type: 'collapse',
			children: [
				{
					id: 'product_b',
					title: '대분류',
					url: '/main/productB',
					type: 'item'
				},
				{
					id: 'product_s',
					title: '소분류',
					url: '/main/productS',
					type: 'item'
				}
			]
		},
		{
			id: 'chat',
			title: '채팅 관리',
			url: '/main/chat',
			type: 'item'
		},
		{
			id: 'notice',
			title: '공지사항',
			url: '/main/notice',
			type: 'item'
		}
		// {
		//   id: "logout",
		//   title: "로그아웃",
		//   url: 'logout',
		//   type: "item",
		// },
	]
};

export default pages;
