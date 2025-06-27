import { redirect } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const loginLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    throw redirect("/dashboard");
  }
};

export default loginLoader;
