import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { Timeclock } from "react-timeclock";
import { useSession } from "next-auth/react";

export default function Admin() {
  const [timeclock, setTimeclock] = useState<ReactNode>();
  const session = useSession();

  useEffect(() => {
    session.status === "authenticated" && setTimeclock(<Timeclock />);
  }, [session]);
  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      {timeclock}
    </>
  );
}

// just to reiterate, none of the data you tell this component gets saved anywhere except localstorage. if you clear your browser history it will forget everything. useful just for keeping tabs on yourself and how much time you're putting towards the project
