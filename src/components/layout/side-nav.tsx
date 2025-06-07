import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import SignIn from "./sign-in";

export default function SideNav() {
  return (
    <nav className="flex flex-col items-start p-4 space-y-2">
      <a href="/" className="text-lg font-semibold hover:underline">
        Home
      </a>
      <a href="/about" className="text-lg font-semibold hover:underline">
        About
      </a>
      <a href="/contact" className="text-lg font-semibold hover:underline">
        Contact
      </a>
      <SignIn />
    </nav>
  );
}
