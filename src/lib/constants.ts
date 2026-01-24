export const PRICING = {
    BIKE: {
        ROAD: 0,
        GRAVEL: 0,
        MTB: 0,
        EBIKE: 30,
        FOLDING: 0,
        TANDEM: 100,
        VINTAGE: -20,
        KIDS: -30,
    },
    ELEMENTS: {
        FRAME: 180,
        FORK: 90,
        SWINGARM: 100,
        FRAME_FORK: 200,
        FRAME_FORK_SWINGARM: 215,
        OTHER: 90,
    },
    PAINT: {
        ONE_COLOR: 25,
        TWO_COLORS: 50,
        THREE_COLORS: 80,
        FOUR_COLORS: 130,
        CHAMELEON: 45,
        CHAMELEON_ONE: 70,
        FLUOR: 30,
        METALLIC: 30,
        FRAME_FORK_CARBON: 440,
        FRAME_FORK_SWINGARM_CARBON: 500,
        VARNISH_FRAME_FORK: 100,
        VARNISH_FRAME_FORK_SWINGARM: 125,
        OTHER: 0,
    },
    LOGOS: {
        NONE: 0,
        VINYL: 60,
        PAINTED: 80,
    },
    VARNISH: {
        GLOSS: 0,
        MATTE: 0,
        SATIN: 0,
        COMBINED: 40,
    },
    DISMANTLING: {
        NONE: 0,
        PARTIAL: 65,
        FULL: 95,
    },
    TRANSPORT: {
        NONE: 0,
        OWN_BOX: 65,
        FULL_SERVICE: 75,
    },
} as const;

export const BIKE_TYPES = {
    ROAD: "Carretera",
    GRAVEL: "Gravel",
    MTB: "Montaña",
    EBIKE: "Eléctrica",
    FOLDING: "Plegable",
    TANDEM: "Tandem",
    VINTAGE: "Carretera Vintage",
    KIDS: "Infantil",
} as const;

export const ELEMENT_TYPES = {
    FRAME: "Cuadro",
    FORK: "Horquilla",
    SWINGARM: "Basculante",
    FRAME_FORK: "Cuadro + Horquilla",
    FRAME_FORK_SWINGARM: "Cuadro + Horquilla + Basculante",
    OTHER: "Otro",
} as const;

export const PAINT_TYPES = {
    ONE_COLOR: "1 color",
    TWO_COLORS: "2 colores",
    THREE_COLORS: "3 colores",
    FOUR_COLORS: "4 colores",
    CHAMELEON: "Color camaleón",
    CHAMELEON_ONE: "Color camaleón + 1 color",
    FLUOR: "Color Fluor",
    METALLIC: "Color Metalizado",
    FRAME_FORK_CARBON: "Cuadro + Horquilla decapado - carbono visto",
    FRAME_FORK_SWINGARM_CARBON: "Cuadro + Horquilla + Basculante decapado - carbono visto",
    VARNISH_FRAME_FORK: "Sólo Barnizar - cuadro y horquilla",
    VARNISH_FRAME_FORK_SWINGARM: "Sólo Barnizar - cuadro , horquilla y basculante",
    OTHER: "Otro",
} as const;

export const LOGO_TYPES = {
    NONE: "Logos - no",
    VINYL: "Logos en Vinilo",
    PAINTED: "Logos Pintados",
} as const;

export const VARNISH_TYPES = {
    GLOSS: "Barniz Brillante",
    MATTE: "Barniz Mate",
    SATIN: "Barniz Satinado",
    COMBINED: "Barniz, combinar Brillante y mate",
} as const;

export const DISMANTLING_TYPES = {
    NONE: "Entrego el cuadro totalmente desmontado",
    PARTIAL: "Entrego el semi desmontado",
    FULL: "Necesito desmontaje total y posterior montaje",
} as const;

export const TRANSPORT_TYPES = {
    NONE: "Gestiono yo el transporte",
    OWN_BOX: "Dispongo de caja y Carbonoexpress gestiona el transporte",
    FULL_SERVICE: "Carbonoexpress gestiona el transporte, incluyendo el envío previo de la caja",
} as const;
