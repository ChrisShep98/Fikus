import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { buildSchema } from "type-graphql";
import { RegistrationResolver } from "@/graphql/resolvers/register";
import { MeReslover } from "@/graphql/resolvers";
// import { NextApiRequest, NextApiResponse } from "next"

const schema = await buildSchema({
  resolvers: [RegistrationResolver, MeReslover],
});

const server = new ApolloServer({ schema });

// export type MyContext = {
//   req: NextApiRequest
//   res: NextApiResponse
// }

export default startServerAndCreateNextHandler(
  server
  //   , {
  //   context: async (req, res): Promise<MyContext> => ({
  //       req, res
  //     }
  //   ),
  // }
);
