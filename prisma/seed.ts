import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const officerPassword = await bcrypt.hash('test1234', 10);
  const memberPassword = await bcrypt.hash('memberpass', 10);

  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: officerPassword,
      role: 'officer',
    },
  });

  await prisma.user.upsert({
    where: { email: 'member@example.com' },
    update: {},
    create: {
      email: 'member@example.com',
      password: memberPassword,
      role: 'member',
    },
  });

  console.log('✅ Test users created:');
  console.log('   Officer: test@example.com / test1234');
  console.log('   Member:  member@example.com / memberpass');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
