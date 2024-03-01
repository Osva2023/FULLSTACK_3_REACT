// withAuthProtection.js
// withAuthProtection.js
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, Navigate } from 'react-router-dom';
import { validateToken } from './validateTokenOnNav.js';

export function withAuthProtection(WrappedComponent) {
  return (props) => {
    const [cookies, setCookie] = useCookies(['sessionToken']);
    const [isValid, setIsValid] = useState(null);
    const sessionToken = cookies.sessionToken;
    const location = useLocation();

    useEffect(() => {
      async function validate() {
        if (sessionToken) {
          const response = await validateToken(sessionToken);
          setIsValid(response?.data?.valid);
          if (response?.data?.valid) {
            setCookie('userFirstName', response.data.user.first_name);
            setCookie('userLastName', response.data.user.last_name);
          }
    
        }
      }

      validate();
    }, [sessionToken, location]); // Re-run the effect when the sessionToken or location changes

    if (isValid === null) {
      return null; // Or a loading spinner
    }

    if (!sessionToken || !isValid) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
}