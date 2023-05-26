import { PgQueryError, PgQueryResponse } from "@/types";
import { pool } from "@/utils/postgres";
import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UserInput, RegisterResponse } from "../schemas";

// register mutation. adds a new user to the user table. I added some validation that I thought made sense here. not all. if the user trys to reuse a username/email that's already in the db, postgres throws an error so I just relay that message. I didn't validate username/password length or password complexity or email validity. maybe we should do that here too. It's possible to do it here or on the UI, so I just left it out of this for now

@Resolver(RegisterResponse)
class RegistrationResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg("user", () => UserInput) user: UserInput
  ): Promise<RegisterResponse> {
    const hashedPassword = await argon2.hash(user.password);
    const res: Promise<RegisterResponse> = await pool
      .query(
        `INSERT INTO "user" (email, username, password)
       VALUES (
        $1,
        $2,
        $3
        ) RETURNING *;`,
        [user.email, user.username, hashedPassword]
      )
      .then((queryRes: PgQueryResponse) => {
        const { id, username, email, role } = queryRes.rows[0];
        return {
          user: {
            id,
            username,
            email,
            role,
          },
        };
      })
      .catch((e: PgQueryError) => {
        if (e.code === "23505") {
          const details = e.detail.split(/[()]+/);
          return {
            errors: [
              {
                field: details[1],
                message: `individual with username: ${user.username} and email: ${user.email} is a duplicate member. ${details[1]} ${details[3]} is already in use.`,
              },
            ],
          };
        } else {
          console.log(e);
          return {
            errors: [
              {
                field: "unknown",
                message: "unhandled error",
              },
            ],
          };
        }
      });
    return res;
  }
}

export { RegistrationResolver };
