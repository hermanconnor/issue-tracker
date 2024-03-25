import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutButton from "./LogoutButton";
import authOptions from "@/app/api/auth/authOptions";

const AuthButton = async () => {
  const session = await getServerSession(authOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session?.user?.image || "/images/profile-pic-placeholder.png"}
            alt={session?.user?.name || "Assigned user"}
          />
          <AvatarFallback>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
