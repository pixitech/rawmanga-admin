export const STATUS_TITLE_ENUM = {
	ACTIVE: { key: "active", title: "Active" },
	INACTIVE: {
		key: "inactive",
		title: "Inactive",
	},
	REMOVED: {
		key: "deleted",
		title: "deleted",
	},
};
export const FILM_STATUS = {
	COMPLETED: { key: "completed", title: "Completed" },
	PROCESSING: {
		key: "processing",
		title: "Processing",
	},
	PENDING: {
		key: "pending",
		title: "Pending",
	},
};
export const STATUS_ENUM = {
	ACTIVE: "active",
	INACTIVE: "inactive",
};

export const STATUS_MAPPING_ENUM = {
	NOT_YET_MAPPED: "not-yet-mapped",
	SUCCESSFULLY_MAPPED: "successfully-mapped",
	MAPPING_FAILED: "mapping-failed",
};

export const STATUS_MAPPING_TITLE_ENUM = {
	SUCCESSFULLY_MAPPED: { key: "successfully-mapped", title: "Successfully mapped" },
	NOT_YET_MAPPED: {
		key: "not-yet-mapped",
		title: "Not yet mapped",
	},
	MAPPING_FAILED: {
		key: "mapping-failed",
		title: "Mapping failed",
	},
};

export const STATUS_MAPPING_SEARCH_ENUM = {
	NOT_YET_MAPPED: "not_yet_mapped",
	SUCCESSFULLY_MAPPED: "successfully_mapped",
	MAPPING_FAILED: "mapping_failed",
};

export const STATUS_REVIEW_TITLE_ENUM = {
	Rejected: {
		key: "reject",
		title: "Merge with self",
	},
	Pending: {
		key: "waiting",
		title: "Pending",
	},
	APPROVE: {
		key: "approve",
		title: "Approve",
	},
	DONE: {
		key: "done",
		title: "Done",
	},
};

export const MANGA_STATE = {
	0: "CRAWLED_BASIC_INFO",
	1: "CRAWLED_DETAIL_INFO",
	2: "CRAWLING_CHAPTER",
	3: "WAITING_NEW_CHAPTER",
};

export const MANGA_STATE_TO_STATUS = {
	CRAWLED_BASIC_INFO: "Crawled basic info",
	CRAWLED_DETAIL_INFO: "Crawled detail info",
	CRAWLING_CHAPTER: "Crawling chapter",
	WAITING_NEW_CHAPTER: "Waiting new chapter",
};

export const LIST_MANGA_STATUS = {
	CRAWLED_BASIC_INFO: { key: "CRAWLED_BASIC_INFO", title: "Crawled basic info" },
	CRAWLED_DETAIL_INFO: {
		key: "CRAWLED_DETAIL_INFO",
		title: "Crawled detail info",
	},
	CRAWLING_CHAPTER: {
		key: "CRAWLING_CHAPTER",
		title: "Crawling chapter",
	},
	WAITING_NEW_CHAPTER: {
		key: "WAITING_NEW_CHAPTER",
		title: "Waiting new chapter",
	},
};

export const CHAPTER_STATE = {
	0: "CRAWLING",
	1: "CRAWLED",
	2: "PROCESSING",
	3: "PROCESSED",
	4: "TRANSLATING",
	5: "TRANSLATED",
};

export const CHAPTER_STATE_TO_STATUS = {
	CRAWLING: "Crawling",
	CRAWLED: "Crawled",
	PROCESSING: "Processing",
	PROCESSED: "Processed",
	TRANSLATING: "Translating",
	TRANSLATED: "Translated",
};

export const LIST_CHAPTER_STATUS = {
	CRAWLING: { key: "CRAWLING", title: "Crawling" },
	CRAWLED: { key: "CRAWLED", title: "Crawled" },
	PROCESSING: { key: "PROCESSING", title: "Processing" },
	PROCESSED: { key: "PROCESSED", title: "Processed" },
	TRANSLATING: { key: "TRANSLATING", title: "Translating" },
	TRANSLATED: { key: "TRANSLATED", title: "Translated" },
};
