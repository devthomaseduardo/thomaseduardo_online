import { MercadoPagoConfig, Payment } from 'mercadopago';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Use a chave de acesso (ACCESS_TOKEN) de PRODUÇÃO ou TESTE, conforme o ambiente
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

  try {
    const payment = new Payment(client);
    
    // O body vem do frontend gerado pelo Brick
    const body = req.body;

    const requestOptions = {
      idempotencyKey: crypto.randomUUID(),
    };

    const result = await payment.create({
      body: {
        transaction_amount: body.transaction_amount,
        token: body.token,
        description: body.description,
        installments: body.installments,
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuer_id,
        payer: {
          email: body.payer.email,
          identification: {
            type: body.payer.identification.type,
            number: body.payer.identification.number
          }
        }
      },
      requestOptions
    });

    res.status(200).json({
      status: result.status,
      status_detail: result.status_detail,
      id: result.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
}
