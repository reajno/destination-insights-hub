import { redirect } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const analystLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  // Analyst and Admin roles can access this route
  if (session?.user && profile.role === "Operator")
    throw redirect("/dashboard");
};

export default analystLoader;
