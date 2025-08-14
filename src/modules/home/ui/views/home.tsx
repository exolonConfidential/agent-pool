"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter(); // this is a client side hook 
  const { data: session } = authClient.useSession();

  return (
    <div>
      <h1>{session?.user.name}</h1>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/auth/sign-in");
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
};
