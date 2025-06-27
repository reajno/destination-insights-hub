import { redirect } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const authLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw redirect("/login");
  }
};

export default authLoader;
