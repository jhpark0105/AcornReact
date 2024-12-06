// ==============================|| MENU ITEMS - ADMIN PAGES ||============================== //

const adminPages = {
	id: 'group-admin',
	title: '메뉴',
	type: 'group',
	url: 'admin', 
	children: [
		{
			id: 'dashboard',
			title: '대시보드',
			url: 'dashboard',
			type: 'item'
		},
		{
			id: 'notice',
			title: '공지사항',
			url: 'notice',
			type: 'item'
		},
		{
			id: 'orders',
			title: '발주 관리',
			url: 'orders',
			type: 'item'
		},
		{
			id: 'financial',
			title: '재무 관리',
			url: 'financial',
			type: 'item'
		},
	]
};

export default {items: [adminPages]};