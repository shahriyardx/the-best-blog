import { NotificationStatus, NotificationType } from "@prisma/client";
import { ISODateString } from "next-auth";
import React from "react";

export type Children =
  | string
  | React.ReactNode
  | React.ReactNode[]
  | JSX.Element
  | JSX.Element[]
  | null
  | undefined;
export interface PostFormData {
  title: string;
  description: string;
  category: string;
  visibility: string;
}

export type ReduxNotification = {
  created_at: ISODateString;
  id: string;
  type: NotificationType;
  status: NotificationStatus;
  from_id: string;
  to_id: string;
  post_id: string | null;
  from: {
    username: string;
  };
}
