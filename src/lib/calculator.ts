import { PRICING } from "./constants";
// Use any to avoid strict partial types mismatch during rapid prototyping
export function calculateBudget(data: any) {
    let total = 0;

    if (!data) return 0;

    const paintType = data.painting?.type;
    const isCarbonoVisto = paintType === "FRAME_FORK_CARBON" || paintType === "FRAME_FORK_SWINGARM_CARBON";

    // Module 2 (Bike) & 3 (Elements) are SKIPPED if Carbono Visto is selected
    if (!isCarbonoVisto) {
        // Module 2: Bike
        if (data.bike?.type) {
            total += PRICING.BIKE[data.bike.type as keyof typeof PRICING.BIKE] || 0;
        }

        // Module 3: Elements
        if (data.elements?.type) {
            total += PRICING.ELEMENTS[data.elements.type as keyof typeof PRICING.ELEMENTS] || 0;
        }
    }

    // Module 4: Paint
    if (data.painting?.type) {
        total += PRICING.PAINT[data.painting.type as keyof typeof PRICING.PAINT] || 0;
    }

    // Module 5: Finishes
    if (data.finishes?.logos) {
        total += PRICING.LOGOS[data.finishes.logos as keyof typeof PRICING.LOGOS] || 0;
    }
    if (data.finishes?.varnish) {
        total += PRICING.VARNISH[data.finishes.varnish as keyof typeof PRICING.VARNISH] || 0;
    }

    // Module 6: Dismantling
    if (data.services?.dismantling) {
        total += PRICING.DISMANTLING[data.services.dismantling as keyof typeof PRICING.DISMANTLING] || 0;
    }

    // Module 7: Transport
    if (data.services?.transport) {
        total += PRICING.TRANSPORT[data.services.transport as keyof typeof PRICING.TRANSPORT] || 0;
    }

    return total;
}
