import { FlashMessage } from "@/lib/models";
import React, { useState } from "react";
import Legend from "./Legend";
import Submit from "@/app/components/Submit";
import Input from "./Input";
import Label from "./Label";

const LoginForm = ({
  handler,
  handleLogin,
  flashMessage,
  isSubmitting,
}: {
  handler: any;
  handleLogin: any;
  flashMessage: FlashMessage | undefined;
  isSubmitting: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-row justify-center">
        <fieldset className="flex flex-col w-1/3">
          <Legend title={"Login"} flashMessage={flashMessage} />
          <form
            className="flex flex-col flex-none form form-control text-lg"
            onSubmit={handleLogin}
          >
            <Label text={"Email"} htmlFor={"email"} />
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              value={email}
              required={true}
              setState={setEmail}
            />
            <Label text={"Password"} htmlFor={"password"} />
            <Input
              id={"password"}
              name={"password"}
              type={"password"}
              value={password}
              required={true}
              setState={setPassword}
            />
            <Submit isSubmitting={isSubmitting} />
          </form>
          <a href="#" className="link link-success" onClick={handler}>
            Do not have an account?
          </a>
          <a href="/users/auth/forgotPassword" className="link link-success">
            Forgot Password?
          </a>
        </fieldset>
      </div>
    </>
  );
};

export default LoginForm;
