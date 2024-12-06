import { setBreadcrumb } from "@/stores";
import { Helmet } from "react-helmet-async";

const Head = ({ title = "", description = "", breadcrumb }) => {
	setBreadcrumb(breadcrumb);
	return (
		<Helmet title={title} defaultTitle="AniSage">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

			<meta name="description" content={description} />
		</Helmet>
	);
};

export default Head;
