"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import { useGlobalProvider } from "../provider/globalProvider";
import { getCurrentUser } from "../utils/auth";
import { toast } from "react-toastify";

interface AuthModalProps {
  onLogin?: (data: { email: string; password: string }) => Promise<void>;
  onRegister?: (data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    personalNumber: string;
  }) => Promise<void>;
}

export function AuthModal({ onLogin, onRegister }: AuthModalProps) {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const { setUserData, openModal, setOpenModal } = useGlobalProvider();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    personalNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (authType === "login" && onLogin) {
       const resp = await onLogin(formData);
        const data = await getCurrentUser();
        setUserData(data);
        setOpenModal(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          personalNumber: "",
        });
      } else if (authType === "register" && onRegister) {
        await onRegister(formData);
        const data = await getCurrentUser();
        setUserData(data);
        setOpenModal(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          personalNumber: "",
        });
      }
    } catch (error:any) {
      toast.error(error.message || "Something went wrong!")
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="border bg-transparent border-gray-700 h-full rounded-sm flex items-center justify-center">
          <UserRound className="w-[18px] border-2 rounded-full h-[20px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>
            {authType === "login" ? "Login" : "Register"}
          </DialogTitle>
          <DialogDescription>
            {authType === "login"
              ? "Enter your email and password to login."
              : "Fill out the form to create a new account."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex  gap-2 mb-4">
          <Button
            className="flex-1 w-full"
            variant={authType === "login" ? "default" : "outline"}
            onClick={() => setAuthType("login")}
          >
            Login
          </Button>
          <Button
            className="flex-1 w-full"
            variant={authType === "register" ? "default" : "outline"}
            onClick={() => setAuthType("register")}
          >
            Register
          </Button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {authType === "register" && (
            <>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+995 5XX XXX XXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="personalNumber">Personal Number</Label>
                <Input
                  id="personalNumber"
                  name="personalNumber"
                  placeholder="XXXXXX"
                  value={formData.personalNumber}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {authType === "login" ? "Login" : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
