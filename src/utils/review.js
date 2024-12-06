export const getNumberReviewByRate = (data, rate) => data?.filter((item) => item.rate === rate).length;
