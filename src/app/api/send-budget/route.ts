import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { budgetSchema } from "@/lib/schemas";
import { BIKE_TYPES, ELEMENT_TYPES, PAINT_TYPES, LOGO_TYPES, VARNISH_TYPES, DISMANTLING_TYPES, TRANSPORT_TYPES } from "@/lib/constants";

// Nota aclaratoria obligatoria para todos los TXT
const NOTA_ACLARATORIA = `
--------------------------------
NOTA IMPORTANTE:
Este presupuesto está sujeto a la revisión primera por parte de Carbonoexpress. Una vez comprobado que los datos y precio coinciden con lo que el cliente solicita, se enviará un correo de confirmación. Si hubiera variaciones en el precio, se advertirá en el correo que el precio reenviado en el presupuesto de verificación, difiere al recibido previamente, siendo válido el último emitido por Carbonoexpress como definitivo.
`;

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const jsonString = formData.get("data") as string;

        if (!jsonString) {
            return NextResponse.json({ error: "No se enviaron datos" }, { status: 400 });
        }

        const body = JSON.parse(jsonString);
        const files = formData.getAll("files");

        // Validate data on server side
        const validation = budgetSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Datos inválidos", details: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Check Environment Variables
        const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
        const smtpPort = Number(process.env.SMTP_PORT) || 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        console.log("SMTP Config Check:", {
            host: smtpHost,
            port: smtpPort,
            user: smtpUser ? "Set" : "Missing",
            pass: smtpPass ? "Set" : "Missing"
        });

        if (!smtpUser || !smtpPass) {
            throw new Error("Faltan las credenciales SMTP_USER o SMTP_PASS en las variables de entorno.");
        }

        // Configure Transporter with Environment Variables
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        console.log("Budget Request Received:", data.budgetNumber, "Action:", data.action);

        // Helper to get labels safely
        const bikeLabel = BIKE_TYPES[data.bike.type as keyof typeof BIKE_TYPES] || data.bike.type;
        const elementLabel = ELEMENT_TYPES[data.elements.type as keyof typeof ELEMENT_TYPES] || data.elements.type;
        const paintLabel = PAINT_TYPES[data.painting.type as keyof typeof PAINT_TYPES] || data.painting.type;
        const logosLabel = LOGO_TYPES[data.finishes.logos as keyof typeof LOGO_TYPES] || data.finishes.logos;
        const varnishLabel = VARNISH_TYPES[data.finishes.varnish as keyof typeof VARNISH_TYPES] || data.finishes.varnish;
        const dismLabel = DISMANTLING_TYPES[data.services.dismantling as keyof typeof DISMANTLING_TYPES] || data.services.dismantling;
        const transpLabel = TRANSPORT_TYPES[data.services.transport as keyof typeof TRANSPORT_TYPES] || data.services.transport;

        // Generate TXT content (common for both actions)
        const txtContent = `
PRESUPUESTO PINTURAEXPRESS
--------------------------------
Referencia: ${data.budgetNumber || 'Pendiente'}
Fecha: ${new Date().toLocaleDateString("es-ES")}

CLIENTE
Nombre: ${data.client.name}
Email: ${data.client.email}
Teléfono: ${data.client.phone}
--------------------------------

DETALLE DEL PEDIDO:

Bicicleta: ${bikeLabel} ${data.bike.brand || ''} ${data.bike.model || ''}
Elementos: ${elementLabel} ${data.elements.otherText ? `(${data.elements.otherText})` : ''}
Pintura: ${paintLabel} ${data.painting.otherText ? `(${data.painting.otherText})` : ''} ${data.painting.pantoneColors ? `\nPantone/RAL/Camaleón: ${data.painting.pantoneColors}` : ''}
Acabados: 
  - Logos: ${logosLabel}
  - Barniz: ${varnishLabel}
Montaje: ${dismLabel}
Transporte: ${transpLabel}

Notas: ${data.finishes.comments || 'Ninguna'}

--------------------------------
TOTAL ESTIMADO: ${data.totalPrice || 0}€ (Sin IVA)
--------------------------------
Este presupuesto es orientativo y está sujeto a verificación física.
Condiciones aceptadas.
${NOTA_ACLARATORIA}`;

        let mailOptions = {};

        if (data.action === "USER_TXT") {
            // Correo al usuario - TXT sin fotos
            mailOptions = {
                from: `"PinturaExpress" <${process.env.SMTP_USER}>`,
                to: data.client.email,
                subject: `Tu Presupuesto - PinturaExpress (${data.budgetNumber})`,
                text: `Gracias por contactar con Carbonoexpress, sección de pintura, Pinturaexpress. Te enviamos un resumen de tu presupuesto en formato TXT. En breve, cuando hayamos revisado el mismo, lo volveremos a enviar para certificar que es correcto y de esta manera puedas iniciar el pedido si lo deseas.\n\n${txtContent}`,
                html: `
                    <p>Gracias por contactar con Carbonoexpress, sección de pintura, Pinturaexpress. Te enviamos un resumen de tu presupuesto en formato TXT. En breve, cuando hayamos revisado el mismo, lo volveremos a enviar para certificar que es correcto y de esta manera puedas iniciar el pedido si lo deseas.</p>
                    <hr/>
                    <pre style="font-family: monospace; white-space: pre-wrap;">${txtContent}</pre>
                `,
                attachments: [
                    {
                        filename: `presupuesto-${data.budgetNumber}.txt`,
                        content: txtContent
                    }
                ]
            };
        } else {
            // COMPANY_PDF Case - Ahora envía TXT + fotos (sin PDF)
            const attachments: Array<{ filename: string; content: string | Buffer }> = [
                {
                    filename: `presupuesto-${data.budgetNumber}.txt`,
                    content: txtContent
                }
            ];

            // Añadir fotos adjuntas
            for (const file of files) {
                if (file instanceof File && !file.name.endsWith('.pdf')) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    attachments.push({
                        filename: file.name,
                        content: buffer,
                    });
                }
            }

            mailOptions = {
                from: `"PinturaExpress" <${process.env.SMTP_USER}>`,
                to: "expresscarbono@gmail.com",
                subject: `Solicitud Presupuesto: ${data.budgetNumber || 'Pendiente'}`,
                text: `Nueva solicitud de presupuesto de ${data.client.name}.\n\nVer TXT adjunto.`,
                html: `
                    <h1>Nueva Solicitud Recibida</h1>
                    <p><strong>Referencia:</strong> ${data.budgetNumber || 'Pendiente'}</p>
                    <p><strong>Cliente:</strong> ${data.client.name}</p>
                    <p>Se adjunta el presupuesto en TXT y las imágenes (si las hay).</p>
                    <hr/>
                    <pre style="font-family: monospace; white-space: pre-wrap;">${txtContent}</pre>
                `,
                attachments: attachments,
            };
        }

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Presupuesto enviado correctamente", action: data.action });
    } catch (error) {
        console.error("Error processing budget:", error);
        return NextResponse.json(
            { error: "Error al enviar email: " + (error as Error).message },
            { status: 500 }
        );
    }
}
