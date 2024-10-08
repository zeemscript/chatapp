"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Key, Mail } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";

const SignUp = ({ onSuccess, setIsOpen }) => {
  const router = useRouter();
  const [showPswrd, setShowPswrd] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if any field is empty
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.warning("Please fill all input fields");
      setIsOpen(true); // Keep dialog open
      return;
    }

    // Validate if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      setIsOpen(true); // Keep dialog open
      return;
    }

    setSubmit(true);
    try {
      await register(formData.email, formData.password);
      toast.success("Account created successfully");
      onSuccess(); // Call success callback
      router.push("/dashboard");
    } catch (error) {
      toast.error("Error Signing up.");
    } finally {
      setSubmit(false);
    }
  };

  const handleShowPassword = () => setShowPswrd(true);
  const handleClosePassword = () => setShowPswrd(false);

  return (
    <div className="space-y-2">
      <span className="flex justify-center items-center text-3xl">SignUp</span>
      <form onSubmit={handleSubmit} className="py-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="my-4"
          autoComplete="none"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail className="h-4 w-4" />}
        />
        <Input
          type={showPswrd ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="none"
          className="my-4"
          value={formData.password}
          onChange={handleChange}
          icon={
            <>
              {showPswrd ? (
                <EyeOffIcon className="h-5 w-5" onClick={handleClosePassword} />
              ) : (
                <EyeIcon className="h-5 w-5" onClick={handleShowPassword} />
              )}
              <Key className="h-4 w-4" />
            </>
          }
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="none"
          className="my-4"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={<Key className="h-4 w-4" />}
        />
        <Button type="submit" variant="outline" className="my-4">
          {submit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
