import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Paypal({ onApprove }: any) {
    const initialOptions = {
        'client-id':
            'AUu5l0bno7wdUVBLpNR2bIA8UbRWD5IGpCmt-4lHsVh3-Hzxvv-4SGPji-BymbO3ig0KS2kjW8_p01y5',
        currency: 'EUR',
        intent: 'capture',
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{ layout: 'horizontal' }}
                onApprove={(data, actions: any) => {
                    return actions.order.capture().then((details:any) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        onApprove();
                    });
                }}
            />
        </PayPalScriptProvider>
    );
}
