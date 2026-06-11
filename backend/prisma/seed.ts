import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fixture from "../data/fixture.json";
import teams from "../data/teams.json";
import { importFixture } from "../src/fixture/fixture-importer";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@prode.local";
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { isAdmin: true },
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      isAdmin: true
    }
  });

  for (const team of teams) {
    await prisma.team.upsert({
      where: { code: team.code },
      update: team,
      create: team
    });
  }

  const summary = await importFixture(prisma, fixture);
  console.log(`Fixture import: ${summary.created} created, ${summary.updated} updated, ${summary.skipped} skipped`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
