import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/atoms/Loading';
import { useActivateAccountMutation } from '@/generated/graphql';
import TokenInvalid from './TokenInvalid';
import TokenValid from './TokenValid';

function AccountActivationPage() {
  const [activating, setActivating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const token = String(router.query.activationId);

  const [activateAccount] = useActivateAccountMutation();

  useEffect(() => {
    async function handleAccountActivation() {
      const isValid = (
        await activateAccount({
          variables: {
            data: {
              token,
            },
          },
        })
      ).data?.activateAccount;
      if (isValid === true) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setActivating(false);
    }

    if (token !== 'undefined') {
      handleAccountActivation();
    }
  }, [activateAccount, token]);

  if (activating) {
    return <Loading />;
  }

  return isValid ? <TokenValid /> : <TokenInvalid />;
}

export default AccountActivationPage;
