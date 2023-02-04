import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { absences, members } from "../api";
import moment from "moment";
import _ from "lodash";
const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result: any = [];
    const type = req.query?.type;
    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;

    const absences_resp = await absences();
    const members_resp = await members();
    absences_resp.forEach((x: any) => {
      members_resp.forEach((y: any) => {
        if (x.userId === y.userId) {
          result.push({ ...x, ...y });
        }
      });
    });
    if (type) {
      result = _.filter(result, { type });
    }
  
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, msg: +err });
  }
});

export default handler;
