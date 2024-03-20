import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignupForm from "./SignupForm";
import authOptions from "@/app/api/auth/authOptions";

const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <SignupForm />;
};

export default SignupPage;
