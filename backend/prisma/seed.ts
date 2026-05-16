import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
console.log('process.env.DATABASE_URL');
console.log(process.env.DATABASE_URL);
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

type User = Awaited<ReturnType<typeof prisma.user.create>>;
type Card = Awaited<ReturnType<typeof prisma.card.create>>;
type Payment = Awaited<ReturnType<typeof prisma.payment.create>>;
type PaymentStatus = 'approved' | 'rejected';

function inrepetibleNumber(): number {
  return new Date().getTime();
}
async function createRandomUsers() {
  const listUsers: User[] = [];
  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: `test-${inrepetibleNumber()}-${i + 1}@example.com`,
        name: `Test User ${i + 1}`,
        numberPhone: `${inrepetibleNumber()}-${i + 1}`,
        password: 'test123',
        roleId: 1,
      },
    });
    listUsers.push(user);
  }
  return listUsers;
}

async function createRandomCards(users: User[]) {
  const listCards: Card[] = [];
  for (const user of users) {
    const card = await prisma.card.create({
      data: {
        userId: user.id,
        cardNumber: `${inrepetibleNumber()}`,
      },
    });
    listCards.push(card);
  }
  return listCards;
}

async function createRandomPayments(users: User[], cards: Card[]) {
  const listPayments: Payment[] = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      const payment = await prisma.payment.create({
        data: {
          userId: users[i].id,
          cardId: cards[i].id,
          amount: randomAmount(),
          status: randomStatus(),
        },
      });
      listPayments.push(payment);
    }
  }
  return listPayments;
}

function randomStatus(): PaymentStatus {
  return Math.random() < 0.8 ? 'approved' : 'rejected';
}
function randomAmount(): number {
  return parseFloat((Math.random() * 1000).toFixed(2));
}

async function main() {
  console.log('Seeding simple...');
  const users = await createRandomUsers();
  console.log(`Created ${users.length} users`);
  const cards = await createRandomCards(users);
  console.log(`Created ${cards.length} cards`);
  const payments = await createRandomPayments(users, cards);
  console.log(`Created ${payments.length} payments`);
  console.log('Finished seeding');
}

void main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => prisma.$disconnect());
