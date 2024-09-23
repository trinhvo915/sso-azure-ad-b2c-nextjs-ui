'use client'
import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { authScopes } from "../authConfig";
import { useEffect, useState } from "react";

export default function App() {
    const { instance, accounts } = useMsal();
    const [accountDetails, setAccountDetails] = useState(null);

    const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
        account: instance.getActiveAccount(),
        redirectUri: '/redirect'
    });

    if (accounts.length > 0) {
        console.log('accounts', accounts)
    }

    function handleLogin() {
        console.log('accounts', instance)
        instance.loginPopup(authScopes).then(response => {
            console.log("login successful!", response);

            instance.setActiveAccount(response.account);
        }).catch(e => {
            console.log(e);
        });
    }

    function handleLogout() {
        instance.logoutPopup(authScopes).then(response => {

        }).catch(e => {
            console.log(e);
        });
    }

    console.log("Bearer : ", result)
    return (
        <center>
            <h1>Please SUBSCRIBE! :)</h1>
            <AuthenticatedTemplate>
                <h6>You're logged in!</h6>
                {accountDetails && (
                    <center>
                        Name: {accountDetails.name}
                    </center>
                )}
                <button onClick={() => handleLogout()}>Logout</button >
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>Please log in</p>

                <button onClick={() => handleLogin()}>Login</button >
            </UnauthenticatedTemplate>
        </center>
    );
}