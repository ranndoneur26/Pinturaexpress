import { z } from "zod";
import { BIKE_TYPES } from "./constants";

export const budgetSchema = z.object({
    client: z.object({
        name: z.string().min(2, "El nombre es obligatorio"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(9, "Teléfono inválido"),
        address: z.string().min(5, "Dirección completa necesaria"),
        city: z.string().min(2, "Ciudad necesaria"),
        postalCode: z.string().min(4, "Código postal necesario"),
    }),
    bike: z.object({
        type: z.enum(["ROAD", "GRAVEL", "MTB", "EBIKE", "FOLDING", "TANDEM", "VINTAGE", "KIDS"]),
        brand: z.string().optional(),
        model: z.string().optional(),
    }),
    elements: z.object({
        type: z.enum(["FRAME", "FORK", "SWINGARM", "FRAME_FORK", "FRAME_FORK_SWINGARM", "OTHER"]),
        otherText: z.string().optional(),
    }),
    painting: z.object({
        type: z.enum(["ONE_COLOR", "TWO_COLORS", "THREE_COLORS", "FOUR_COLORS", "CHAMELEON", "CHAMELEON_ONE", "FLUOR", "METALLIC", "FRAME_FORK_CARBON", "FRAME_FORK_SWINGARM_CARBON", "VARNISH_FRAME_FORK", "VARNISH_FRAME_FORK_SWINGARM", "OTHER"]),
        otherText: z.string().optional(),
        pantoneColors: z.string().optional(),
    }),
    finishes: z.object({
        logos: z.enum(["NONE", "VINYL", "PAINTED"]),
        varnish: z.enum(["GLOSS", "MATTE", "SATIN", "COMBINED"]),
        comments: z.string().optional(),
    }),
    services: z.object({
        dismantling: z.enum(["NONE", "PARTIAL", "FULL"]),
        transport: z.enum(["NONE", "OWN_BOX", "FULL_SERVICE"]),
    }),
    files: z.any().optional(),
    budgetNumber: z.string().optional(),
    totalPrice: z.number().optional(),
    action: z.enum(["USER_TXT", "COMPANY_PDF"]).optional(),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
