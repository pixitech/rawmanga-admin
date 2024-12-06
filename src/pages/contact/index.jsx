import Head from "@/components/head";
import ListComponentContact from "@/features/contact";

const ContactContainer = () => {
	return (
		<>
			<Head
				title="Contact"
				breadcrumb={{
					title: "Contact",
					breadcrumb: [],
				}}
			/>
			<ListComponentContact />
		</>
	);
};
export default ContactContainer;
