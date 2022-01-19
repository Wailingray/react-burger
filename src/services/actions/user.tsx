import { useHistory } from "react-router-dom";
import { AppDispatch, AppThunk } from "../..";
import { submitUserEmail } from "../../components/api/api";
import { TSubmitEmailReply } from "../../utils/types";

export const SUBMIT_USER_EMAIL_REQUEST: "SUBMIT_USER_EMAIL_REQUEST" =
  "SUBMIT_USER_EMAIL_REQUEST";
export const SUBMIT_USER_EMAIL_SUCCESS: "SUBMIT_USER_EMAIL_SUCCESS" =
  "SUBMIT_USER_EMAIL_SUCCESS";
export const SUBMIT_USER_EMAIL_FAILED: "SUBMIT_USER_EMAIL_FAILED" =
  "SUBMIT_USER_EMAIL_FAILED";

export interface ISubmitUserEmailRequest {
  readonly type: typeof SUBMIT_USER_EMAIL_REQUEST;
}

export interface ISubmitUserEmailSuccess {
  readonly type: typeof SUBMIT_USER_EMAIL_SUCCESS;
  reply: TSubmitEmailReply
}

export interface ISubmitUserEmailFailed {
  readonly type: typeof SUBMIT_USER_EMAIL_FAILED;
  readonly error: number;
}

export const SUBMIT_USER_EMAIL: "SUBMIT_USER_EMAIL" = "SUBMIT_USER_EMAIL";

export type TUserActions =
  | ISubmitUserEmailRequest
  | ISubmitUserEmailFailed
  | ISubmitUserEmailSuccess;

export const submitUserEmailRequest = (): ISubmitUserEmailRequest => ({
  type: SUBMIT_USER_EMAIL_REQUEST,
});

export const submitUserEmailSuccess = (reply: TSubmitEmailReply): ISubmitUserEmailSuccess => ({
  type: SUBMIT_USER_EMAIL_SUCCESS,
  reply
});

export const submitUserEmailFailed = (error: number): ISubmitUserEmailFailed => ({
  type: SUBMIT_USER_EMAIL_FAILED,
  error,
});

export const dispatchUserEmail: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(submitUserEmailRequest());
    submitUserEmail(email)
      .then((res) => {
        dispatch(submitUserEmailSuccess(res));
      })
      .catch((err) => {
        dispatch(submitUserEmailFailed(err));
      });
  };
