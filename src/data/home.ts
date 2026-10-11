/**
 * Content for the docs home page (`src/components/DocsHome.astro`), in English and French.
 *
 * The home page is a navigation hub. Every card links to a page in both languages. The build fails
 * on a broken link. Paths are site-relative, with no locale prefix and no leading slash. The French
 * page adds `fr/` itself. A path starting with `/` is used as written, for a page in one language
 * only.
 *
 * Spotlight cards name a tutorial by slug. Their title and description come from the tutorial's own
 * page. Their date comes from `tutorialPublishedOn` in `tutorials.ts`. Nothing is copied here. The
 * artwork comes from the capability cards in the zcp-media repository.
 */

export type Localized = { en: string; fr: string };

export interface HomeLink {
  title: Localized;
  desc: Localized;
  path: string;
  /** SVG path data for a 24px outline icon. */
  icon?: string;
}

export interface HomePlatform {
  label: Localized;
  title: Localized;
  desc: Localized;
  cta: Localized;
  path: string;
}

export interface HomeSpotlight {
  /** Tutorial slug under `tutorials/`. */
  slug: string;
  tag: Localized;
  image: string;
}

export interface HomeTool {
  glyph: string;
  title: Localized;
  desc: Localized;
  /** Omit for Ask Docs, which opens the dialog instead of a page. */
  path?: string;
}

export const homePlatforms: HomePlatform[] = [
  {
    label: { en: 'ZCP · Public Cloud', fr: 'ZCP · Nuage public' },
    title: { en: 'ZSoftly Public Cloud', fr: 'ZSoftly Public Cloud' },
    desc: {
      en: 'Run virtual machines, Kubernetes, networks and storage in Montréal (YUL-1) and Ottawa (YOW-1).',
      fr: 'Exécutez des machines virtuelles, Kubernetes, des réseaux et du stockage à Montréal (YUL-1) et à Ottawa (YOW-1).',
    },
    cta: { en: 'Public Cloud docs', fr: 'Documentation du nuage public' },
    path: 'public-cloud/getting-started/introduction/',
  },
  {
    label: { en: 'ZPCP · Private Cloud', fr: 'ZPCP · Nuage privé' },
    title: { en: 'ZSoftly Private Cloud', fr: 'ZSoftly Private Cloud' },
    desc: {
      en: 'Operate a dedicated cloud on your own hardware or on hardware we host for you.',
      fr: 'Exploitez un nuage dédié sur votre propre matériel ou sur du matériel que nous hébergeons pour vous.',
    },
    cta: { en: 'Private Cloud docs', fr: 'Documentation du nuage privé' },
    path: 'private-cloud/overview/',
  },
  {
    label: { en: 'Cloud Storage', fr: 'Stockage infonuagique' },
    title: { en: 'ZSoftly Cloud Storage', fr: 'ZSoftly Cloud Storage' },
    desc: {
      en: 'Dedicated single-tenant clusters for object, block and file storage, with root access.',
      fr: 'Grappes dédiées à locataire unique pour le stockage objet, bloc et fichier, avec accès racine.',
    },
    cta: { en: 'Cloud Storage docs', fr: 'Documentation du stockage infonuagique' },
    path: 'cloud-storage/overview/',
  },
];

export const homeGetStarted: HomeLink[] = [
  {
    title: { en: 'Deploy your first VM', fr: 'Déployer votre première VM' },
    desc: {
      en: 'Create a server and connect to it over SSH.',
      fr: 'Créez un serveur et connectez-vous en SSH.',
    },
    path: 'public-cloud/getting-started/quickstart/',
    icon: 'M5 12h14M13 6l6 6-6 6',
  },
  {
    title: { en: 'Install the ZCP CLI', fr: 'Installer le CLI ZCP' },
    desc: {
      en: 'Manage resources from your terminal, with JSON or YAML output.',
      fr: 'Gérez vos ressources depuis le terminal, avec une sortie JSON ou YAML.',
    },
    path: 'public-cloud/cli/installation/',
    icon: 'M4 17l6-5-6-5M12 19h8',
  },
  {
    title: { en: 'Set up a private network', fr: 'Configurer un réseau privé' },
    desc: {
      en: 'Create a VPC, tiers and firewall rules for your workloads.',
      fr: 'Créez un VPC, des niveaux et des règles de pare-feu pour vos charges de travail.',
    },
    path: 'public-cloud/networking/vpc/create-vpc/',
    icon: 'M12 5v4M5 19v-4h14v4M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    title: { en: 'Understand billing', fr: 'Comprendre la facturation' },
    desc: {
      en: 'See how we bill compute, storage and IP addresses, and how credits apply.',
      fr: 'Voyez comment nous facturons le calcul, le stockage et les adresses IP, et comment les crédits s’appliquent.',
    },
    path: 'public-cloud/billing/',
    icon: 'M4 7h16v10H4zM4 11h16',
  },
];

export const homeSpotlight: HomeSpotlight[] = [
  {
    slug: 'backup-vaultwarden-restic-object-storage',
    tag: { en: 'New tutorial', fr: 'Nouveau tutoriel' },
    image: '/images/home/security-identity.svg',
  },
  {
    slug: 'deploy-vps-dokploy-cli',
    tag: { en: 'Popular tutorial', fr: 'Tutoriel populaire' },
    image: '/images/home/devops-cicd-automation.svg',
  },
];

export const homeProducts: HomeLink[] = [
  {
    title: { en: 'Compute', fr: 'Calcul' },
    desc: { en: 'Virtual machines and plans', fr: 'Machines virtuelles et forfaits' },
    path: 'public-cloud/compute/',
    icon: 'M4 4h16v6H4zM4 14h16v6H4z',
  },
  {
    title: { en: 'Kubernetes', fr: 'Kubernetes' },
    desc: { en: 'Managed clusters and kubectl', fr: 'Grappes gérées et kubectl' },
    path: 'public-cloud/kubernetes/',
    icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z',
  },
  {
    title: { en: 'Block storage', fr: 'Stockage bloc' },
    desc: { en: 'Volumes, root disks and tiers', fr: 'Volumes, disques racine et niveaux' },
    path: 'public-cloud/storage/block-storage/create-volume/',
    icon: 'M4 6c0-1.5 3.6-3 8-3s8 1.5 8 3v12c0 1.5-3.6 3-8 3s-8-1.5-8-3zM4 12c0 1.5 3.6 3 8 3s8-1.5 8-3',
  },
  {
    title: { en: 'Object storage', fr: 'Stockage objet' },
    desc: { en: 'S3-compatible buckets and keys', fr: 'Compartiments et clés compatibles S3' },
    path: 'public-cloud/storage/object-storage/create-bucket/',
    icon: 'M3 7l9-4 9 4-9 4zM3 12l9 4 9-4M3 17l9 4 9-4',
  },
  {
    title: { en: 'Networking and VPC', fr: 'Réseau et VPC' },
    desc: { en: 'Networks, IP addresses and firewall', fr: 'Réseaux, adresses IP et pare-feu' },
    path: 'public-cloud/networking/',
    icon: 'M12 3v6M5 21v-5h14v5M12 9v7',
  },
  {
    title: { en: 'Load balancer', fr: 'Répartiteur de charge' },
    desc: {
      en: 'Distribute traffic across servers',
      fr: 'Répartir le trafic entre plusieurs serveurs',
    },
    path: 'public-cloud/load-balancer/',
    icon: 'M12 4v6M6 20v-4l6-6 6 6v4',
  },
  {
    title: { en: 'DNS', fr: 'DNS' },
    desc: { en: 'Zones and records', fr: 'Zones et enregistrements' },
    path: 'public-cloud/dns/overview/',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18',
  },
  {
    title: { en: 'Backups and snapshots', fr: 'Sauvegardes et instantanés' },
    desc: { en: 'Protect VMs and volumes', fr: 'Protéger les VM et les volumes' },
    path: 'public-cloud/backups-snapshots/backups/',
    icon: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4',
  },
  {
    title: { en: 'Auto scaling', fr: 'Mise à l’échelle automatique' },
    desc: { en: 'Grow and shrink with demand', fr: 'Ajuster la capacité selon la demande' },
    path: 'public-cloud/auto-scaling/',
    icon: 'M4 18l6-6 4 4 6-8',
  },
  {
    title: { en: 'IAM and projects', fr: 'IAM et projets' },
    desc: { en: 'Users, roles and projects', fr: 'Utilisateurs, rôles et projets' },
    path: 'public-cloud/iam/overview/',
    icon: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  },
  {
    title: { en: 'Marketplace', fr: 'Marketplace' },
    desc: { en: 'Preconfigured VM images', fr: 'Images de VM préconfigurées' },
    path: 'public-cloud/marketplace/',
    icon: 'M4 7h16l-1.5 12h-13zM9 7a3 3 0 0 1 6 0',
  },
  {
    title: { en: 'Billing', fr: 'Facturation' },
    desc: { en: 'Pricing, invoices and credits', fr: 'Tarifs, factures et crédits' },
    path: 'public-cloud/billing/',
    icon: 'M4 7h16v10H4zM4 11h16',
  },
];

export const homeTools: HomeTool[] = [
  {
    glyph: '>_',
    title: { en: 'ZCP CLI', fr: 'CLI ZCP' },
    desc: {
      en: 'Manage your cloud from the terminal.',
      fr: 'Gérez votre nuage depuis le terminal.',
    },
    path: 'public-cloud/cli/quickstart/',
  },
  {
    glyph: 'TF',
    title: { en: 'Terraform / OpenTofu provider', fr: 'Fournisseur Terraform / OpenTofu' },
    desc: {
      en: 'zsoftly/zcp on the Terraform and OpenTofu registries.',
      fr: 'zsoftly/zcp dans les registres Terraform et OpenTofu.',
    },
    // English only for now, so the French page links to the English tutorial.
    path: '/tutorials/manage-infrastructure-terraform/',
  },
  {
    glyph: '{ }',
    title: { en: 'REST API', fr: 'API REST' },
    desc: {
      en: 'Browse the reference in Swagger UI.',
      fr: 'Référence avec Swagger UI interactif.',
    },
    path: 'public-cloud/api/reference/',
  },
  {
    glyph: 'AI',
    title: { en: 'Ask Docs', fr: 'Demander aux docs' },
    desc: {
      en: 'Open a question in ChatGPT, Claude or Cursor.',
      fr: 'Ouvrez une question dans ChatGPT, Claude ou Cursor.',
    },
  },
];

/** Number of release notes shown on the home page, taken from the changelog feed. */
export const HOME_RELEASE_COUNT = 4;
