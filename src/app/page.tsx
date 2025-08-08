"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const createUser =  () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (cxt) => {
          alert(cxt.error);
        },
        onSuccess: () => {
          alert("Success");
        },
      }
    );
  };
  const login =  () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (cxt) => {
          alert(cxt.error);
        },
        onSuccess: () => {
          alert("Success");
        },
      }
    );
  };
  if (session) {
    return (
      <div>
        <h1>{session.user.name}</h1>
        <Button variant={"destructive"} onClick={() => authClient.signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex flex-col gap-4 w-lg">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={createUser}>Create User</Button>
      </div>
      <div className="flex flex-col gap-4 w-lg mt-6">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
}
