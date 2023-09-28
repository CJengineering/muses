import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Signin.module.css";

export function Signin({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "padding-section-medium")}
      tag="div"
    >
      <_Builtin.FormWrapper className={_utils.cx(_styles, "form-block")}>
        <_Builtin.FormForm
          name="email-form-2"
          data-name="Email Form 2"
          method="get"
          id="email-form-2"
        >
          <_Builtin.FormBlockLabel htmlFor="name-2">
            {"Name"}
          </_Builtin.FormBlockLabel>
          <_Builtin.FormTextInput
            autoFocus={false}
            maxLength={256}
            name="name-2"
            data-name="Name 2"
            type="text"
            disabled={false}
            required={false}
            id="name-2"
          />
          <_Builtin.FormBlockLabel htmlFor="email-6">
            {"Email Address"}
          </_Builtin.FormBlockLabel>
          <_Builtin.FormTextInput
            autoFocus={false}
            maxLength={256}
            name="email-5"
            data-name="Email 5"
            type="email"
            disabled={false}
            required={true}
            id="email-5"
          />
          <_Builtin.FormButton
            type="submit"
            value="Submit"
            data-wait="Please wait..."
          />
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage>
          <_Builtin.Block tag="div">
            {"Thank you! Your submission has been received!"}
          </_Builtin.Block>
        </_Builtin.FormSuccessMessage>
        <_Builtin.FormErrorMessage>
          <_Builtin.Block tag="div">
            {"Oops! Something went wrong while submitting the form."}
          </_Builtin.Block>
        </_Builtin.FormErrorMessage>
      </_Builtin.FormWrapper>
    </_Component>
  );
}
