import { redirect } from "next/navigation";

const NotFound = () => {
  redirect("/signin");

  return null;
};

export default NotFound;
