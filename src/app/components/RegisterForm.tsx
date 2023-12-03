import { FlashMessage } from "@/lib/models";
import React, { useState } from "react";
import Legend from "./Legend";
import Submit from "@/app/components/Submit";
import Label from "./Label";
import Input from "./Input";

const RegisterForm = ({
  handler,
  handleRegister,
  flashMessage,
  isSubmitting,
}: {
  handler: any;
  handleRegister: any;
  flashMessage: FlashMessage | undefined;
  isSubmitting: boolean;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(Date.now().toString());
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="flex flex-row justify-center">
        <fieldset className="flex flex-col w-1/3">
          <Legend title={"Register"} flashMessage={flashMessage} />
          <form
            className=" form form-control text-lg"
            onSubmit={handleRegister}
          >
            <Label text={"First Name"} htmlFor={"firstName"} />
            <Input
              id={"firstName"}
              name={"firstName"}
              type={"text"}
              value={firstName}
              required={true}
              setState={setFirstName}
            />
            <Label text={"Last Name"} htmlFor={"lastName"} />
            <Input
              id={"lastName"}
              name={"lastName"}
              type={"text"}
              value={lastName}
              required={true}
              setState={setLastName}
            />

            <Label text={"Email"} htmlFor={"email"} />
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              value={email}
              required={true}
              setState={setEmail}
            />

            <Label text={"Birt Date"} htmlFor={"dob"} />
            <Input
              id={"dob"}
              name={"dob"}
              type={"date"}
              value={dob}
              required={true}
              setState={setDob}
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

            <Label text={"Confirm Password"} htmlFor={"confirmPassword"} />
            <Input
              id={"confirmPassword"}
              name={"confirmPassword"}
              type={"password"}
              value={confirmPassword}
              required={true}
              setState={setConfirmPassword}
            />

            {confirmPassword !== password ? (
              <small className="text-red-600">
                Confirm Password much equal to Password
              </small>
            ) : (
              ""
            )}
            <Submit isSubmitting={isSubmitting} />
          </form>
          <a href="#" onClick={handler}>
            Already have an account?
          </a>
        </fieldset>
      </div>
    </>
  );
};

export default RegisterForm;
