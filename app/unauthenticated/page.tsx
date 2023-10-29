import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../testing/login";

export default async function Unauthenticated() {
    const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  else{
    console.log(session)
  }

  return (
  <div className="m-4">
        <Login/>
        <p className="ml-4">Please sign in</p>
  </div>
  )
}