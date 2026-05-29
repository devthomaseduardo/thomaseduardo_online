import React, { useState } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useLang } from '../contexts/LangContext';

// Inicialize com a sua PUBLIC_KEY
// Idealmente coloque no seu .env: VITE_MP_PUBLIC_KEY
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || 'SUA_PUBLIC_KEY_AQUI', { locale: 'pt-BR' });

interface MercadoPagoCheckoutProps {
  amount: number;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ amount }) => {
  const { lang } = useLang();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const initialization = {
    amount: amount,
    preferenceId: undefined, // Usamos apenas o amount para o Payment Brick simples, ou preferenceId se quisermos gerar no backend antes
  };

  const customization = {
    paymentMethods: {
      creditCard: "all" as const,
      debitCard: "all" as const,
      ticket: "all" as const,
      bankTransfer: "all" as const,
    },
    visual: {
      style: {
        theme: "dark" as const, // Match your portfolio's dark mode
      },
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    return new Promise((resolve, reject) => {
      fetch("/api/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Payment response:", response);
          setPaymentStatus(response.status);
          resolve(response);
        })
        .catch((error) => {
          console.error("Payment error:", error);
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    // Brick is ready
  };

  if (paymentStatus === "approved") {
    return (
      <div className="p-8 text-center text-green-400 bg-green-500/10 border border-green-500/20 rounded-2xl">
        <h3 className="text-xl font-bold mb-2">
          {lang === "pt" ? "Pagamento Aprovado!" : "Payment Approved!"}
        </h3>
        <p className="text-sm text-green-400/80">
          {lang === "pt" ? "Obrigado por fechar com a gente." : "Thank you for working with us."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white/[0.02] p-4 rounded-xl border border-white/10">
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default MercadoPagoCheckout;
