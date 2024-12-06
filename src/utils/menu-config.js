export const MENU_CONFIG = [
	{
		title: "Crawler",
		icon: "/images/note-text.svg",
		children: [
			{
				title: "Rumanhua",
				link: "/rumanhua",
				router: ["/rumanhua", "/rumanhua/create", "/rumanhua/:id", "/chapter/", "/chapter/create/", "/chapter/:id/"],
			},
		],
	},
	// {
	// 	title: "Public",
	// 	icon: "/images/note-text.svg",
	// 	link: "/public",
	// 	router: ["/public", "/public/create", "/public/:id", "/public/", "/public/create/", "/public/:id/"],
	// },
	// {
	// 	title: "Contact",
	// 	icon: "/images/note-text.svg",
	// 	link: "/contact",
	// 	router: ["/contact"],
	// },
];
