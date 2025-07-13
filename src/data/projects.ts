export interface Project {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  date: string;
  venue: string;
  beneficiaries?: number;
  impact: string;
  partners: string[];
  facebookLink: string;
  shareableLink: string;
  image: string;
  category: string;
  hashtags?: string[];
  // Markdown-specific fields
  bulletPoints?: string[];
  richDescription?: string; // Contains markdown formatting
  partnerLinks?: Array<{
    name: string;
    url?: string;
  }>;
  highlights?: string[];
  // Gallery field
  gallery?: Array<{
    id: number;
    url: string;
    caption: string;
    category: string;
  }>;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Regala Esperanza: A 3-in-1 Project",
    slug: "regala-esperanza-3-in-1-project",
    shortDescription: "A collaborative 3-in-1 project with Rotary Club focusing on PRIMAGRAVIDA Safe Motherhood initiative for first-time mothers.",
    description: "The Rotaract Club and Rotary Club of Zamboanga City West successfully joined forces for the Regala Esperanza project, alongside our amazing partner organizations! This 3-in-1 event highlighted the PRIMAGRAVIDA Safe Motherhood initiative, empowering first-time mothers in Zamboanga City with free medical check-ups, provided by the Zamboanga City Medical Center and ZCMC Department of Obstetrics and Gynecology. Informative sessions led by the Zamboanga City Medical Center, Department of Obstetrics and Gynecology, to prepare mothers for a healthy and safe motherhood journey. A special MOA signing ceremony took place with the Rotary Club of Zamboanga City West, ZCMC, and Myler Agribusiness, Inc.",
    richDescription: "The Rotaract Club and Rotary Club of Zamboanga City West successfully joined forces for the **Regala Esperanza** project, alongside our amazing partner organizations!\n\nThis 3-in-1 event highlighted the **PRIMAGRAVIDA Safe Motherhood** initiative, empowering first-time mothers in Zamboanga City with:\n\n• Free medical check-ups, provided by the Zamboanga City Medical Center and ZCMC Department of Obstetrics and Gynecology.\n• Informative sessions led by the Zamboanga City Medical Center, Department of Obstetrics and Gynecology, to prepare mothers for a healthy and safe motherhood journey.\n\nA special MOA signing ceremony took place with the Rotary Club of Zamboanga City West, ZCMC, and Myler Agribusiness, Inc.",
    date: "2024-07-06",
    venue: "Zamboanga City Medical Center",
    beneficiaries: undefined,
    impact: "Empowered first-time mothers with free medical check-ups and informative sessions for healthy motherhood journey",
    bulletPoints: [
      "Free medical check-ups, provided by the Zamboanga City Medical Center and ZCMC Department of Obstetrics and Gynecology",
      "Informative sessions led by the Zamboanga City Medical Center, Department of Obstetrics and Gynecology, to prepare mothers for a healthy and safe motherhood journey"
    ],
    partners: [
      "Rotary Club of Zamboanga City West",
      "Zamboanga City Medical Center",
      "ZCMC-Department of Obstetrics Center",
      "Myler Agribusiness, Inc.",
      "Zamboanga City Health Office",
      "International Pharmaceuticals, Inc.",
      "Rotaract Club of Southern City Colleges"
    ],
    facebookLink: "https://www.facebook.com/share/p/1EvLA4qYMG/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/regala-esperanza-3-in-1-project",
    image: "/projects/regala-esperanza-3-in-1-project/header.jpg",
    category: "Health & Wellness",
    hashtags: ["#RegalaEsperanza", "#SafeMotherhood", "#PRIMAGRAVIDA"],
    highlights: [
      "PRIMAGRAVIDA Safe Motherhood initiative",
      "Free medical check-ups for first-time mothers",
      "MOA signing ceremony with key partners"
    ],
    gallery: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Medical check-ups for first-time mothers",
        category: "Health & Wellness"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "MOA signing ceremony with partners",
        category: "Partnership"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Informative sessions for safe motherhood",
        category: "Education"
      }
    ]
  },
  {
    id: 2,
    title: "Kids Fun Day",
    slug: "kids-fun-day",
    shortDescription: "A joyful event as part of the BACK TO SCHOOL initiative, featuring book turnover and Day Care Center improvement unveiling.",
    description: "The Rotaract Club of Zamboanga City West, successfully hosted a KIDS FUN DAY. This event was part of the BACK TO SCHOOL initiative, which included the turnover of books and the unveiling of a newly improved Day Care Center. The day was filled with excitement, learning, and unforgettable memories for all the students. We are committed to fostering a love for learning through fun and play, and this event was a fantastic step toward that goal.",
    richDescription: "The Rotaract Club of Zamboanga City West, successfully hosted a **KIDS FUN DAY**. This event was part of the **BACK TO SCHOOL** initiative, which included:\n\n• Turnover of books\n• Unveiling of a newly improved Day Care Center\n\nThe day was filled with excitement, learning, and unforgettable memories for all the students. We are committed to fostering a love for learning through fun and play, and this event was a fantastic step toward that goal.",
    date: "2024-08-31",
    venue: "Barney Child Development Center, Brgy Tulungatung, Zamboanga City",
    beneficiaries: undefined,
    impact: "Bringing smile and joy to young learners while fostering love for learning through fun and play",
    bulletPoints: [
      "Turnover of books",
      "Unveiling of a newly improved Day Care Center"
    ],
    partners: ["Rotary Club of Zamboanga City West"],
    facebookLink: "https://www.facebook.com/share/p/1Aci1RnTYr/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/kids-fun-day",
    image: "/projects/kids-fun-day/header.jpg",
    category: "Education & Youth",
    hashtags: ["#KidsFunDay", "#BackToSchool", "#Education"],
    highlights: [
      "BACK TO SCHOOL initiative",
      "Book turnover ceremony",
      "Day Care Center improvement unveiling"
    ]
  },
  {
    id: 3,
    title: "International Coastal Cleanup 2024",
    slug: "international-coastal-cleanup-2024",
    shortDescription: "Environmental initiative joining the city-wide coastal clean-up along R.T. Lim Boulevard in line with Presidential Proclamation No. 470.",
    description: "Rotaract Club of Zamboanga City West joins International Coastal Clean Up 2024! In line with Presidential Proclamation No. 470, Series of 2003, declaring every 3rd Saturday of September as International Coastal Clean-up (ICC) Day, the City Government of Zamboanga, through the Office of the City Environment and Natural Resources (OCENR), successfully conducted a city-wide coastal clean-up. Together with Zamboanga SK Federation, coastal barangays, stakeholders, and industries, Rotaract Club of Zamboanga City West joined forces along R.T. Lim Boulevard, San Jose Cawa-Cawa, at the break of dawn. With our participation and dedication, we made a significant impact in keeping our coastal areas clean and safe for future generations.",
    richDescription: "**Rotaract Club of Zamboanga City West** joins **International Coastal Clean Up 2024**!\n\nIn line with **Presidential Proclamation No. 470, Series of 2003**, declaring every 3rd Saturday of September as International Coastal Clean-up (ICC) Day, the City Government of Zamboanga, through the Office of the City Environment and Natural Resources (OCENR), successfully conducted a city-wide coastal clean-up.\n\nTogether with Zamboanga SK Federation, coastal barangays, stakeholders, and industries, Rotaract Club of Zamboanga City West joined forces along **R.T. Lim Boulevard, San Jose Cawa-Cawa**, at the break of dawn.\n\nWith our participation and dedication, we made a significant impact in keeping our coastal areas clean and safe for future generations.",
    date: "2024-09-21",
    venue: "R.T. Lim Boulevard, San Jose Cawa-Cawa",
    beneficiaries: undefined,
    impact: "SeaTheChange and make every day a step toward a cleaner and greener Zamboanga!",
    partners: ["City Government of Zamboanga", "Office of the City Environment and Natural Resources (OCENR)", "Zamboanga SK Federation"],
    facebookLink: "https://www.facebook.com/share/p/16tdwb9KsR/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/international-coastal-cleanup-2024",
    image: "/projects/international-coastal-cleanup-2024/header.jpg",
    category: "Environment",
    hashtags: ["#SeaTheChange", "#CoastalCleanup", "#Environment"],
    highlights: [
      "International Coastal Cleanup Day 2024",
      "Presidential Proclamation No. 470 compliance",
      "City-wide coastal clean-up initiative"
    ]
  },
  {
    id: 4,
    title: "End Polio Motorcade",
    slug: "end-polio-motorcade",
    shortDescription: "Awareness motorcade initiative aimed at raising awareness about the importance of eradicating polio in partnership with Rotary Club.",
    description: "The Rotaract Club of Zamboanga City West joined forces with the Rotary Club of Zamboanga City West in the END POLIO Motorcade, an inspiring initiative aimed at raising awareness about the importance of eradicating polio. Beginning from Futura Condominium in Nuñez Ext., the motorcade brought together community leaders, health advocates, and Rotarians, all united in their mission to spread the message about polio vaccination. This event was not only a celebration of Rotary's enduring commitment to public health but also a powerful reminder of the collective effort required to protect children and future generations from the threat of polio. The Rotaractors proudly supported this cause, showing their dedication to making a lasting impact on the health and well-being of their community.",
    richDescription: "The Rotaract Club of Zamboanga City West joined forces with the **Rotary Club of Zamboanga City West** in the **END POLIO Motorcade**, an inspiring initiative aimed at raising awareness about the importance of eradicating polio.\n\nBeginning from **Futura Condominium in Nuñez Ext.**, the motorcade brought together:\n\n• Community leaders\n• Health advocates\n• Rotarians\n\nAll united in their mission to spread the message about polio vaccination.\n\nThis event was not only a celebration of Rotary's enduring commitment to public health but also a powerful reminder of the collective effort required to protect children and future generations from the threat of polio.\n\nThe Rotaractors proudly supported this cause, showing their dedication to making a lasting impact on the health and well-being of their community.",
    date: "2024-10-26",
    venue: "Futura Condominium in Nuñez Ext",
    beneficiaries: undefined,
    impact: "Raised awareness about polio vaccination and the collective effort required to protect children and future generations",
    bulletPoints: [
      "Community leaders",
      "Health advocates", 
      "Rotarians"
    ],
    partners: ["Rotary Club of Zamboanga City West"],
    facebookLink: "https://www.facebook.com/share/p/1HTQfChuTu/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/end-polio-motorcade",
    image: "/projects/end-polio-motorcade/header.jpg",
    category: "Health & Wellness",
    hashtags: ["#EndPolio", "#PolioVaccination", "#PublicHealth"],
    highlights: [
      "END POLIO Motorcade initiative",
      "Polio vaccination awareness campaign",
      "Community health advocacy"
    ]
  },
  {
    id: 5,
    title: "FoodLoop & ISLA Kah-BILANG Project – D' Beat of Nutrition Project",
    slug: "foodloop-isla-kah-bilang-project",
    shortDescription: "Groundbreaking food security initiative introducing the innovative 'Gardenator' vertical farming system to remote communities.",
    description: "The Rotary Club of Zamboanga City West, under the leadership of President Rey Ariño, in collaboration with the Rotaract Club of Zamboanga City West, Tactical Operations Wing Western Mindanao of the Philippine Air Force, Kids Who Farm, Community Association of Youth in Action, SK Mercedes, and the Supreme Student Council of the Philippines - Zamboanga Chapter, successfully launched the D' Beat of Nutrition Project in Sitio Bilang Bilang, Barangay Mercedes. This groundbreaking initiative introduced the innovative 'Gardenator' – a vertical barrel farming system designed to equip families in remote and underserved areas, including coastal and island communities, with a sustainable means to grow their own food. The project is a vital step toward achieving food security, ensuring that even the most isolated households have access to fresh and nutritious produce.",
    richDescription: "The **Rotary Club of Zamboanga City West**, under the leadership of **President Rey Ariño**, in collaboration with the Rotaract Club of Zamboanga City West, **Tactical Operations Wing Western Mindanao of the Philippine Air Force**, **[Kids Who Farm](https://www.facebook.com/kidswhofarm)**, **Community Association of Youth in Action**, **SK Mercedes**, and the **Supreme Student Council of the Philippines - Zamboanga Chapter**, successfully launched the **D' Beat of Nutrition Project** in Sitio Bilang Bilang, Barangay Mercedes.\n\nThis groundbreaking initiative introduced the innovative **'Gardenator'** – a vertical barrel farming system designed to equip families in remote and underserved areas, including coastal and island communities, with a sustainable means to grow their own food.\n\nThe project is a vital step toward achieving food security, ensuring that even the most isolated households have access to fresh and nutritious produce.",
    date: "2024-11-23",
    venue: "Sitio Bilang Bilang Mercedes",
    beneficiaries: undefined,
    impact: "Together, we're planting the seeds of change and nurturing a future where no island is left behind in the journey toward food security and sustainability.",
    partners: [
      "Rotary Club of Zamboanga City West",
      "Tactical Operations Wing Western Mindanao of the Philippine Air Force",
      "Kids Who Farm",
      "Community Association of Youth in Action",
      "SK Mercedes",
      "Supreme Student Council of the Philippines - Zamboanga Chapter"
    ],
    partnerLinks: [
      { name: "Rotary Club of Zamboanga City West", url: "https://www.facebook.com/RCZCwest" },
      { name: "Kids Who Farm", url: "https://www.facebook.com/kidswhofarm" }
    ],
    facebookLink: "https://www.facebook.com/share/v/19fYGfNqY8/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/foodloop-isla-kah-bilang-project",
    image: "/projects/foodloop-isla-kah-bilang-project/header.jpg",
    category: "Food Security",
    hashtags: ["#FoodSecurity", "#Gardenator", "#SustainableFarming"],
    highlights: [
      "D' Beat of Nutrition Project",
      "Gardenator vertical farming system",
      "Food security for remote communities"
    ]
  },
  {
    id: 6,
    title: "Bida El Comunidad Year 2: Muntinlupa City",
    slug: "bida-el-comunidad-year-2-muntinlupa",
    shortDescription: "Multi-club collaboration deploying Gardenators with full-cycle technology transfer on vegetable production and composting.",
    description: "Through the collaboration of the ROTARACT CLUB of MAKATI and the Rotaract Club of Zamboanga City West, in partnership with Kids Who Farm we successfully deployed Gardenators—vertical barrel container gardens with integrated food waste composting systems. Community members actively participated in our full-cycle technology transfer on vegetable production and composting, equipping them with the knowledge and tools to cultivate fresh, safe food while turning food waste into valuable nutrients. This initiative was a huge success, thanks to the unwavering support of our Project Partners, whose dedication to sustainability and community empowerment made this project possible. Your commitment has transformed lives and strengthened food security in the community.",
    richDescription: "Through the collaboration of the **[ROTARACT CLUB of MAKATI](https://www.facebook.com/RACMakatiPH)** and the Rotaract Club of Zamboanga City West, in partnership with **[Kids Who Farm](https://www.facebook.com/kidswhofarm)** we successfully deployed **Gardenators**—vertical barrel container gardens with integrated food waste composting systems.\n\nCommunity members actively participated in our **full-cycle technology transfer** on:\n\n• Vegetable production\n• Composting\n\nEquipping them with the knowledge and tools to cultivate fresh, safe food while turning food waste into valuable nutrients.\n\nThis initiative was a huge success, thanks to the unwavering support of our Project Partners, whose dedication to sustainability and community empowerment made this project possible. Your commitment has transformed lives and strengthened food security in the community.",
    date: "2025-02-23",
    venue: "Muntinlupa City",
    beneficiaries: undefined,
    impact: "This initiative was a huge success, thanks to the unwavering support of our Project Partners, whose dedication to sustainability and community empowerment made this project possible. Your commitment has transformed lives and strengthened food security in the community.",
    bulletPoints: [
      "Vegetable production",
      "Composting"
    ],
    partners: [
      "Rotaract Club of Makati",
      "Kids Who Farm",
      "Rotaract Club of Calumpit",
      "Rotaract Club of Carmen Valley",
      "Rotaract Club of Manila Supreme 198",
      "Rotaract Club of Magalang",
      "Rotaract Club of Angono",
      "Rotaract Club of Valenzuela Premiere",
      "Rotaract Club of Carmona",
      "Rotaract Club of Quirino Manila Central",
      "Rotaract Club of Muntinlupa Central",
      "Rotaract Club of Parola",
      "Rotaract Club of Bagong Sandigan",
      "Rotaract Club of Lucena South",
      "Rotaract Club of Makati West",
      "Rotaract Club of Cavite Aguinaldo",
      "Rotaract Club of Caloocan",
      "Rotaract Club of Young Filipino Educators",
      "Rotaract Club of Dasmarinas City",
      "Rotaract Club of San Pedro East 3820",
      "Rotaract Club of Puerto Princesa",
      "Rotaract Club of Puerto Princesa - Palawan State University",
      "Lungsod ng Muntinlupa LGU",
      "Extension Services Office Muntinlupa",
      "SK Sucat",
      "Local Youth Development Council LYDC- Muntinlupa City"
    ],
    partnerLinks: [
      { name: "ROTARACT CLUB of MAKATI", url: "https://www.facebook.com/RACMakatiPH" },
      { name: "Kids Who Farm", url: "https://www.facebook.com/kidswhofarm" },
      { name: "Rotaract Club of Calumpit", url: "https://www.facebook.com/raccalumpit3770" },
      { name: "Rotaract Club of Carmen Valley", url: "https://www.facebook.com/RotaractClubOfCarmenValley" },
      { name: "Rotaract Club of Muntinlupa Central", url: "https://www.facebook.com/RACMuntinlupaCentral" },
      { name: "Rotaract Club of Lucena South", url: "https://www.facebook.com/RotaractClubofLucenaSouth" },
      { name: "Rotaract Club of San Pedro East 3820", url: "https://www.facebook.com/RotaractSanPedroEast" }
    ],
    facebookLink: "https://www.facebook.com/share/p/16UV2AtVgd/",
    shareableLink: "https://rotaract.rotaryzcwest.org/projects/bida-el-comunidad-year-2-muntinlupa",
    image: "/projects/bida-el-comunidad-year-2-muntinlupa/header.jpg",
    category: "Community Development",
    hashtags: ["#BidaElComunidad", "#CommunityEmpowerment", "#FoodSecurity"],
    highlights: [
      "Bida El Comunidad Year 2",
      "Multi-club collaboration",
      "Full-cycle technology transfer",
      "Gardenators deployment"
    ]
  }
];

export default projects; 