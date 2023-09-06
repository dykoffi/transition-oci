import { PrismaClient, TypeFichier } from '@prisma/client';

const prisma = new PrismaClient();

async function AlertingSeeder() {
  const FOLDER_BUCKET = [
    'BASE_SITES',
    'OPEX_OCI',
    'OPEX_ESCO',
    'OPEX_IHS',
    'CA_SITES',
    'PARC_SITES',
    'ACTION_COM',
    'ACTION_TECH',
    'CONGESTION',
    'ANNEXE_OPEX_ESCO',
  ];

  const alert = FOLDER_BUCKET.map(async (value: TypeFichier) => {
    return await prisma.alerting.upsert({
      where: { typeFichier: value },
      update: {},
      create: {
        typeFichier: value,
        email: [],
        telephone: [],
      },
    });
  });

  return alert;
}



async function ParemetreSeeder() {
  const paremetre = [
    {
      label: 'Maintenance Eqt Actifs',
      code: 'maintenance',
      type: 'finance',
      value: '10,0',
    },

    {
      label: 'INTERCOS',
      code: 'intercos',
      type: 'finance',
      value: '13,9',
    },
    {
      label: 'Impôts & Taxes',
      code: 'impot_taxe',
      type: 'finance',
      value: '11,6',
    },
    {
      label: 'Frais de distribution',
      code: 'frais_distribution',
      type: 'finance',
      value: '9,4',
    },
    {
      label: 'Taux de commission / Partenaire',
      code: 'taux_commission_partenaire',
      type: 'finance',
      value: '9',
    },
    {
      label: 'Seuil de rentabilté',
      code: 'seuil_rentabilite',
      type: 'finance',
      value: '80',
    },
    {
      label: 'Marge CA',
      code: 'marge_ca',
      type: 'finance',
      value: '0 10 20 30 50 60 70 80 90 100',
    },

    {
      label: 'Marge OPEX',
      code: 'marge_opex',
      type: 'finance',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'CSSR',
      code: 'cssr',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'CSR',
      code: 'csr',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'NUR',
      code: 'nur',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'Traffic',
      code: 'traffic',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'Taux d`indisponibilité',
      code: 'taux_indis',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
    {
      label: 'Congestion',
      code: 'congestion',
      type: 'technique',
      value: '0 10 20 30 50 60 70 80 90 100',
    },
  ];

  const opex_data = paremetre.map(async (value) => {
    return await prisma.parametre.upsert({
      where: { code: value.code },
      update: {},
      create: {
        label: value.label,
        code: value.code,
        value: value.value,
        type: value.type,
      },
    });
  });

  return opex_data;
}

async function main() {
  await ParemetreSeeder();
  await AlertingSeeder();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
