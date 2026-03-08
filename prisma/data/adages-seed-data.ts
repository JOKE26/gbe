/**
 * Données de seed massif — Proverbes / Adages africains
 *
 * Sources : patrimoine oral public, recueils académiques de proverbes africains,
 * collections linguistiques universitaires, tradition orale documentée.
 *
 * Les proverbes africains sont du domaine public — transmis oralement depuis
 * des générations et documentés dans de nombreux ouvrages de référence.
 *
 * ⚠️  L'orthographe des langues africaines peut varier selon les conventions
 * locales. Faire vérifier par des locuteurs natifs si possible.
 *
 * Langues couvertes :
 * - Fon (fon) — Bénin — 25 proverbes
 * - Yoruba (yor) — Nigeria — 25 proverbes
 * - Bambara (bam) — Mali — 25 proverbes
 * - Wolof (wol) — Sénégal — 25 proverbes
 * - Éwé (ewe) — Togo — 20 proverbes
 * - Igbo (ibo) — Nigeria — 20 proverbes
 * - Hausa (hau) — Nigeria/Niger — 15 proverbes
 * - Lingala (lin) — RD Congo — 5 proverbes
 * - Akan/Twi (aka) — Ghana — 5 proverbes
 * - Mooré (mos) — Burkina Faso — 5 proverbes
 * - Goun (guw) — Bénin — 5 proverbes
 *
 * Total : ~175 proverbes
 */

export interface AdageSeedItem {
  langueCode: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage: string;
  source: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * FON — Bénin (25 proverbes)
 * Source : Tradition orale Fon, recueils de proverbes du Bénin
 * ═══════════════════════════════════════════════════════════════════════════ */

const FON_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "fon",
    texteOriginal: "Alɔ ɖokpo ma nɔ xwlé nǔ",
    traductionLitterale: "Une seule main ne peut pas nouer un paquet.",
    explication:
      "Ce proverbe Fon enseigne que nul ne peut accomplir de grandes choses seul. Il célèbre la valeur de l'entraide et de la solidarité communautaire, piliers de la société Fon.",
    contexteUsage:
      "Utilisé pour encourager la coopération dans un projet collectif ou rappeler à quelqu'un qu'il a besoin des autres.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Tɔ̀ kpɛví wɛ nɔ húzú tɔ̀ ɖaxó",
    traductionLitterale: "C'est le petit ruisseau qui devient grand fleuve.",
    explication:
      "Ce proverbe valorise les débuts modestes. Il rappelle que toute grande réalisation commence par de petites actions. La patience et la persévérance transforment le peu en beaucoup.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un qui débute un projet ou qui doute de l'impact de ses petits efforts.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Gbɛtɔ́ wɛ nyí ajɔ̌",
    traductionLitterale: "L'être humain est un trésor.",
    explication:
      "Dans la philosophie Fon, la richesse matérielle est éphémère mais les relations humaines sont le véritable trésor. Ce proverbe place la dignité et la valeur humaine au-dessus de tout bien matériel.",
    contexteUsage:
      "Utilisé pour rappeler la valeur intrinsèque de chaque personne, ou pour consoler quelqu'un qui a perdu des biens matériels mais conserve ses proches.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Azɔ̌ wɛ nɔ kplɔ́n azɔ̌",
    traductionLitterale: "C'est le travail qui enseigne le travail.",
    explication:
      "L'apprentissage se fait par la pratique, non par la théorie seule. Ce proverbe encourage à se lancer dans l'action plutôt que de rester dans la réflexion perpétuelle.",
    contexteUsage:
      "Utilisé pour motiver un apprenti hésitant ou quelqu'un qui retarde un projet par peur de ne pas savoir faire.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛ e ɖó suúlu ɔ nɔ mɔ nǔ ɖagbe",
    traductionLitterale: "Celui qui a la patience trouve le bien.",
    explication:
      "La patience (suúlu) est une vertu cardinale dans la culture Fon. Ce proverbe affirme que les bonnes choses arrivent à ceux qui savent attendre avec sagesse et persévérance.",
    contexteUsage:
      "Utilisé pour calmer quelqu'un d'impatient ou pour encourager la persévérance dans une situation difficile.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Nǔ e a dó ɔ wɛ a nɔ ya",
    traductionLitterale: "Ce que tu sèmes, c'est ce que tu récoltes.",
    explication:
      "Principe universel de causalité dans la sagesse Fon. Chaque action porte en elle ses conséquences. Les bonnes actions engendrent le bien, les mauvaises produisent le mal.",
    contexteUsage:
      "Utilisé comme avertissement moral ou pour expliquer les conséquences naturelles des choix de vie.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Kín ɖokpo ma nɔ nyí zùn",
    traductionLitterale: "Un seul arbre ne fait pas la forêt.",
    explication:
      "Variante Fon du thème universel de l'union. Un individu isolé, aussi fort soit-il, ne peut constituer une communauté. La force réside dans le collectif.",
    contexteUsage:
      "Utilisé dans les assemblées communautaires pour rappeler l'importance de l'unité et de la participation de chacun.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Afɔ e a ɖó mɔ jí ɔ wɛ nɔ xlɛ́ ali we",
    traductionLitterale:
      "C'est le pied que tu poses sur le chemin qui te montre la route.",
    explication:
      "On ne peut connaître le chemin qu'en marchant. Ce proverbe encourage l'action et le premier pas, même dans l'incertitude. La route se révèle à celui qui avance.",
    contexteUsage:
      "Utilisé pour pousser quelqu'un à agir plutôt qu'à hésiter, ou pour encourager un voyage ou une entreprise nouvelle.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛ e dó gǎn ɔ nɔ mɔ nǔ",
    traductionLitterale: "Celui qui fait l'effort trouve.",
    explication:
      "L'effort est la clé de toute réussite dans la philosophie Fon. Ce proverbe est un encouragement direct : personne ne reste les mains vides quand il travaille avec détermination.",
    contexteUsage:
      "Utilisé pour motiver au travail, à l'étude ou dans toute entreprise demandant de l'énergie.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛxo sín xó ma nɔ sa",
    traductionLitterale: "La parole d'un ancien ne se vend pas.",
    explication:
      "La sagesse des anciens est inestimable et ne peut être achetée. Elle se transmet gratuitement de génération en génération, comme un héritage sacré de la communauté.",
    contexteUsage:
      "Utilisé pour souligner l'importance d'écouter et de respecter les conseils des aînés.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Sìn e a nɔ nu ɔ, a ɖó na tuùn fí e é gosin",
    traductionLitterale: "L'eau que tu bois, tu dois connaître sa source.",
    explication:
      "Ce proverbe parle de gratitude et de mémoire. Il faut toujours se souvenir de ses origines, de ceux qui nous ont aidés, et rester reconnaissant envers les sources de notre bien-être.",
    contexteUsage:
      "Utilisé pour rappeler à quelqu'un de ne pas oublier ses racines ou ceux qui l'ont soutenu dans son parcours.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Nukúnmɛ wɛ nɔ xlɛ́ ali mɛ",
    traductionLitterale:
      "Ce sont les yeux qui montrent le chemin à la personne.",
    explication:
      "La vision — au sens propre comme figuré — guide nos pas. Il faut observer, analyser et comprendre avant d'agir. La sagesse commence par le regard attentif.",
    contexteUsage:
      "Utilisé pour encourager l'observation et la réflexion avant l'action, ou pour souligner l'importance de la vision dans le leadership.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Wǎn e a yí nú mɛ ɔ wɛ mɛ nɔ yí nú we",
    traductionLitterale:
      "L'amour que tu donnes aux gens, c'est celui qu'on te rend.",
    explication:
      "La réciprocité est au cœur des relations humaines chez les Fon. Le respect, l'amour et la générosité que tu offres te reviennent naturellement.",
    contexteUsage:
      "Utilisé pour enseigner la bienveillance aux enfants ou pour expliquer pourquoi une personne est aimée ou rejetée par sa communauté.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Agbǎn ɖé ma nɔ kló nú mɛ ɖokpo",
    traductionLitterale: "Un fardeau ne repose pas sur une seule personne.",
    explication:
      "Les difficultés de la vie sont faites pour être partagées. Ce proverbe invite à ne pas porter seul ses problèmes et à accepter l'aide de la communauté.",
    contexteUsage:
      "Utilisé quand quelqu'un refuse de l'aide par fierté, ou pour offrir du soutien à une personne en difficulté.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Ayǐ nɔ ɖɔ xó nú mɛ e ɖó tó",
    traductionLitterale: "La terre parle à ceux qui ont des oreilles.",
    explication:
      "La nature et l'environnement sont pleins d'enseignements pour ceux qui savent écouter. Ce proverbe valorise l'écoute attentive et la connexion avec la nature et la sagesse ancestrale.",
    contexteUsage:
      "Utilisé pour pousser quelqu'un à être plus attentif, à écouter les signes de la vie ou les conseils des sages.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛ e ma yì fí ɖé ǎ ɔ nɔ ɖɔ xwé tɔn wɛ nyɔ́",
    traductionLitterale:
      "Celui qui n'a voyagé nulle part dit que sa maison est la plus belle.",
    explication:
      "Le voyage ouvre l'esprit. Sans expérience du monde extérieur, on reste prisonnier de ses propres limites et de son ignorance. Ce proverbe encourage à explorer et à s'ouvrir.",
    contexteUsage:
      "Utilisé pour encourager le voyage, l'ouverture d'esprit ou pour relativiser les certitudes de quelqu'un qui manque d'expérience.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Hǔn e ɖó wǔ ɖokpo ɔ ma nɔ jla hún",
    traductionLitterale: "Le tam-tam à une seule face ne résonne pas.",
    explication:
      "Il faut toujours considérer les deux côtés d'une situation. Un point de vue unique est incomplet. Ce proverbe invite au dialogue, à l'écoute de toutes les parties.",
    contexteUsage:
      "Utilisé dans la résolution de conflits pour rappeler qu'il faut écouter toutes les versions avant de juger.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Toxósu ɖé ma nɔ kpé wǔ n'i bo ɖu axɔ́sú ɖokpo",
    traductionLitterale: "Aucun roi ne peut régner seul.",
    explication:
      "Le pouvoir ne s'exerce jamais dans l'isolement. Même le plus grand chef a besoin de conseillers, d'alliés et du soutien de son peuple. Ce proverbe est un appel à l'humilité du leadership.",
    contexteUsage:
      "Utilisé pour rappeler à un dirigeant l'importance du conseil ou pour encourager le travail d'équipe.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛ e nɔ ɖi xɛ ɔ, xwé tɔn nɔ ɖó awǎ",
    traductionLitterale: "Celui qui danse, sa maison connaît la joie.",
    explication:
      "La joie et l'énergie positive sont contagieuses. Quand on est joyeux, on répand le bonheur autour de soi. Ce proverbe célèbre la danse et la joie de vivre comme piliers du foyer.",
    contexteUsage:
      "Utilisé pour encourager la joie au quotidien ou lors de fêtes et cérémonies familiales.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Jǐ ma nɔ ja gbè ɖokpo kpowun",
    traductionLitterale: "La pluie ne tombe pas en un seul jour.",
    explication:
      "Les bonnes choses prennent du temps et reviennent en cycles. Il ne faut pas désespérer après un échec ou une période sèche — la pluie reviendra.",
    contexteUsage:
      "Utilisé pour réconforter quelqu'un après un échec ou pour encourager la patience dans l'attente d'un résultat.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Kanlin ɖokpo sín glo ma nɔ sɔ́ jɔtɛn",
    traductionLitterale: "Le cri d'un seul animal ne remplit pas la brousse.",
    explication:
      "Une voix isolée n'a pas assez de poids pour changer les choses. Il faut l'union de plusieurs voix pour créer un impact. Ce proverbe encourage l'action collective.",
    contexteUsage:
      "Utilisé pour mobiliser un groupe ou pour montrer à quelqu'un l'importance de s'allier avec d'autres.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Mɛ e ɖó xɔ́ntɔn gègé ɔ ɖó ali gègé",
    traductionLitterale: "Celui qui a beaucoup d'amis a beaucoup de chemins.",
    explication:
      "Les relations sociales ouvrent des portes et offrent des opportunités. Ce proverbe valorise l'amitié et le réseau communautaire comme richesse fondamentale.",
    contexteUsage:
      "Utilisé pour encourager les relations sociales ou pour féliciter quelqu'un de bien entouré.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Nǔ e jɛ wá yi ɔ wɛ nyí kpɔ́ndéwú",
    traductionLitterale: "Ce qui s'est passé autrefois est un exemple.",
    explication:
      "L'histoire est un enseignement. Les événements passés servent de guide pour le présent et le futur. Ce proverbe encourage à tirer des leçons du passé.",
    contexteUsage:
      "Utilisé pour appuyer un argument en s'appuyant sur l'histoire ou l'expérience passée.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Xɔ́ jɛ̀ gudo tɔn wɛ nɔ xlɛ́ kúnsin",
    traductionLitterale:
      "C'est le dernier grenier qui montre ce qu'on possède.",
    explication:
      "On ne peut juger de la richesse ou de la réussite de quelqu'un qu'à la fin. Les apparences du début sont trompeuses — c'est le résultat final qui compte.",
    contexteUsage:
      "Utilisé pour encourager la patience dans le jugement ou pour défendre quelqu'un dont la réussite n'est pas encore visible.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "fon",
    texteOriginal: "Gbɛ̀ ma nɔ nɔ fínɛ́",
    traductionLitterale: "La vie ne reste pas sur place.",
    explication:
      "La vie est mouvement et changement constant. Rien n'est permanent — ni la joie, ni la souffrance. Ce proverbe invite à accepter le changement comme partie intégrante de l'existence.",
    contexteUsage:
      "Utilisé pour consoler quelqu'un dans l'épreuve ou pour rappeler à quelqu'un dans le succès que rien ne dure éternellement.",
    source: "Tradition orale Fon — Bénin",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * YORUBA — Nigeria / Bénin (25 proverbes)
 * Source : Tradition orale Yoruba, corpus Ifá, recueils de proverbes (Owe)
 * ═══════════════════════════════════════════════════════════════════════════ */

const YORUBA_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "yor",
    texteOriginal: "Bí a bá ńlá, a á gbàgbé ìgbà tí a wà ní kékeré",
    traductionLitterale:
      "Quand on grandit, on oublie le temps où on était petit.",
    explication:
      "Ce proverbe Yoruba rappelle le danger de l'oubli de ses origines. Le succès ne doit pas faire oublier les débuts modestes et ceux qui ont aidé en chemin.",
    contexteUsage:
      "Utilisé pour rappeler l'humilité à quelqu'un qui a réussi et oublie d'où il vient.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Àgbà kì í wà lójà kí orí ọmọ títúnbò wó",
    traductionLitterale:
      "Un ancien n'est pas au marché pendant que la tête d'un nouveau-né se déforme.",
    explication:
      "Les aînés ont la responsabilité de protéger et guider les plus jeunes. Ce proverbe rappelle le rôle des anciens dans la société Yoruba : être présents et vigilants pour les générations futures.",
    contexteUsage:
      "Utilisé pour reprocher à un aîné son inaction face à un problème qui touche les jeunes, ou pour souligner la responsabilité des leaders.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ẹni tó bá fẹ́ jẹ oyin inú àdo, kò gbọdọ̀ bẹ̀rù àtàtà ogun",
    traductionLitterale:
      "Celui qui veut manger le miel dans la jarre ne doit pas craindre les piqûres d'abeilles.",
    explication:
      "Toute récompense exige un effort et un sacrifice. Ce proverbe encourage le courage face aux difficultés et rappelle que la peur ne doit pas empêcher d'atteindre ses objectifs.",
    contexteUsage:
      "Utilisé pour motiver quelqu'un qui hésite face à un défi ou qui craint les conséquences de ses ambitions.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Bí ọ̀rọ̀ bá tí ẹnu méjì jade, ó ti dàrú",
    traductionLitterale:
      "Si une parole sort de deux bouches, elle est déjà déformée.",
    explication:
      "La confidentialité est essentielle. Dès qu'un secret est partagé, il se déforme et se propage. Ce proverbe met en garde contre le commérage et la divulgation.",
    contexteUsage:
      "Utilisé pour souligner l'importance de la discrétion ou pour expliquer comment une information a été déformée.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ẹni tó mọ̀ pé ibi tó ńlọ gun, kò ní í sáré",
    traductionLitterale:
      "Celui qui sait que sa destination est lointaine ne court pas.",
    explication:
      "La sagesse réside dans la mesure de son énergie. Pour un long voyage, il faut un rythme constant, pas un sprint. Ce proverbe enseigne la planification et la gestion de soi.",
    contexteUsage:
      "Utilisé pour calmer quelqu'un de trop pressé ou pour enseigner la gestion du temps et de l'énergie dans un projet de longue haleine.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Àgbàlagbà tó ní ìmọ̀ ó ju ọmọdé tó ní agbára lọ",
    traductionLitterale:
      "Un vieillard qui a la sagesse surpasse un jeune qui a la force.",
    explication:
      "La sagesse et l'expérience valent plus que la force brute. Ce proverbe valorise la connaissance des anciens et rappelle que l'intelligence prime sur la puissance physique.",
    contexteUsage:
      "Utilisé pour donner de l'autorité à la parole d'un ancien face à l'impulsivité d'un jeune.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Bí ọwọ́ kan bá fọ́ ọwọ́ kan, àwọn méjèèjì á mọ́",
    traductionLitterale: "Si une main lave l'autre, les deux seront propres.",
    explication:
      "L'entraide est bénéfique pour tous. Ce proverbe est un appel à la solidarité : en aidant les autres, on s'aide soi-même. La réciprocité est au cœur des relations communautaires.",
    contexteUsage:
      "Utilisé pour encourager l'entraide mutuelle ou pour expliquer les bienfaits de la coopération.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Iṣẹ́ l'oògùn ìṣẹ́",
    traductionLitterale: "Le travail est le remède contre la pauvreté.",
    explication:
      "Proverbe Yoruba parmi les plus connus. Il affirme que seul le travail libère de la misère. Pas de raccourci, pas de magie — le travail est le seul remède véritable.",
    contexteUsage:
      "Utilisé comme maxime quotidienne pour encourager le travail et décourager la paresse ou la recherche de gain facile.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọmọ tí a kò kọ́ ni yóò gbé ilé ta",
    traductionLitterale: "L'enfant qu'on n'éduque pas vendra la maison.",
    explication:
      "L'éducation est l'investissement le plus important. Un enfant non éduqué détruira le patrimoine familial. Ce proverbe souligne la responsabilité des parents dans l'éducation.",
    contexteUsage:
      "Utilisé pour insister sur l'importance de l'éducation des enfants ou pour expliquer les conséquences du laxisme parental.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Bí inú bá bàjẹ́, a á rí i nínú ojú",
    traductionLitterale: "Quand le cœur est malade, on le voit dans les yeux.",
    explication:
      "Les émotions intérieures se reflètent toujours sur le visage. Ce proverbe encourage l'attention aux signes non-verbaux et la compassion envers ceux qui souffrent en silence.",
    contexteUsage:
      "Utilisé pour encourager l'empathie ou pour dire à quelqu'un qu'on a remarqué sa souffrance malgré son silence.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "A kì í wò ẹni tó ṣubú lulẹ̀, a máa wo ẹni tó gbéra dìde",
    traductionLitterale:
      "On ne regarde pas celui qui tombe, on regarde celui qui se relève.",
    explication:
      "La résilience est plus admirable que la chute n'est honteuse. Ce proverbe célèbre la capacité à rebondir après un échec et encourage à ne jamais abandonner.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un après un échec ou pour célébrer la résilience d'une personne.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọwọ́ ọmọdé kò tó pẹpẹ, ti àgbàlagbà kò wọ kèrègbè",
    traductionLitterale:
      "La main de l'enfant n'atteint pas l'étagère, celle de l'adulte n'entre pas dans la calebasse.",
    explication:
      "Chaque génération a ses forces et ses limites. Les jeunes et les anciens se complètent. Ce proverbe enseigne la complémentarité entre les générations.",
    contexteUsage:
      "Utilisé pour montrer que jeunes et anciens ont besoin les uns des autres, chacun apportant ce que l'autre ne peut donner.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Aláàánú ẹni kò ní í parẹ́",
    traductionLitterale: "La bonté d'une personne ne disparaît jamais.",
    explication:
      "Les actes de bonté laissent une empreinte durable. Même après la mort, le souvenir de la générosité d'une personne perdure dans la communauté.",
    contexteUsage:
      "Utilisé pour encourager les bonnes actions ou pour honorer la mémoire d'une personne généreuse.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Kò sí bí a ti ń rìn tí a kò fi bẹ̀rẹ̀",
    traductionLitterale:
      "Il n'y a pas de marche qui n'ait commencé par un premier pas.",
    explication:
      "Tout commence par un début. Ce proverbe encourage à se lancer, à oser le premier pas, car c'est le plus difficile mais le plus important.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à commencer un projet ou pour démystifier la peur du début.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ilé ni à ń wò kí a tó ṣọmọ lórúkọ",
    traductionLitterale:
      "On regarde d'abord la maison avant de donner un nom à l'enfant.",
    explication:
      "Il faut d'abord comprendre le contexte avant d'agir. Ce proverbe enseigne la prudence et la préparation : connaître son environnement avant de prendre des décisions importantes.",
    contexteUsage:
      "Utilisé pour conseiller quelqu'un d'analyser sa situation avant de s'engager dans une action.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọ̀pọ̀lọpọ̀ igi ni ó ṣe igbó",
    traductionLitterale: "C'est la multitude d'arbres qui fait la forêt.",
    explication:
      "L'union fait la force. Chaque arbre individuel contribue à créer la forêt. Ce proverbe célèbre la force du collectif et la contribution de chacun au bien commun.",
    contexteUsage:
      "Utilisé pour mobiliser un groupe ou pour montrer que chaque contribution, même petite, compte.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ẹni tí ó gbé ìgbín sórí, omi lórí rẹ̀ á di",
    traductionLitterale:
      "Celui qui porte l'escargot sur sa tête aura de la bave dessus.",
    explication:
      "Chaque chose a ses conséquences. Ce proverbe humoristique rappelle qu'on doit assumer les effets secondaires de ses choix — bons ou mauvais.",
    contexteUsage:
      "Utilisé avec humour pour rappeler à quelqu'un les conséquences prévisibles de ses actions.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "A kì í fi ojú burúkú wo ẹranko ọ̀dẹ",
    traductionLitterale:
      "On ne regarde pas le gibier du chasseur avec de mauvais yeux.",
    explication:
      "Il faut respecter le travail et les efforts des autres. La jalousie et le mépris envers les réalisations d'autrui sont indignes. Ce proverbe appelle au respect mutuel.",
    contexteUsage:
      "Utilisé pour reprocher la jalousie ou pour demander le respect du travail d'autrui.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọ̀gá má ṣe gbàgbé ìgbà tí o jẹ́ ọmọ ẹ̀hìn",
    traductionLitterale: "Chef, n'oublie pas le temps où tu étais apprenti.",
    explication:
      "L'humilité dans le leadership. Ce proverbe rappelle aux dirigeants de ne pas oublier leurs débuts modestes et de traiter leurs subordonnés avec respect.",
    contexteUsage:
      "Utilisé pour tempérer l'arrogance d'un supérieur ou pour rappeler les valeurs d'humilité dans la hiérarchie.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọ̀rọ̀ mẹ́ta tó ṣòro fún wèrè: sùúrù, ìfọ̀kànbalẹ̀, àti ìrètí",
    traductionLitterale:
      "Trois mots difficiles pour le fou : patience, calme et espérance.",
    explication:
      "La sagesse repose sur trois piliers : la patience (sùúrù), le calme (ìfọ̀kànbalẹ̀) et l'espérance (ìrètí). Ceux qui manquent de sagesse ne parviennent pas à cultiver ces trois vertus.",
    contexteUsage:
      "Utilisé pour enseigner les vertus fondamentales ou pour qualifier d'insensé le comportement de quelqu'un d'impatient et agité.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Aṣọ tí a bá ṣe fún ẹni, tí ó bá yá, a ó tún ṣe mìíràn",
    traductionLitterale:
      "Si le vêtement qu'on a fait pour quelqu'un se déchire, on en fera un autre.",
    explication:
      "La générosité n'a pas de limite. Ce proverbe encourage à donner sans compter et à ne pas se décourager quand un acte de bonté ne porte pas ses fruits — il faut persévérer.",
    contexteUsage:
      "Utilisé pour encourager la générosité continue ou pour consoler quelqu'un dont l'aide n'a pas été valorisée.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ohun tí a bá ń wá ní Ìfẹ̀, ní Ìfẹ̀ á ti rí i",
    traductionLitterale:
      "Ce qu'on cherche à Ifè, c'est à Ifè qu'on le trouvera.",
    explication:
      "La solution à un problème se trouve là où est le problème. Ce proverbe, qui fait référence à la ville sacrée d'Ifè, encourage à chercher les réponses au bon endroit.",
    contexteUsage:
      "Utilisé pour orienter quelqu'un vers la bonne direction dans sa recherche de solutions.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọjọ́ tí a ṣebi ọjọ́ kan, ìpẹ̀kun rẹ̀ kò sí",
    traductionLitterale:
      "Le jour qu'on croit être un seul jour n'a pas de fin.",
    explication:
      "Il ne faut jamais sous-estimer un moment ou une situation. Ce qui paraît court ou insignifiant peut avoir des conséquences durables. Chaque jour compte.",
    contexteUsage:
      "Utilisé pour rappeler l'importance de chaque moment et de chaque décision, même apparemment anodine.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Okùnrin ló ń gbé ayé, obìnrin ló ń tọ́ ayé",
    traductionLitterale:
      "L'homme porte le monde, la femme prend soin du monde.",
    explication:
      "Dans la tradition Yoruba, homme et femme ont des rôles complémentaires et égaux en importance. Ce proverbe célèbre la complémentarité des genres dans la construction de la société.",
    contexteUsage:
      "Utilisé pour valoriser le rôle des femmes dans la société ou pour enseigner la complémentarité entre hommes et femmes.",
    source: "Tradition orale Yoruba — Nigeria",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ẹ̀kọ́ ilé ni ìmọ̀lẹ̀ àti ọ̀nà",
    traductionLitterale: "L'éducation du foyer est la lumière et le chemin.",
    explication:
      "La première école est la famille. L'éducation reçue au foyer éclaire le chemin de vie de l'enfant. Ce proverbe met l'accent sur la responsabilité éducative de la famille.",
    contexteUsage:
      "Utilisé pour souligner l'importance de l'éducation familiale ou pour expliquer le comportement de quelqu'un par son éducation.",
    source: "Tradition orale Yoruba — Nigeria",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * BAMBARA — Mali (25 proverbes)
 * Source : Tradition orale Bambara, recueils linguistiques du Mali
 * ═══════════════════════════════════════════════════════════════════════════ */

const BAMBARA_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "bam",
    texteOriginal: "Jiri kelen tɛ kungo ye",
    traductionLitterale: "Un seul arbre ne fait pas la forêt.",
    explication:
      "Le thème de l'union est fondamental dans la culture Bambara. Ce proverbe rappelle que la force réside dans le collectif — un individu seul ne peut pas constituer une communauté.",
    contexteUsage:
      "Utilisé pour encourager l'unité et la coopération au sein du village ou d'un groupe.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Sabali ye hɛrɛ ba ye",
    traductionLitterale: "La patience est une grande grâce.",
    explication:
      "La patience (sabali) est considérée comme la plus haute vertu dans la culture Bambara. Elle est la source de toute bénédiction et la clé pour surmonter les épreuves de la vie.",
    contexteUsage:
      "Utilisé comme bénédiction ou comme conseil pour quelqu'un qui traverse une période difficile.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Dɔ ka di ka dɔn ni dɔ ye",
    traductionLitterale: "Un savoir est bon à partager avec quelqu'un.",
    explication:
      "Le savoir n'a de valeur que s'il est partagé. Dans la tradition orale Bambara, la connaissance est un bien commun qui doit circuler. La rétention du savoir est considérée comme un acte égoïste.",
    contexteUsage:
      "Utilisé pour encourager le partage des connaissances et des compétences entre membres de la communauté.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Mɔgɔ kɔrɔ ka ɲi ni tigɛ kɔrɔ ye",
    traductionLitterale: "Un vieil homme vaut mieux qu'un vieux tissu.",
    explication:
      "Les anciens ont plus de valeur que les biens matériels. Un tissu vieillit et se dégrade, mais un ancien accumule de la sagesse. Ce proverbe enseigne le respect des aînés.",
    contexteUsage:
      "Utilisé pour rappeler la valeur des personnes âgées dans la société ou pour donner de l'autorité à la parole d'un ancien.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Kuma kɔrɔ bɛ kuma kɔnɔ",
    traductionLitterale: "Le sens profond est à l'intérieur de la parole.",
    explication:
      "Les mots ont toujours un sens caché qu'il faut savoir décoder. Dans la tradition Bambara, le langage est riche en métaphores et il faut écouter au-delà des mots littéraux.",
    contexteUsage:
      "Utilisé pour inviter quelqu'un à réfléchir plus profondément au sens d'un message ou d'une situation.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Den bɛ a fa la, a bɛ a ba fana la",
    traductionLitterale:
      "L'enfant appartient à son père, il appartient aussi à sa mère.",
    explication:
      "La responsabilité parentale est partagée. L'éducation et le soin des enfants ne reposent pas sur un seul parent. Ce proverbe affirme l'égale importance du père et de la mère.",
    contexteUsage:
      "Utilisé dans les discussions sur l'éducation des enfants ou lors de conflits familiaux pour rappeler la responsabilité commune.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Ko kura tɛ diɲɛ la",
    traductionLitterale: "Il n'y a rien de nouveau dans le monde.",
    explication:
      "L'histoire se répète. Ce qui semble nouveau a déjà existé sous une autre forme. Ce proverbe encourage à chercher dans la sagesse ancestrale les réponses aux défis d'aujourd'hui.",
    contexteUsage:
      "Utilisé pour relativiser une situation qui semble inédite ou pour encourager à consulter l'expérience des anciens.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Nɔɔrɔ ka di, nka a kɔ ka gɛlɛn",
    traductionLitterale: "La paresse est douce, mais sa fin est amère.",
    explication:
      "La paresse offre un confort immédiat mais mène à la misère. Ce proverbe met en garde contre la facilité et encourage l'effort régulier, même quand il est inconfortable.",
    contexteUsage:
      "Utilisé pour motiver au travail quelqu'un qui procrastine ou qui préfère la facilité.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Furakɛla ka kan ka furakɛ a yɛrɛ fɔlɔ",
    traductionLitterale: "Le guérisseur doit d'abord se soigner lui-même.",
    explication:
      "On ne peut aider les autres si on ne s'est pas d'abord occupé de soi. Ce proverbe appelle à la cohérence entre ce qu'on prêche et ce qu'on pratique.",
    contexteUsage:
      "Utilisé pour rappeler à quelqu'un de pratiquer ce qu'il conseille, ou pour souligner l'importance de prendre soin de soi.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Cola kelen tɛ se ka diya da fila la",
    traductionLitterale:
      "Une seule noix de cola ne peut pas satisfaire deux bouches.",
    explication:
      "Les ressources limitées ne peuvent pas satisfaire tout le monde. Ce proverbe enseigne la réalité des limites et la nécessité de faire des choix ou de trouver plus de ressources.",
    contexteUsage:
      "Utilisé pour expliquer une situation de pénurie ou pour justifier un choix difficile dans le partage des ressources.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Denbaya bɛ se bɛɛ la",
    traductionLitterale: "La famille est plus forte que tout.",
    explication:
      "La famille est le socle de la société Bambara. Rien — ni l'argent, ni le pouvoir — ne surpasse les liens familiaux. Ce proverbe célèbre la solidarité familiale comme valeur suprême.",
    contexteUsage:
      "Utilisé pour rappeler les priorités dans la vie ou pour résoudre un conflit familial en mettant l'accent sur l'unité.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Maa ka ca, dɔ tɛ dɔ ye",
    traductionLitterale: "Les gens sont nombreux, mais l'un n'est pas l'autre.",
    explication:
      "Chaque individu est unique. Ce proverbe reconnaît la diversité humaine et met en garde contre les généralisations. Il faut juger chaque personne à son mérite propre.",
    contexteUsage:
      "Utilisé pour défendre l'individualité de quelqu'un ou pour combattre les préjugés et les stéréotypes.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Waati tɛ mɔgɔ makɔnɔ",
    traductionLitterale: "Le temps n'attend personne.",
    explication:
      "Le temps est implacable et poursuit sa course sans égard pour quiconque. Ce proverbe encourage à agir maintenant, à ne pas remettre au lendemain ce qui est important.",
    contexteUsage:
      "Utilisé pour presser quelqu'un à l'action ou pour souligner l'urgence d'une situation.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Tɛmɛn bɛ bɔ fɛn bɛɛ la",
    traductionLitterale: "Tout passe.",
    explication:
      "Rien n'est permanent — ni la joie, ni la souffrance. Ce proverbe d'une sagesse profonde invite à l'acceptation sereine du changement et de l'impermanence de toute chose.",
    contexteUsage:
      "Utilisé pour consoler quelqu'un dans l'épreuve ou pour tempérer l'euphorie excessive dans les moments de bonheur.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Bɛlɛn-tigɛ tɛ mɔgɔ ɲɛ da",
    traductionLitterale: "La vérité ne plaît pas au visage des gens.",
    explication:
      "La vérité est souvent désagréable à entendre. Ce proverbe reconnaît la difficulté de dire et d'accepter la vérité, tout en affirmant sa nécessité.",
    contexteUsage:
      "Utilisé pour préparer quelqu'un à entendre une vérité difficile ou pour se justifier après avoir dit quelque chose de déplaisant mais vrai.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Dunan ka kan ka dɔn so fɔlɔ",
    traductionLitterale: "L'étranger doit d'abord connaître la maison.",
    explication:
      "Quand on arrive dans un nouvel endroit, il faut d'abord observer et comprendre avant d'agir. Ce proverbe enseigne l'humilité et l'adaptation nécessaires en terre étrangère.",
    contexteUsage:
      "Utilisé pour conseiller un nouvel arrivant dans un village, une entreprise ou un groupe social.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Mogoya ka ɲi ni wariya ye",
    traductionLitterale: "L'humanité vaut mieux que la richesse.",
    explication:
      "La noblesse humaine — la bonté, la générosité, l'intégrité — est plus précieuse que toute richesse matérielle. Ce proverbe est au cœur de la philosophie Bambara.",
    contexteUsage:
      "Utilisé pour valoriser les qualités humaines par rapport aux possessions matérielles ou pour critiquer ceux qui placent l'argent au-dessus des relations humaines.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Se bɛ mɔgɔ bɛɛ bolo, nka mɔgɔ bɛɛ tɛ se kɛ",
    traductionLitterale:
      "Tout le monde a du pouvoir, mais tout le monde ne l'utilise pas.",
    explication:
      "Chaque personne possède un potentiel, mais peu le développent pleinement. Ce proverbe encourage à exploiter ses capacités plutôt que de les laisser dormir.",
    contexteUsage:
      "Utilisé pour motiver quelqu'un qui sous-estime ses capacités ou qui ne met pas en œuvre son potentiel.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Hakili man nɔgɔ, nka a ka kan ka baara kɛ",
    traductionLitterale:
      "L'intelligence n'est pas sale, mais elle doit travailler.",
    explication:
      "L'intelligence seule ne suffit pas — il faut la mettre au service de l'action. Ce proverbe prône l'alliance de la pensée et du travail concret.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un d'intelligent mais passif à passer à l'action.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Bagan min bɛ kungo kɔnɔ, o tɛ sɛnɛkɛla ta ye",
    traductionLitterale:
      "L'animal qui est dans la brousse n'est pas le gibier du cultivateur.",
    explication:
      "Chacun doit rester dans son domaine de compétence. Ce proverbe enseigne à reconnaître ses limites et à respecter les domaines d'expertise des autres.",
    contexteUsage:
      "Utilisé pour dire à quelqu'un de ne pas s'engager dans ce qu'il ne maîtrise pas, ou pour défendre son propre domaine.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Jugu ka fisa ni jugu bali ye",
    traductionLitterale: "Mieux vaut avoir un ennemi que de n'en avoir aucun.",
    explication:
      "L'adversité forge le caractère. Avoir des ennemis signifie qu'on prend position, qu'on a du courage. Ce proverbe paradoxal valorise la confrontation constructive comme moteur de croissance.",
    contexteUsage:
      "Utilisé pour consoler quelqu'un qui se sent attaqué ou pour encourager le courage face à l'opposition.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Kɔnɔ min ye a faga, o le tun bɛ a kan",
    traductionLitterale:
      "L'oiseau qui l'a tué, c'est celui qui était sur son épaule.",
    explication:
      "Le danger vient souvent des proches. Ce proverbe met en garde contre la trahison de ceux en qui on a le plus confiance. La vigilance est de mise même dans les relations intimes.",
    contexteUsage:
      "Utilisé pour mettre en garde contre la confiance aveugle ou pour analyser une trahison venue d'un proche.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Hɛrɛ bɛ mɔgɔ kelen bolo",
    traductionLitterale: "La grâce est dans les mains d'un seul (Dieu).",
    explication:
      "Expression de la foi Bambara. Seul Dieu (ou la force suprême) détient la grâce et le pouvoir ultime. Ce proverbe invite à l'humilité face au destin et à la confiance en la Providence.",
    contexteUsage:
      "Utilisé comme expression de foi face à l'incertitude, ou pour tempérer l'arrogance de quelqu'un qui pense tout contrôler.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Sɛbɛn tɛ mɔgɔ ye, mɔgɔ don sɛbɛn ye",
    traductionLitterale:
      "L'écriture n'est pas l'homme, mais l'homme peut devenir écriture.",
    explication:
      "Les actes d'une personne sont sa vraie signature. Ce proverbe distingue la parole écrite des actions concrètes — ce sont les actes qui définissent réellement quelqu'un.",
    contexteUsage:
      "Utilisé pour souligner l'importance des actes par rapport aux paroles ou aux promesses.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "bam",
    texteOriginal: "Kɛlɛ ka di, nka hɛrɛ le ka ɲi",
    traductionLitterale: "La guerre est facile, mais la paix est meilleure.",
    explication:
      "Il est plus facile de détruire que de construire. Ce proverbe prône la paix comme valeur suprême et critique la tentation de la violence comme solution facile.",
    contexteUsage:
      "Utilisé dans la résolution de conflits pour encourager les parties à choisir la paix plutôt que l'affrontement.",
    source: "Tradition orale Bambara — Mali",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * WOLOF — Sénégal (25 proverbes)
 * Source : Tradition orale Wolof, patrimoine Sénégalais (Teranga)
 * ═══════════════════════════════════════════════════════════════════════════ */

const WOLOF_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "wol",
    texteOriginal: "Nit nitaay garabam",
    traductionLitterale: "L'homme est le remède de l'homme.",
    explication:
      "Proverbe Wolof fondamental, pilier de la teranga (hospitalité sénégalaise). Il affirme que la solidarité humaine est le seul vrai remède aux maux de la vie. On ne peut se soigner seul.",
    contexteUsage:
      "Utilisé pour encourager l'entraide, la solidarité et pour rappeler que personne ne peut vivre seul.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ndank-ndank mooy jàpp golo ci ñaay",
    traductionLitterale:
      "Doucement, doucement, on attrape le singe dans la brousse.",
    explication:
      "La patience et la persévérance sont les clés du succès. Ce proverbe, extrêmement populaire au Sénégal, enseigne que les objectifs les plus difficiles se réalisent par la constance, pas par la précipitation.",
    contexteUsage:
      "Utilisé comme encouragement dans toute situation qui demande de la patience — études, travail, projets personnels.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku am teranga, am na loxo",
    traductionLitterale:
      "Celui qui a la teranga (hospitalité), a la main (la générosité).",
    explication:
      "La teranga est la valeur cardinale de la culture Wolof — c'est l'hospitalité élevée en art de vivre. Ce proverbe lie directement l'hospitalité à la générosité concrète.",
    contexteUsage:
      "Utilisé pour louer l'hospitalité de quelqu'un ou pour rappeler que la teranga se manifeste par des actes concrets.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Jëf lu baax, bàyyi lu bon",
    traductionLitterale: "Fais le bien, laisse le mal.",
    explication:
      "Maxime de vie simple et puissante. Ce proverbe encourage à choisir systématiquement le bien dans chaque situation et à s'éloigner du mal sans hésitation.",
    contexteUsage:
      "Utilisé comme conseil moral universel, particulièrement envers les jeunes ou dans les moments de tentation.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku am muñ, am na leer",
    traductionLitterale: "Celui qui a la patience a la lumière.",
    explication:
      "La patience apporte la clarté. Dans les moments d'obscurité et de confusion, c'est la patience qui finit par révéler la voie. Ce proverbe lie sagesse intérieure et patience.",
    contexteUsage:
      "Utilisé pour encourager la patience dans l'incertitude ou pour promettre que la compréhension viendra avec le temps.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Liggéeyu ndey añub doom",
    traductionLitterale: "Le travail de la mère est le repas de l'enfant.",
    explication:
      "Hommage au sacrifice maternel. Ce proverbe reconnaît que c'est le labeur de la mère qui nourrit et fait grandir les enfants. Il célèbre la mère comme pilier du foyer.",
    contexteUsage:
      "Utilisé pour honorer les mères ou pour rappeler l'importance du travail, particulièrement celui des femmes.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku bëgg ñàkk dafa wara dox",
    traductionLitterale: "Celui qui veut avoir doit marcher.",
    explication:
      "Rien ne vient sans effort. Ce proverbe encourage l'action et le mouvement comme prérequis à toute acquisition. Il faut aller chercher ce qu'on veut, pas attendre que cela vienne.",
    contexteUsage:
      "Utilisé pour motiver au travail, à la recherche d'opportunités ou pour critiquer la passivité.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Mag mooy gën a xam, ndax dafa gën a gis",
    traductionLitterale: "L'aîné sait mieux, parce qu'il a vu davantage.",
    explication:
      "Le respect des aînés est fondé sur leur expérience. Ce proverbe justifie l'autorité des anciens non par leur âge mais par la richesse de leur vécu.",
    contexteUsage:
      "Utilisé pour donner de l'autorité à la parole d'un ancien ou pour enseigner le respect des aînés aux jeunes.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Dëgg dafay ñàkk",
    traductionLitterale: "La vérité fait souffrir.",
    explication:
      "La vérité est souvent douloureuse à entendre. Ce proverbe reconnaît le courage nécessaire pour dire et accepter la vérité, même quand elle blesse.",
    contexteUsage:
      "Utilisé pour préparer quelqu'un à entendre une vérité difficile ou après avoir dit quelque chose de vrai mais blessant.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku baax, Yàlla baax ci",
    traductionLitterale: "Qui est bon, Dieu est bon envers lui.",
    explication:
      "La bonté est récompensée par la grâce divine. Ce proverbe encourage à être bon car la bienveillance envers les autres attire la bénédiction de Dieu.",
    contexteUsage:
      "Utilisé comme encouragement à la bonté ou pour expliquer la bonne fortune de quelqu'un de généreux.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Xam sa bopp, ngir xam sa bopp",
    traductionLitterale: "Connais-toi toi-même pour te protéger.",
    explication:
      'La connaissance de soi est la première protection. Celui qui connaît ses forces et ses faiblesses peut naviguer la vie avec sagesse. Ce proverbe fait écho à la philosophie universelle du "connais-toi toi-même".',
    contexteUsage:
      "Utilisé pour encourager l'introspection et la conscience de soi.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Fit dafay am solo",
    traductionLitterale: "Le courage a de la valeur.",
    explication:
      "Le courage est une qualité précieuse qui mérite le respect. Ce proverbe célèbre les actes de bravoure et encourage à ne pas fuir devant les difficultés.",
    contexteUsage:
      "Utilisé pour féliciter un acte de courage ou pour encourager quelqu'un qui hésite à affronter un défi.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Lu tollu weesu, tollu na génnéefu",
    traductionLitterale: "Ce qu'il y a pour entrer, il y a aussi pour sortir.",
    explication:
      "Toute situation, même apparemment sans issue, a une solution. Ce proverbe est un message d'espoir : si on a pu entrer dans un problème, on peut aussi en sortir.",
    contexteUsage:
      "Utilisé pour rassurer quelqu'un dans une situation difficile ou pour encourager la recherche de solutions.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Am sa xam-xam, te bu ko yàqu",
    traductionLitterale: "Aie ton savoir et ne le gâche pas.",
    explication:
      "Le savoir est un trésor qui doit être préservé et mis en valeur. Ce proverbe encourage à entretenir et à utiliser ses connaissances plutôt que de les laisser se perdre.",
    contexteUsage:
      "Utilisé pour encourager l'éducation continue et la mise en pratique du savoir.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Jox ci baax, jëf ci baax",
    traductionLitterale: "Donne du bien, reçois du bien.",
    explication:
      "La loi de la réciprocité : ce que tu donnes te revient. Ce proverbe encourage la générosité comme investissement dans ses propres relations et son avenir.",
    contexteUsage:
      "Utilisé pour enseigner la générosité aux enfants ou pour expliquer la réciprocité naturelle des relations humaines.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Góor gi du bëgg bu bon",
    traductionLitterale: "L'homme de bien ne veut pas le mal.",
    explication:
      "L'intégrité est une qualité qui se manifeste dans toutes les intentions. Un homme véritablement bon ne nourrit aucune intention malveillante, même en secret.",
    contexteUsage:
      "Utilisé pour définir le caractère d'une personne intègre ou pour encourager la bonté d'intention.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Yàlla baxna, ndax lu ñu ko laaj dafay jox",
    traductionLitterale: "Dieu est bon, car ce qu'on Lui demande, Il le donne.",
    explication:
      "Expression de confiance en la bonté divine. Ce proverbe affirme que Dieu répond aux prières sincères et encourage la foi et la prière comme sources de bienfaits.",
    contexteUsage:
      "Utilisé pour exprimer la gratitude envers Dieu ou pour encourager la prière et la foi.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Lu bari dëkk, bari na baat",
    traductionLitterale:
      "Ce qui habite beaucoup d'endroits a beaucoup de noms.",
    explication:
      "Les perspectives sont multiples. Un même phénomène peut être vu sous des angles différents selon les cultures et les contextes. Ce proverbe encourage l'ouverture d'esprit.",
    contexteUsage:
      "Utilisé pour relativiser un point de vue ou pour encourager à considérer les perspectives d'autrui.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Gàkk gu yàgg ci suuf, mooy gën a xam",
    traductionLitterale: "Le pied qui reste longtemps au sol en sait le plus.",
    explication:
      "L'expérience locale est irremplaçable. Celui qui vit longtemps dans un endroit le connaît mieux que quiconque. Ce proverbe valorise la connaissance par l'immersion.",
    contexteUsage:
      "Utilisé pour donner de la valeur à l'expertise locale ou pour tempérer les opinions de ceux qui ne connaissent pas un lieu.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Sa jëkkër du sa bakkan",
    traductionLitterale: "Ton mari n'est pas ta bouche.",
    explication:
      "Chaque individu a sa propre voix et son autonomie. Ce proverbe affirme l'indépendance de la femme dans le couple — être mariée ne signifie pas perdre sa propre identité ou son droit à la parole.",
    contexteUsage:
      "Utilisé pour affirmer l'indépendance d'esprit dans les relations ou pour encourager l'expression personnelle.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Am na fu la mu gëna rafet",
    traductionLitterale: "Il y a un endroit plus beau que celui-ci.",
    explication:
      "Le monde est vaste et plein de merveilles. Ce proverbe encourage le voyage, l'exploration et l'ouverture d'esprit. Il relativise aussi l'attachement excessif à un seul lieu.",
    contexteUsage:
      "Utilisé pour encourager le voyage ou pour consoler quelqu'un qui quitte un endroit qu'il aime.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Bul ko dàkk, sa bakkan bu ko indi",
    traductionLitterale: "Ne le refuse pas, c'est ta bouche qui l'a apporté.",
    explication:
      "On doit assumer les conséquences de ses paroles et de ses promesses. Ce proverbe rappelle la responsabilité de la parole donnée.",
    contexteUsage:
      "Utilisé pour rappeler à quelqu'un ses engagements ou pour enseigner la responsabilité de la parole.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ndeysan, Yàlla rekk ci",
    traductionLitterale: "Hélas, seul Dieu est en cela.",
    explication:
      "Face à l'inexplicable ou l'insurmontable, on s'en remet à Dieu. Ce proverbe exprime l'acceptation sereine de ce qui dépasse la compréhension humaine.",
    contexteUsage:
      "Utilisé comme expression de résignation et de foi face à une épreuve ou un mystère de la vie.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku nekk fu mu nekk, dafay sol lu mu mana sol",
    traductionLitterale: "Chacun là où il est porte ce qu'il peut porter.",
    explication:
      "Chaque personne fait de son mieux avec ce qu'elle a. Ce proverbe appelle à ne pas juger les autres et à respecter les efforts de chacun selon ses moyens.",
    contexteUsage:
      "Utilisé pour défendre les efforts de quelqu'un jugé insuffisant ou pour encourager à faire de son mieux sans se comparer.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "wol",
    texteOriginal: "Doole du loxo, doole ci xel la",
    traductionLitterale:
      "La force n'est pas dans la main, la force est dans l'esprit.",
    explication:
      "La vraie puissance réside dans l'intelligence, pas dans la force physique. Ce proverbe valorise la réflexion et la stratégie comme outils supérieurs à la force brute.",
    contexteUsage:
      "Utilisé pour encourager la réflexion avant l'action ou pour valoriser l'intelligence face à la force.",
    source: "Tradition orale Wolof — Sénégal",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * ÉWÉ — Togo / Ghana (20 proverbes)
 * Source : Tradition orale Éwé, patrimoine Togolais et Ghanéen
 * ═══════════════════════════════════════════════════════════════════════════ */

const EWE_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "ewe",
    texteOriginal: "Ame aɖeke menye ga o",
    traductionLitterale: "Personne n'est inutile.",
    explication:
      "Chaque être humain a une valeur et un rôle à jouer dans la communauté. Ce proverbe Éwé affirme la dignité de chaque personne, quelle que soit sa condition sociale.",
    contexteUsage:
      "Utilisé pour défendre la valeur d'une personne marginalisée ou pour enseigner le respect de tous.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Deka mewɔa nu o",
    traductionLitterale: "Un seul ne peut rien faire.",
    explication:
      "Proverbe Éwé sur la nécessité de l'entraide. Aucun individu ne peut accomplir de grandes choses seul — la force est dans le collectif.",
    contexteUsage:
      "Utilisé pour mobiliser un groupe à l'action collective ou pour rappeler la nécessité de l'entraide.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Agble mele na amesi medua agble ƒe nu o",
    traductionLitterale: "Le champ ne donne rien à celui qui ne cultive pas.",
    explication:
      "Le travail est la condition de toute récompense. La terre ne produit que si on la travaille. Ce proverbe agricole célèbre le travail et condamne la paresse.",
    contexteUsage:
      "Utilisé pour encourager le travail et l'effort, particulièrement dans le contexte agricole du Togo.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Fifia nye fifia, etso nye etso",
    traductionLitterale: "Aujourd'hui c'est aujourd'hui, demain c'est demain.",
    explication:
      "Il faut vivre le moment présent et ne pas remettre à demain ce qui est important aujourd'hui. Ce proverbe encourage l'action immédiate tout en acceptant la séparation des jours.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à agir maintenant ou pour souligner l'importance du moment présent.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ame si le dzo ŋu la, eya nua tsi veve",
    traductionLitterale:
      "Celui qui est près du feu boit l'eau chaude en premier.",
    explication:
      "La proximité avec une source a ses avantages et ses inconvénients. Ce proverbe parle des conséquences de la position sociale et des choix de vie.",
    contexteUsage:
      "Utilisé pour expliquer les conséquences d'une position ou d'un choix, ou pour avertir des risques de certaines proximités.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Afɔ sia afɔ le mɔ dzi",
    traductionLitterale: "Un pied après l'autre sur le chemin.",
    explication:
      "La persévérance et la constance mènent au but. Ce proverbe encourage à avancer pas à pas, sans se décourager par la longueur du chemin.",
    contexteUsage:
      "Utilisé pour encourager la persévérance dans un long projet ou un apprentissage difficile.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Nunya adidoe, ame aɖeke mele eŋu o",
    traductionLitterale:
      "Le savoir est comme un baobab, personne ne peut l'embrasser seul.",
    explication:
      "Le savoir est vaste et infini — personne ne peut tout savoir. Ce proverbe enseigne l'humilité intellectuelle et encourage chacun à apprendre des autres.",
    contexteUsage:
      "Utilisé pour enseigner l'humilité face au savoir ou pour encourager le dialogue et le partage de connaissances.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ati aɖe mewɔa ave o",
    traductionLitterale: "Un seul arbre ne fait pas la forêt.",
    explication:
      "Variante Éwé du thème universel africain de l'unité. La communauté et la solidarité sont les fondements de la société.",
    contexteUsage:
      "Utilisé pour encourager l'unité et la coopération dans les projets communautaires.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Tsi vɔ mele ha mɛ o",
    traductionLitterale: "L'eau ne manque pas dans le canari.",
    explication:
      "Il y a toujours de l'espoir, toujours des ressources cachées. Même quand on croit que tout est perdu, il reste quelque chose. Ce proverbe est un message d'espérance.",
    contexteUsage:
      "Utilisé pour redonner espoir à quelqu'un dans une situation qui semble désespérée.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ku mesi ame kpoo le anyigba dzi o",
    traductionLitterale: "La mort ne craint personne sur terre.",
    explication:
      "Face à la mort, tous sont égaux — riches et pauvres, puissants et faibles. Ce proverbe rappelle l'humilité que devrait inspirer la conscience de la mortalité.",
    contexteUsage:
      "Utilisé pour rappeler l'humilité face à la mort ou pour relativiser la vanité du pouvoir et de la richesse.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Nu ka ame dua la, eya wɔna eŋu na eya",
    traductionLitterale: "Ce que l'on mange, c'est ce qui fait son visage.",
    explication:
      "Nos habitudes et nos choix nous façonnent. Ce proverbe, au sens littéral et figuré, enseigne que nous devenons ce que nous consommons — nourritures physiques et spirituelles.",
    contexteUsage:
      "Utilisé pour encourager de bonnes habitudes alimentaires ou de vie en général.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ame si le ŋgɔ la nyea mɔ",
    traductionLitterale: "Celui qui est devant connaît le chemin.",
    explication:
      "Le guide a la responsabilité de bien conduire le groupe. Ce proverbe souligne la responsabilité du leadership : celui qui mène doit connaître la voie et être digne de confiance.",
    contexteUsage:
      "Utilisé pour rappeler la responsabilité des leaders ou pour encourager ceux qui guident les autres.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Dzo metsoa ame ɖe gome o",
    traductionLitterale: "Le feu ne brûle pas quelqu'un en vain.",
    explication:
      "Il y a toujours une raison derrière un événement. Si quelqu'un souffre, il y a une cause. Ce proverbe encourage à chercher les racines des problèmes plutôt que de blâmer le hasard.",
    contexteUsage:
      "Utilisé pour analyser les causes d'un problème ou pour dire qu'une conséquence a toujours un antécédent.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Amewo kata le ame",
    traductionLitterale: "Tous les êtres humains sont des personnes.",
    explication:
      "Déclaration universelle de dignité humaine dans la tradition Éwé. Chaque être humain mérite le respect, quelles que soient ses différences.",
    contexteUsage:
      "Utilisé pour défendre l'égalité et la dignité de tous ou pour combattre la discrimination.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Nyuie meƒoa ame o",
    traductionLitterale: "La bonté ne fait de mal à personne.",
    explication:
      "Être bon est sans risque. Ce proverbe encourage la bonté comme attitude de vie, affirmant qu'elle ne peut jamais nuire à celui qui la pratique.",
    contexteUsage:
      "Utilisé pour encourager les actes de bonté ou pour rassurer quelqu'un qui hésite à aider par peur des conséquences.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Alesi ame dea nu la, ale nɛ akpɔ",
    traductionLitterale:
      "Comme on traite les autres, c'est ainsi qu'on sera traité.",
    explication:
      "La loi de la réciprocité. Les relations humaines fonctionnent en miroir : le respect engendre le respect, le mépris engendre le mépris.",
    contexteUsage:
      "Utilisé pour enseigner le respect d'autrui ou pour expliquer les conséquences du comportement de quelqu'un.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Nuɖuɖu vɛ le gbe dzi",
    traductionLitterale: "La nourriture est précieuse dans le monde.",
    explication:
      "La nourriture est un don sacré qui ne doit jamais être gaspillé. Ce proverbe enseigne la gratitude pour chaque repas et le respect de ceux qui produisent la nourriture.",
    contexteUsage:
      "Utilisé pour enseigner la gratitude pour la nourriture ou pour critiquer le gaspillage alimentaire.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ame si le vivim la nyea asi",
    traductionLitterale: "Celui qui cherche trouvera.",
    explication:
      "La persévérance dans la quête est récompensée. Ce proverbe encourage à ne jamais abandonner sa recherche, qu'elle soit matérielle, intellectuelle ou spirituelle.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un dans sa recherche ou pour consoler celui qui n'a pas encore trouvé.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Fia mele du me gake fia ƒe ŋusẽ le du me",
    traductionLitterale:
      "Le roi n'est pas dans la ville mais l'autorité du roi y est.",
    explication:
      "Le pouvoir et l'influence dépassent la présence physique. Ce proverbe parle de l'influence, de la réputation et de l'autorité morale qui persistent même en l'absence du leader.",
    contexteUsage:
      "Utilisé pour parler du pouvoir de l'influence ou pour rappeler que l'autorité ne nécessite pas la présence physique.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ame si mele agbe o meɖua nu o",
    traductionLitterale: "Celui qui n'est pas en vie ne mange pas.",
    explication:
      "La vie est le prérequis de tout. Ce proverbe rappelle que tant qu'on est vivant, tout est possible. La vie est le plus grand trésor.",
    contexteUsage:
      "Utilisé pour redonner espoir à quelqu'un qui a tout perdu — tant qu'il est en vie, il peut reconstruire.",
    source: "Tradition orale Éwé — Togo",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * IGBO — Nigeria (20 proverbes)
 * Source : Tradition orale Igbo, Ilu Igbo (proverbes Igbo)
 * ═══════════════════════════════════════════════════════════════════════════ */

const IGBO_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "ibo",
    texteOriginal: "Igwe ka ike",
    traductionLitterale: "Le nombre, c'est la force.",
    explication:
      "Proverbe Igbo fondamental sur l'union. La force d'un peuple réside dans son unité et sa solidarité. Seul, on est faible ; ensemble, on est invincible.",
    contexteUsage:
      "Utilisé dans les rassemblements communautaires pour mobiliser le groupe ou pour encourager la solidarité.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Nwata kụọ aka ya ọ soro ndị okenye eri nri",
    traductionLitterale:
      "Quand l'enfant se lave les mains, il mange avec les anciens.",
    explication:
      "La préparation et l'effort ouvrent les portes du respect. Un jeune qui se prépare correctement et montre de la maturité sera admis dans le cercle des anciens.",
    contexteUsage:
      "Utilisé pour encourager les jeunes à se préparer, à étudier et à se montrer responsables pour gagner le respect des aînés.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Egbe bere ugo bere, nke sị ibe ya ebela, nku kwa ya",
    traductionLitterale:
      "Que le milan se perche, que l'aigle se perche aussi. Celui qui dit que l'autre ne doit pas se percher, que ses ailes se brisent.",
    explication:
      'Proverbe Igbo célèbre prônant le "vivre et laisser vivre". Chacun a le droit de vivre et de prospérer. Souhaiter le malheur des autres se retourne contre soi.',
    contexteUsage:
      "Utilisé pour prêcher la tolérance et la coexistence pacifique, ou pour mettre en garde contre la jalousie.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal:
      "E mee nwata ka ọ kwụsị akwa, ọ ga-akwụsị, mana ihe mere ya, ọ ga-echeta",
    traductionLitterale:
      "On peut dire à un enfant d'arrêter de pleurer, il arrêtera, mais ce qui l'a fait pleurer, il s'en souviendra.",
    explication:
      "Les blessures émotionnelles laissent des traces durables. On peut faire taire la douleur extérieure, mais le souvenir de l'injustice persiste.",
    contexteUsage:
      "Utilisé pour rappeler l'importance de traiter les causes profondes des conflits, pas seulement les symptômes.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Aka nri kwọ aka ekpe, aka ekpe akwọ aka nri",
    traductionLitterale:
      "La main droite lave la gauche, la main gauche lave la droite.",
    explication:
      "L'entraide est mutuelle et réciproque. Ce proverbe enseigne que la coopération est bénéfique pour toutes les parties impliquées.",
    contexteUsage:
      "Utilisé pour encourager la coopération mutuelle ou pour expliquer les bienfaits de l'entraide.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ofu osisi anaghị eme ọhịa",
    traductionLitterale: "Un seul arbre ne fait pas la forêt.",
    explication:
      "Version Igbo du proverbe universel africain sur l'unité. La communauté est faite de multiples individus — chacun est nécessaire, mais aucun n'est suffisant seul.",
    contexteUsage:
      "Utilisé pour encourager le travail d'équipe et rappeler l'importance de chaque membre dans un groupe.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Onye ajụjụ adịghị efu n'ụzọ",
    traductionLitterale:
      "Celui qui pose des questions ne se perd pas en route.",
    explication:
      "Il n'y a pas de honte à demander de l'aide ou des directions. Ce proverbe encourage l'humilité intellectuelle et la curiosité comme guides de vie.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à poser des questions plutôt que de rester dans l'ignorance.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Onye ndidi na-eri azụ ukwu",
    traductionLitterale: "Celui qui est patient mange le gros poisson.",
    explication:
      "La patience mène aux meilleures récompenses. Celui qui sait attendre avec sagesse obtient les meilleurs fruits de la vie.",
    contexteUsage:
      "Utilisé pour encourager la patience, notamment dans les affaires, les relations et les projets à long terme.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Okwu dị ụtọ na-eduga ewu n'ọgba",
    traductionLitterale: "Les paroles douces mènent la chèvre à l'enclos.",
    explication:
      "La diplomatie et la douceur dans la communication sont plus efficaces que la force. Ce proverbe célèbre le pouvoir de la persuasion par la gentillesse.",
    contexteUsage:
      "Utilisé pour enseigner la diplomatie ou pour montrer qu'on obtient plus par la douceur que par la force.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ndụ bụ ije",
    traductionLitterale: "La vie est un voyage.",
    explication:
      "La vie est un parcours, pas une destination. Ce proverbe concis et profond invite à vivre pleinement chaque étape du voyage de la vie.",
    contexteUsage:
      "Utilisé pour encourager la sérénité face aux épreuves ou pour apprécier le chemin parcouru.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Agụụ amaghị eze",
    traductionLitterale: "La faim ne connaît pas le roi.",
    explication:
      "Face aux besoins fondamentaux, tous les êtres humains sont égaux. Ni le pouvoir ni la richesse ne protègent des réalités de base de la condition humaine.",
    contexteUsage:
      "Utilisé pour rappeler l'humilité aux puissants ou pour souligner l'égalité fondamentale de tous les êtres humains.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Oji ezigbo mmadụ ezigbo obi",
    traductionLitterale: "La bonne personne a un bon cœur.",
    explication:
      "La vraie bonté vient du cœur, pas des apparences. Ce proverbe enseigne à juger les gens par leurs intentions et leurs actes sincères, non par leur apparence extérieure.",
    contexteUsage:
      "Utilisé pour louer la bonté authentique de quelqu'un ou pour distinguer la vraie bonté de la fausse.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Nnọọ bụ ụzọ",
    traductionLitterale: "L'accueil est un chemin.",
    explication:
      "L'hospitalité ouvre des portes et crée des liens. Ce proverbe affirme que bien accueillir quelqu'un est le début d'une relation fructueuse.",
    contexteUsage:
      "Utilisé pour souligner l'importance de l'hospitalité ou pour encourager un accueil chaleureux.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ewu nwere aja, ma ọ mechaa, ọ ga-agba ọsọ",
    traductionLitterale:
      "La chèvre a la gale, mais quand elle guérira, elle courra.",
    explication:
      "Même dans la maladie et l'adversité, il y a l'espoir de la guérison. Ce proverbe encourage à ne pas se laisser définir par ses difficultés actuelles.",
    contexteUsage:
      "Utilisé pour redonner espoir à quelqu'un qui traverse une épreuve de santé ou de vie.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ihe dị mma na-enwe isi",
    traductionLitterale: "Les bonnes choses ont un commencement.",
    explication:
      "Toute réalisation commence quelque part. Ce proverbe encourage à commencer, même modestement, car c'est le début qui mène aux grandes choses.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à se lancer dans un projet ou pour valoriser les débuts modestes.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ihe ehi hụrụ gbalaa ọsọ, ọ bụrụ na ewu hụkwa ya, ọ nwụrụ",
    traductionLitterale:
      "Ce que la vache a vu et a fui, si la chèvre le voyait, elle mourrait.",
    explication:
      "Chacun a ses limites et ses capacités. Ce qui est supportable pour un être plus fort peut être fatal pour un plus faible. Ce proverbe enseigne la mesure et la prudence.",
    contexteUsage:
      "Utilisé pour mettre en garde contre la comparaison avec les autres ou pour expliquer pourquoi une situation est plus grave qu'elle ne paraît.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Otu nwata na-emetụ ndị okenye aka n'imi",
    traductionLitterale:
      "C'est petit à petit que l'enfant touche le nez des aînés.",
    explication:
      "Si on tolère de petites transgressions, elles grandissent progressivement. Ce proverbe met en garde contre le laxisme et la négligence des petites fautes.",
    contexteUsage:
      "Utilisé pour avertir de la nécessité de corriger les comportements irrespectueux dès le début.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Otu onye tuo, ọ daa mba",
    traductionLitterale: "Ce qu'une personne crache tombe au lointain.",
    explication:
      "Les paroles ont une portée au-delà de ce qu'on imagine. Un mot dit peut voyager loin et avoir des conséquences inattendues. Ce proverbe invite à la prudence dans le discours.",
    contexteUsage:
      "Utilisé pour mettre en garde contre les paroles irréfléchies ou pour souligner l'impact de la parole.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Anụ e lee n'ọkụ abụghị nke e lee na mmiri",
    traductionLitterale:
      "La viande cuite au feu n'est pas celle cuite dans l'eau.",
    explication:
      "Chaque méthode produit un résultat différent. Ce proverbe enseigne que les approches comptent autant que les objectifs — la manière de faire change le résultat.",
    contexteUsage:
      "Utilisé pour défendre une méthode particulière ou pour montrer que le processus influence le résultat final.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Ọ bụrụ na chi gị ekwuo, mmadụ ekwughị",
    traductionLitterale: "Si ton Dieu/destin parle, les gens ne parleront pas.",
    explication:
      "Quand le destin ou la volonté divine est en ta faveur, les obstacles humains deviennent insignifiants. Ce proverbe encourage la confiance en sa destinée.",
    contexteUsage:
      "Utilisé pour redonner confiance à quelqu'un qui fait face à l'opposition ou pour exprimer la certitude que le destin triomphera.",
    source: "Tradition orale Igbo — Nigeria (Ilu Igbo)",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * HAUSA — Nigeria / Niger (15 proverbes)
 * Source : Karin Magana (proverbes Hausa), tradition orale Nigeria/Niger
 * ═══════════════════════════════════════════════════════════════════════════ */

const HAUSA_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "hau",
    texteOriginal: "Haƙuri maganin duniya",
    traductionLitterale: "La patience est le remède du monde.",
    explication:
      "Proverbe Hausa fondamental. La patience est considérée comme la solution universelle à tous les problèmes de la vie. Elle est la base de la sagesse et de la résolution des conflits.",
    contexteUsage:
      "Utilisé dans presque toutes les situations difficiles pour encourager la patience et la persévérance.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Gaskiya ta fi kwabo",
    traductionLitterale: "La vérité vaut mieux qu'un kwabo (centime).",
    explication:
      "La vérité est plus précieuse que toute richesse matérielle. Ce proverbe place l'honnêteté au-dessus de l'argent et encourage l'intégrité dans toutes les transactions.",
    contexteUsage:
      "Utilisé pour encourager l'honnêteté dans les affaires ou pour valoriser la vérité face à la corruption.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Hannun dàya bà ya ɗauki jinkà",
    traductionLitterale: "Une seule main ne peut pas soulever un fardeau.",
    explication:
      "Version Hausa du proverbe universel sur la coopération. Les grandes tâches nécessitent l'effort collectif. Ce proverbe est un appel à la solidarité et à l'entraide.",
    contexteUsage:
      "Utilisé pour mobiliser un groupe à l'action ou pour demander de l'aide dans une tâche difficile.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Komai nisan dare, gari zai waye",
    traductionLitterale:
      "Même si la nuit est longue, le jour finira par se lever.",
    explication:
      "Message d'espoir universel. Aussi longue et sombre que soit une épreuve, elle finira par passer. Le jour (la délivrance) viendra inévitablement.",
    contexteUsage:
      "Utilisé pour redonner espoir dans les périodes sombres ou pour encourager la persévérance face à l'adversité.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Ruwa ya ƙare, kifin ya fito",
    traductionLitterale: "L'eau a séché et le poisson est apparu.",
    explication:
      "Quand les protections disparaissent, la vérité se révèle. Ce proverbe parle de la transparence qui apparaît quand les circonstances changent — la vérité finit toujours par émerger.",
    contexteUsage:
      "Utilisé pour commenter une situation où la vérité a éclaté après une période de dissimulation.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Mai haƙuri ya kan gari",
    traductionLitterale: "Le patient arrive à destination.",
    explication:
      "La persévérance patiente mène au succès. Ce proverbe affirme que celui qui sait attendre et persévérer finit toujours par atteindre son objectif.",
    contexteUsage:
      "Utilisé pour encourager la persévérance dans un projet à long terme ou pour féliciter quelqu'un qui a atteint son but grâce à sa patience.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Ilimi gishirin zaman duniya",
    traductionLitterale: "Le savoir est le sel de la vie dans le monde.",
    explication:
      "Le savoir est l'ingrédient essentiel qui donne du goût et du sens à la vie. Sans éducation, la vie est insipide. Ce proverbe encourage l'apprentissage continu.",
    contexteUsage:
      "Utilisé pour valoriser l'éducation et la recherche du savoir à tout âge.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Kowa ya tashi ya tsaya, ba ya can ba",
    traductionLitterale:
      "Celui qui se lève et se tient debout n'est pas tombé.",
    explication:
      "La résilience définit une personne plus que ses chutes. Ce proverbe célèbre la capacité à se relever et à tenir bon face aux épreuves.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un après un échec ou pour célébrer la résilience.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Zama lafiya ya fi zama cikin arziƙi",
    traductionLitterale: "Vivre en paix vaut mieux que vivre dans la richesse.",
    explication:
      "La paix intérieure et la tranquillité sont plus précieuses que la richesse matérielle. Ce proverbe replace les priorités de la vie dans le bon ordre.",
    contexteUsage:
      "Utilisé pour consoler quelqu'un qui n'est pas riche mais qui vit en paix, ou pour critiquer la course effrénée à l'argent.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Goro ɗaya bai cika baki ba",
    traductionLitterale: "Une seule noix de cola ne remplit pas la bouche.",
    explication:
      "Le minimum ne suffit pas pour satisfaire les besoins. Ce proverbe parle de la nécessité de l'abondance et du partage, tout en rappelant les limites des ressources insuffisantes.",
    contexteUsage:
      "Utilisé pour expliquer une situation de pénurie ou pour justifier la demande de plus de ressources.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Rigakafi ya fi magani",
    traductionLitterale: "La prévention vaut mieux que le remède.",
    explication:
      "Il est plus sage de prévenir un problème que de le guérir. Ce proverbe encourage la prudence, la planification et l'anticipation des difficultés.",
    contexteUsage:
      "Utilisé pour encourager les mesures préventives dans tous les domaines de la vie — santé, finances, relations.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Magana jari ce",
    traductionLitterale: "La parole est un héritage.",
    explication:
      "Les mots que nous prononçons nous survivent. Ce proverbe enseigne le poids de la parole et la responsabilité de ce qu'on dit — nos paroles sont notre héritage.",
    contexteUsage:
      "Utilisé pour rappeler l'importance de peser ses mots ou pour souligner qu'une promesse est sacrée.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Ba a fada dare ba, sai dare ya wuce",
    traductionLitterale:
      "On ne discute pas avec la nuit, on attend qu'elle passe.",
    explication:
      "Face aux situations incontrôlables, la sagesse est dans l'acceptation et la patience. On ne peut pas changer certaines réalités — il faut les traverser.",
    contexteUsage:
      "Utilisé pour encourager l'acceptation face à une situation temporaire mais inévitable.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Ruwanka ya fi gishirinka",
    traductionLitterale: "Ton eau vaut mieux que ton sel.",
    explication:
      "Ce qui te semble ordinaire est précieux. Ce proverbe invite à valoriser ce qu'on a plutôt que de convoiter ce qu'on n'a pas. L'eau, simple mais vitale, surpasse le sel, rare mais non vital.",
    contexteUsage:
      "Utilisé pour encourager la gratitude pour ce qu'on possède ou pour critiquer ceux qui négligent l'essentiel au profit du superflu.",
    source: "Karin Magana — Tradition orale Hausa",
  },
  {
    langueCode: "hau",
    texteOriginal: "Abokin banza ya fi banza",
    traductionLitterale: "Un ami inutile est pire que rien.",
    explication:
      "Mieux vaut être seul que mal accompagné. Ce proverbe enseigne l'importance de la qualité des relations sociales. Un mauvais ami est plus nuisible que l'absence d'ami.",
    contexteUsage:
      "Utilisé pour conseiller le choix des amis ou pour justifier la rupture d'une relation toxique.",
    source: "Karin Magana — Tradition orale Hausa",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * LINGALA — RD Congo (5 proverbes)
 * Source : Tradition orale Lingala, patrimoine congolais
 * ═══════════════════════════════════════════════════════════════════════════ */

const LINGALA_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "lin",
    texteOriginal: "Moto oyo atɛlɛmi na makolo na ye moko, akokwea",
    traductionLitterale: "Celui qui se tient sur un seul pied tombera.",
    explication:
      "L'équilibre dans la vie nécessite de s'appuyer sur plusieurs points de soutien. Ce proverbe enseigne que dépendre d'une seule chose — un seul talent, un seul ami, une seule source de revenus — est dangereux.",
    contexteUsage:
      "Utilisé pour encourager la diversification et l'équilibre dans la vie.",
    source: "Tradition orale Lingala — RD Congo",
  },
  {
    langueCode: "lin",
    texteOriginal: "Nzete moko esalaka zamba te",
    traductionLitterale: "Un seul arbre ne fait pas la forêt.",
    explication:
      "Version Lingala du proverbe panafricain sur l'union. La communauté et la solidarité sont les fondements de la société congolaise.",
    contexteUsage:
      "Utilisé pour encourager l'unité communautaire et la coopération.",
    source: "Tradition orale Lingala — RD Congo",
  },
  {
    langueCode: "lin",
    texteOriginal: "Mosala ezali nkisi ya bobola",
    traductionLitterale: "Le travail est le remède contre la pauvreté.",
    explication:
      "Seul le travail libère de la misère. Ce proverbe Lingala célèbre la valeur du travail comme unique voie vers la prospérité.",
    contexteUsage:
      "Utilisé pour encourager le travail et motiver ceux qui cherchent à améliorer leur condition.",
    source: "Tradition orale Lingala — RD Congo",
  },
  {
    langueCode: "lin",
    texteOriginal: "Moto na moto, nyama na nyama",
    traductionLitterale:
      "L'homme est pour l'homme, l'animal est pour l'animal.",
    explication:
      "Les êtres humains doivent se soutenir mutuellement. Ce proverbe distingue l'humanité de l'animalité par la solidarité et l'entraide qui caractérisent les relations humaines.",
    contexteUsage:
      "Utilisé pour encourager la solidarité entre humains et pour critiquer le comportement égoïste.",
    source: "Tradition orale Lingala — RD Congo",
  },
  {
    langueCode: "lin",
    texteOriginal: "Loboko moko ekangaka nsinga te",
    traductionLitterale: "Une seule main n'attache pas la corde.",
    explication:
      "Version Lingala du proverbe sur l'entraide nécessaire. Certaines tâches sont impossibles à accomplir seul — la coopération est indispensable.",
    contexteUsage:
      "Utilisé pour demander de l'aide ou pour motiver un groupe à travailler ensemble.",
    source: "Tradition orale Lingala — RD Congo",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * AKAN / TWI — Ghana (5 proverbes)
 * Source : Tradition orale Akan, patrimoine Ghanéen
 * ═══════════════════════════════════════════════════════════════════════════ */

const AKAN_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "aka",
    texteOriginal: "Obi nkyerɛ abɔfra Nyame",
    traductionLitterale: "Personne n'enseigne Dieu à l'enfant.",
    explication:
      "La connaissance du divin est innée. Ce proverbe Akan affirme que chaque enfant naît avec une connexion naturelle à Dieu. La spiritualité est instinctive, pas seulement enseignée.",
    contexteUsage:
      "Utilisé pour parler de la spiritualité naturelle ou pour affirmer que certaines vérités sont universellement comprises.",
    source: "Tradition orale Akan — Ghana",
  },
  {
    langueCode: "aka",
    texteOriginal: "Tikoro nko agyina",
    traductionLitterale: "Une seule tête ne forme pas un conseil.",
    explication:
      "La sagesse collective surpasse l'intelligence individuelle. Ce proverbe Akan est un argument fondamental pour la démocratie et la consultation dans la prise de décision.",
    contexteUsage:
      "Utilisé dans les assemblées traditionnelles pour justifier la prise de décision collective.",
    source: "Tradition orale Akan — Ghana",
  },
  {
    langueCode: "aka",
    texteOriginal: "Obra yɛ ahyia",
    traductionLitterale: "La vie est une rencontre.",
    explication:
      "La vie est faite de rencontres qui nous façonnent. Ce proverbe enseigne que chaque personne croisée a quelque chose à nous apporter. Il encourage l'ouverture aux autres.",
    contexteUsage:
      "Utilisé pour valoriser les rencontres et les relations humaines.",
    source: "Tradition orale Akan — Ghana",
  },
  {
    langueCode: "aka",
    texteOriginal: "Sɛ wo werɛ fi na wosan fa a, na ɛnyɛ basabasa",
    traductionLitterale:
      "Si tu oublies et t'en souviens à nouveau, ce n'est pas de la folie.",
    explication:
      "Il n'est jamais trop tard pour rectifier une erreur ou reprendre un chemin abandonné. Ce proverbe encourage le recommencement et le pardon de soi.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à reprendre un projet abandonné ou à corriger une erreur passée.",
    source: "Tradition orale Akan — Ghana",
  },
  {
    langueCode: "aka",
    texteOriginal: "Nyansa biribi wɔ fie a, ɛhia obi nkyerɛ",
    traductionLitterale:
      "Si la sagesse est dans une maison, tout le monde viendra la chercher.",
    explication:
      "La vraie sagesse attire naturellement les gens. Ce proverbe enseigne que celui qui cultive la sagesse n'a pas besoin de la proclamer — les gens viendront d'eux-mêmes.",
    contexteUsage:
      "Utilisé pour valoriser la sagesse authentique ou pour encourager le développement personnel.",
    source: "Tradition orale Akan — Ghana",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * MOORÉ — Burkina Faso (5 proverbes)
 * Source : Tradition orale Mossi, patrimoine Burkinabè
 * ═══════════════════════════════════════════════════════════════════════════ */

const MOORE_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "mos",
    texteOriginal: "Ned a yembr pa tõnd ye",
    traductionLitterale: "On ne peut pas voir son propre dos.",
    explication:
      "Personne ne peut tout voir de soi-même — on a besoin des autres pour connaître ses défauts et ses angles morts. Ce proverbe Mossi prône l'humilité et l'écoute des critiques.",
    contexteUsage:
      "Utilisé pour encourager l'acceptation des critiques constructives et la conscience de ses propres limites.",
    source: "Tradition orale Mossi — Burkina Faso",
  },
  {
    langueCode: "mos",
    texteOriginal: "Rũm-yend pa yit biig ye",
    traductionLitterale: "Un seul doigt ne peut pas attraper un pou.",
    explication:
      "Les petites tâches même requièrent de la coopération. Ce proverbe Mossi utilise une image du quotidien pour enseigner que l'entraide est nécessaire dans toutes les situations.",
    contexteUsage:
      "Utilisé pour demander de l'aide ou pour justifier le travail d'équipe même pour de petites tâches.",
    source: "Tradition orale Mossi — Burkina Faso",
  },
  {
    langueCode: "mos",
    texteOriginal: "Sabr bala m sẽn yaa sõama",
    traductionLitterale: "La mère de la patience est celle qui est bonne.",
    explication:
      "La patience est la mère de toute bonne chose. Ce proverbe Mossi place la patience comme la vertu fondamentale d'où découlent toutes les autres qualités.",
    contexteUsage:
      "Utilisé comme conseil de patience dans toute situation ou comme bénédiction pour le futur.",
    source: "Tradition orale Mossi — Burkina Faso",
  },
  {
    langueCode: "mos",
    texteOriginal: "Ned sẽn pa mi a yir ye, a pa tõe n mi a taab ye",
    traductionLitterale:
      "Celui qui ne connaît pas sa propre maison ne peut pas connaître celle des autres.",
    explication:
      "La connaissance de soi précède la connaissance du monde. Ce proverbe enseigne qu'il faut d'abord comprendre ses propres racines et sa culture avant de chercher à comprendre les autres.",
    contexteUsage:
      "Utilisé pour encourager la connaissance de soi et de ses origines comme fondement de la sagesse.",
    source: "Tradition orale Mossi — Burkina Faso",
  },
  {
    langueCode: "mos",
    texteOriginal: "Tẽng-n-biig n mi tẽngã",
    traductionLitterale: "C'est l'enfant du terroir qui connaît le terroir.",
    explication:
      "L'expertise locale est irremplaçable. Ce proverbe Mossi valorise la connaissance intime d'un lieu par ceux qui y sont nés et y ont grandi.",
    contexteUsage:
      "Utilisé pour donner de la valeur à l'expertise locale ou pour justifier la consultation des habitants d'un lieu.",
    source: "Tradition orale Mossi — Burkina Faso",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * GOUN — Bénin (5 proverbes)
 * Source : Tradition orale Goun, patrimoine Béninois (Porto-Novo)
 * ═══════════════════════════════════════════════════════════════════════════ */

const GOUN_ADAGES: AdageSeedItem[] = [
  {
    langueCode: "guw",
    texteOriginal: "Alɔ ɖokpo ma sixu xwlé nǔ",
    traductionLitterale: "Une seule main ne peut pas nouer un paquet.",
    explication:
      "Le Goun, langue sœur du Fon, partage cette sagesse fondamentale sur la coopération. Nul ne peut tout accomplir seul — l'entraide est une nécessité, pas un choix.",
    contexteUsage:
      "Utilisé dans la vie quotidienne à Porto-Novo et ses environs pour encourager la coopération.",
    source: "Tradition orale Goun — Bénin (Porto-Novo)",
  },
  {
    langueCode: "guw",
    texteOriginal: "Mɛ e nɔ dó gǎn ɔ, ɖagbe nɔ wá n'i",
    traductionLitterale: "Celui qui fait l'effort, le bien vient à lui.",
    explication:
      "L'effort et le travail sont toujours récompensés. Ce proverbe Goun encourage la persévérance et l'engagement dans le travail comme voie vers le succès.",
    contexteUsage:
      "Utilisé pour motiver au travail, surtout les jeunes qui doutent de l'utilité de l'effort.",
    source: "Tradition orale Goun — Bénin (Porto-Novo)",
  },
  {
    langueCode: "guw",
    texteOriginal: "Ayǐ nɔ ɖɔ nǔ nú mɛ e ɖó tó",
    traductionLitterale: "La terre parle à celui qui a des oreilles.",
    explication:
      "La nature enseigne à ceux qui savent écouter. Ce proverbe Goun valorise l'écoute attentive de l'environnement et de la sagesse ancestrale inscrite dans la terre.",
    contexteUsage:
      "Utilisé pour encourager l'écoute attentive ou pour souligner l'importance de la connexion avec la nature.",
    source: "Tradition orale Goun — Bénin (Porto-Novo)",
  },
  {
    langueCode: "guw",
    texteOriginal: "Nǔ e mɛ ɖé dó ɔ wɛ é nɔ ya",
    traductionLitterale: "Ce que l'on sème, c'est ce que l'on récolte.",
    explication:
      "La loi de causalité est au cœur de la sagesse Goun. Les actions ont des conséquences directes — il faut semer le bien pour récolter le bien.",
    contexteUsage:
      "Utilisé comme enseignement moral ou pour expliquer les conséquences des choix de quelqu'un.",
    source: "Tradition orale Goun — Bénin (Porto-Novo)",
  },
  {
    langueCode: "guw",
    texteOriginal: "Gbɛtɔ́ sín kú nɔ ɖò ayi mɛ tɔn mɛ",
    traductionLitterale: "La mort de l'homme est dans sa propre pensée.",
    explication:
      "Ce proverbe profond enseigne que c'est notre propre mentalité qui peut nous détruire. Les pensées négatives, la peur et le découragement sont les vrais ennemis.",
    contexteUsage:
      "Utilisé pour encourager une pensée positive ou pour mettre en garde contre les pensées autodestructrices.",
    source: "Tradition orale Goun — Bénin (Porto-Novo)",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * EXPORT — Tous les proverbes combinés
 * ═══════════════════════════════════════════════════════════════════════════ */

export const ALL_ADAGES_SEED: AdageSeedItem[] = [
  ...FON_ADAGES,
  ...YORUBA_ADAGES,
  ...BAMBARA_ADAGES,
  ...WOLOF_ADAGES,
  ...EWE_ADAGES,
  ...IGBO_ADAGES,
  ...HAUSA_ADAGES,
  ...LINGALA_ADAGES,
  ...AKAN_ADAGES,
  ...MOORE_ADAGES,
  ...GOUN_ADAGES,
];

/* ── Statistiques ─────────────────────────────────────────────────────── */

export const SEED_STATS = {
  fon: FON_ADAGES.length,
  yoruba: YORUBA_ADAGES.length,
  bambara: BAMBARA_ADAGES.length,
  wolof: WOLOF_ADAGES.length,
  ewe: EWE_ADAGES.length,
  igbo: IGBO_ADAGES.length,
  hausa: HAUSA_ADAGES.length,
  lingala: LINGALA_ADAGES.length,
  akan: AKAN_ADAGES.length,
  moore: MOORE_ADAGES.length,
  goun: GOUN_ADAGES.length,
  total: 0 as number,
};

SEED_STATS.total = ALL_ADAGES_SEED.length;
