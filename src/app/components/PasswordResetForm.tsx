import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { resetPassword } from "@/server/actions";

export default function PasswordResetForm() {
  return (
    <form action={resetPassword} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <Button type="submit">Reset Password</Button>
    </form>
  );
}
