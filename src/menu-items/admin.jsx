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
			id: 'order',
			title: '발주 관리',
			url: 'order',
			type: 'item'
		},
		{
			id: 'finance',
			title: '재무 관리',
			url: 'finance',
			type: 'item'
		},
	]
};

export default {items: [adminPages]};