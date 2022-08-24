import type { NextApiRequest, NextApiResponse } from "next";

import { allUsersQuery } from "../../utils/queries";
import { client } from "../../utils/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'GET') {
    const query = allUsersQuery()
    const data = await client.fetch(query)
    
    if(data) {
      console.log('data', data)
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}