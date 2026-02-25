import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = "re_2QojUsat_GzUFsTBizo9cRcN5NLdKZzee";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      nome,
      cognome,
      email,
      telefono,
      nome_centro,
      citta,
      tipo_attivita,
      clienti_attuali,
      sfide_principali,
      contatto_preferito,
      tempistiche,
      tipo_centro,
      core_flows,
      extra_flows,
      piano_manutenzione,
      costo_totale,
      is_custom_quote,
    } = body;

    const centerTypeLabel =
      tipo_centro === "single"
        ? "Studio Singolo (1 operatore)"
        : tipo_centro === "team"
        ? "Piccolo team (2-4 operatori)"
        : "Preventivo su misura (5+ operatori)";

    const htmlBody = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; background: #f9f9f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #5a7a5a, #4a8a8a); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { padding: 24px 30px; border-bottom: 1px solid #eee; }
    .section:last-child { border-bottom: none; }
    .section h2 { font-size: 16px; color: #5a7a5a; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .row { display: flex; margin-bottom: 8px; }
    .label { font-weight: bold; min-width: 180px; color: #555; }
    .value { color: #222; }
    .badge { display: inline-block; background: #e8f4e8; color: #3a6a3a; border-radius: 6px; padding: 4px 10px; margin: 3px; font-size: 14px; }
    .price { font-size: 28px; font-weight: bold; color: #5a7a5a; }
    .footer { background: #f5f5f5; padding: 16px 30px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuova Richiesta di Preventivo</h1>
      <p style="margin:8px 0 0;opacity:0.85;">SocialFlow - ${new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}</p>
    </div>

    <div class="section">
      <h2>Dati Cliente</h2>
      <div class="row"><span class="label">Nome:</span><span class="value">${nome} ${cognome}</span></div>
      <div class="row"><span class="label">Email:</span><span class="value">${email}</span></div>
      <div class="row"><span class="label">Telefono:</span><span class="value">${telefono}</span></div>
      <div class="row"><span class="label">Nome Centro:</span><span class="value">${nome_centro}</span></div>
      ${citta ? `<div class="row"><span class="label">Città:</span><span class="value">${citta}</span></div>` : ""}
      ${tipo_attivita ? `<div class="row"><span class="label">Tipo Attività:</span><span class="value">${tipo_attivita}</span></div>` : ""}
      ${clienti_attuali ? `<div class="row"><span class="label">Clienti/Mese:</span><span class="value">${clienti_attuali}</span></div>` : ""}
      ${contatto_preferito ? `<div class="row"><span class="label">Contatto Preferito:</span><span class="value">${contatto_preferito}</span></div>` : ""}
      ${tempistiche ? `<div class="row"><span class="label">Tempistiche:</span><span class="value">${tempistiche}</span></div>` : ""}
    </div>

    <div class="section">
      <h2>Configurazione Richiesta</h2>
      <div class="row"><span class="label">Tipo Centro:</span><span class="value">${centerTypeLabel}</span></div>
      ${
        !is_custom_quote && core_flows
          ? `<div class="row"><span class="label">Flussi Principali:</span><span class="value">${core_flows.split("  |  ").map((f: string) => `<span class="badge">${f}</span>`).join(" ")}</span></div>`
          : ""
      }
      ${
        !is_custom_quote && extra_flows
          ? `<div class="row"><span class="label">Flussi Extra:</span><span class="value">${extra_flows.split("  |  ").map((f: string) => `<span class="badge">${f}</span>`).join(" ")}</span></div>`
          : ""
      }
      ${piano_manutenzione ? `<div class="row"><span class="label">Piano Manutenzione:</span><span class="value">${piano_manutenzione}</span></div>` : ""}
      ${sfide_principali ? `<div class="row"><span class="label">Sfide Principali:</span><span class="value">${sfide_principali.split("  |  ").join(", ")}</span></div>` : ""}
    </div>

    ${
      !is_custom_quote && costo_totale
        ? `<div class="section" style="text-align:center;">
        <h2>Investimento Setup</h2>
        <div class="price">€${costo_totale}</div>
        <p style="color:#888;font-size:14px;margin:4px 0 0;">Pagamento unico</p>
      </div>`
        : `<div class="section" style="text-align:center;">
        <h2>Tipo Preventivo</h2>
        <p style="font-size:16px;color:#5a7a5a;font-weight:bold;">Preventivo su Misura - Centro Strutturato (5+ operatori)</p>
      </div>`
    }

    <div class="footer">
      SocialFlow &mdash; Risposta automatica dalla landing page
    </div>
  </div>
</body>
</html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SocialFlow <onboarding@resend.dev>",
        to: ["socialflow.ai.bot@gmail.com"],
        subject: `Nuova richiesta preventivo: ${nome} ${cognome} - ${nome_centro}`,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      throw new Error(`Resend error: ${JSON.stringify(errorData)}`);
    }

    const resendData = await resendResponse.json();

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
