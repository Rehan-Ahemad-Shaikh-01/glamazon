/**
 * Glamazon Salon - Master Catalog Data Module
 */
const CATALOG_SERVICES = [
    {
        id: "women-hair-botox",
        title: "Hair Botox Treatment",
        category: "women-hair",
        categoryTag: "WOMEN'S HAIR (PREMIUM REPAIR)",
        price: "₹5,500",
        duration: "120 MIN",
        beforeAfterImage: "Assets/hair_botox_before_after.png",
        description: "Deep fiber reconstruction with organic botanicals & amino acids. Restores silk shine and eliminates 95% frizz."
    },
    {
        id: "women-nanoplastia",
        title: "Nanoplastia Ritual",
        category: "women-hair",
        categoryTag: "ORGANIC SMOOTHING (EXCLUSIVE)",
        price: "₹5,500",
        duration: "150 MIN",
        beforeAfterImage: "Assets/hair_botox_before_after.png",
        description: "Formaldehyde-free vegan nanoplastia smoothing therapy for glossy, straight, and deeply hydrated tresses."
    },
    {
        id: "women-keratin",
        title: "Keratin Hair Treatment",
        category: "women-hair",
        categoryTag: "SMOOTH & SHINE THERAPY",
        price: "₹3,500",
        duration: "120 MIN",
        beforeAfterImage: "Assets/hair_botox_before_after.png",
        description: "Intense protein sealant therapy that locks in moisture, shields against humidity, and creates effortless manageability."
    },
    {
        id: "women-olaplex",
        title: "Olaplex & K18 Bond Repair",
        category: "women-hair",
        categoryTag: "MOLECULAR HAIR RECONSTRUCTION",
        price: "₹3,000",
        duration: "60 MIN",
        beforeAfterImage: "Assets/hair_botox_before_after.png",
        description: "Patented molecular bond builder that reverses chemical damage, restores elasticity, and strengthens hair disulfide bonds."
    },
    {
        id: "women-global-color",
        title: "Loreal / Schwarzkopf Global Color",
        category: "women-hair",
        categoryTag: "CHROMA HIGH SHINE",
        price: "₹3,500+",
        duration: "90 MIN",
        beforeAfterImage: "Assets/hair_botox_before_after.png",
        description: "Rich, multi-dimensional permanent global tinting with high-shine sealants and ammonia-free nourishing formulas."
    },
    {
        id: "facial-o3-whitening",
        title: "O3+ Skin Whitening & Brightening Facial",
        category: "facials",
        categoryTag: "CLINICAL GLOW (PREMIUM)",
        price: "₹3,000",
        duration: "60 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "Clinical grade O3+ oxygenating treatment. Fades dark spots, evens melanin distribution, and unlocks luminous radiance."
    },
    {
        id: "facial-lotus-gold",
        title: "Lotus Gold Instant Glow Treatment",
        category: "facials",
        categoryTag: "RADIANCE RITUAL",
        price: "₹1,600",
        duration: "50 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "24K pure gold leaf extract massage that stimulates cellular turnover and leaves a gilded, youthful glow."
    },
    {
        id: "facial-o3-dtan",
        title: "Full Body & Face D-Tan Therapy",
        category: "facials",
        categoryTag: "O3+ DE-PIGMENTATION",
        price: "₹3,000",
        duration: "90 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "Active botanical bio-peel that lifts stubborn sun damage, hyperpigmentation, and environmental oxidative stress."
    },
    {
        id: "men-hair-patch",
        title: "Men's Hair Fixing & New Patch System",
        category: "men",
        categoryTag: "NATURAL HAIR REPLACEMENT",
        price: "₹8,000 - ₹35,000",
        duration: "90 MIN",
        beforeAfterImage: "Assets/men_hair_patch_before_after.png",
        description: "Non-surgical skin-friendly natural hair patch integration. Seamless blend with 100% natural virgin human hair."
    },
    {
        id: "men-straightening-botox",
        title: "Men's Straightening & Hair Spa Botox",
        category: "men",
        categoryTag: "GROOMING THERAPY",
        price: "₹2,000",
        duration: "60 MIN",
        beforeAfterImage: "Assets/men_hair_patch_before_after.png",
        description: "Precision texturizing, anti-frizz botox elixir, and scalp revigorating therapy crafted specifically for men."
    },
    {
        id: "men-cut-beard",
        title: "Men's Architectural Cut & Beard Sculpting",
        category: "men",
        categoryTag: "PRECISION GROOMING",
        price: "₹350",
        duration: "45 MIN",
        beforeAfterImage: "Assets/men_hair_patch_before_after.png",
        description: "Custom head-shape analysis, hot-towel alignment, and razor beard sculpting with organic cedarwood oil finish."
    },
    {
        id: "waxing-rica-full-body",
        title: "Full Body RICA Waxing",
        category: "waxing",
        categoryTag: "SOOTHING ITALIAN WAX",
        price: "₹1,200",
        duration: "60 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "Gentle Italian liposoluble wax infused with natural avocado oils for smooth, irritation-free hair removal."
    },
    {
        id: "waxing-bikini-peel",
        title: "Full Bikini Peel Off Wax",
        category: "waxing",
        categoryTag: "PAINLESS ORGANIC PEEL",
        price: "₹2,000",
        duration: "45 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "Stripless hypoallergenic film wax for maximum comfort, silky skin texture, and long-lasting smoothness."
    },
    {
        id: "makeup-bridal",
        title: "Bridal Makeup & Hair Styling",
        category: "body-nails",
        categoryTag: "MASTER ARTISTRY",
        price: "₹15,000",
        duration: "180 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "High-definition airbrush bridal makeup, luxury veil draping, and bespoke hair styling crafted by master artists."
    },
    {
        id: "body-polishing",
        title: "Full Body Polishing Ritual",
        category: "body-nails",
        categoryTag: "DEEP EXFOLIATION & NOURISHMENT",
        price: "₹8,000",
        duration: "120 MIN",
        beforeAfterImage: "Assets/facial_o3_before_after.png",
        description: "Full-body micro-scrub exfoliation followed by cocoa butter body wrap and relaxing aromatherapy massage."
    }
];
