
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeActions from "./homeActions";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("sesh: "+ session)
    redirect("/unauthenticated");
  }

  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <HomeActions/>
    </>
  );
}