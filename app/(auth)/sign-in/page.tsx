import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SigninForm from "./SigninForm";
import authOptions from "@/app/api/auth/authOptions";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return <SigninForm />;
};

export default SigninPage;
