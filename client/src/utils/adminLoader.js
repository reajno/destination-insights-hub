import { redirect } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const adminLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (session?.user && profile.role !== "Admin") throw redirect("/dashboard");
};

export default adminLoader;
