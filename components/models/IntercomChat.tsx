"use client";
import { useEffect } from 'react';
import { Intercom } from '@intercom/messenger-js-sdk';
import { SafeUser } from "@/types";
import generateHash from '@/app/actions/generateHash';

type Props = {
  currentUser?: SafeUser | null;
};

function IntercomChat({ currentUser }: Props) {
  const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
  const secretKey = process.env.NEXT_PUBLIC_INTERCOM_SECRET_KEY;

  useEffect(() => {
    const initializeIntercom = async () => {
      if (currentUser) {
        const userIdentifier = currentUser.id.toString();
        const hash = await generateHash(userIdentifier, secretKey as string);
        Intercom({
          app_id: INTERCOM_APP_ID as string,
          user_id: currentUser.id as string,
          name: currentUser.name as string,
          email: currentUser.email as string,
          user_hash: hash as string,
        });
      }
    };

    initializeIntercom();
  }, [currentUser]);

  return null;
}

export default IntercomChat;