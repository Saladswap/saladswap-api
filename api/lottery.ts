import { NowRequest, NowRequestQuery, NowResponse } from "@vercel/node";
import {
  computeLotteries,
  getIssueIndex,
  getSingleLotteryBatch,
  Lottery,
  SingleLotteryReturn,
} from "../utils/lotteryUtils";

export const lottery = async (
  pageSize?: number,
  page: number = 0
): Promise<{
  totalPage?: number;
  totalItems?: number;
  lotteries?: Array<Lottery>;
  currentPage?: number;
  error?: string;
  errorMessage?: string;
}> => {
  const issueIndex = await getIssueIndex();
  if (typeof issueIndex !== "number") {
    return issueIndex;
  }
console.log('-- issueIndex : ', issueIndex);
  const finalNumbersProm: Array<SingleLotteryReturn> = [];
  const totalPage = pageSize ? Math.ceil(issueIndex / pageSize - 1) : 0;
  console.log('-- pageSize : ', pageSize);
  console.log('-- page : ', page);
  if (typeof pageSize !== "undefined") {
    if (pageSize * page > issueIndex) {
      return {
        error: "page out of range",
        errorMessage: `The requested page with the requested pageSize is out of range. The last page is: ${totalPage}`,
        totalPage,
        totalItems: issueIndex,
      };
    }

    const offset = page * pageSize;
    const start = issueIndex - (offset + 1);
    const end = start - pageSize;
    console.log('-- offset : ', offset);
    console.log('-- start : ', start);
    console.log('-- end : ', end);

    for (let i = start; i >= 0 && i > end; i--) {
      if (i !== 349) {
        finalNumbersProm.push(getSingleLotteryBatch(i));
      }
    }
    console.log('-- finalNumbersProm : ', finalNumbersProm);
  } else {
    for (let i = issueIndex; i >= 0; i--) {
      if (i !== 349) {
        finalNumbersProm.push(getSingleLotteryBatch(i));
      }
    }
  }
  const finalNumbers = await computeLotteries(finalNumbersProm);
  console.log('-- finalNumbers : ', finalNumbers);
  return {
    totalPage: totalPage,
    totalItems: issueIndex,
    lotteries: finalNumbers,
    currentPage: page,
  };
};

export const handleAPICall = async (query: NowRequestQuery) => {
  const { pageSize, page } = query;

  return await lottery(
    typeof pageSize !== "undefined" ? Number(pageSize) : undefined,
    typeof page !== "undefined" ? Number(page) : undefined
  );
};

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const data = await handleAPICall(req.query);
  res.status(200).send(data);
};
