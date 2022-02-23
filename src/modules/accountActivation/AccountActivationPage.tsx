import Loading from '@/components/atoms/Loading';
import { useActivateAccountMutation } from '@/generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TokenInvalid from './TokenInvalid';
import TokenValid from './TokenValid';

const AccountActivationPage = () => {
  const [activating, setActivating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const token = String(router.query.activationId);

  const [activateAccountResult, activateAccount] = useActivateAccountMutation();

  useEffect(() => {
    async function handleAccountActivation() {
      const variables = {
        data: {
          token,
        },
      };
      const isValid = (await activateAccount(variables)).data?.activateAccount;
      if (isValid === true) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setActivating(false);
    }

    if (token != 'undefined') {
      handleAccountActivation();
    }
  }, [activateAccount, token]);

  if (activating) {
    return <Loading />;
  }

  return isValid ? <TokenValid /> : <TokenInvalid />;
};

export default AccountActivationPage;
