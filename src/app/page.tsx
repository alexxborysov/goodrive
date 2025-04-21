import { ArrowDownIcon, RocketIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/shared/view/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shared/view/ui/card';
import { TransferredDataCharts } from '~/view/transferred-charts';

export default function Home() {
  return (
    <main className="mt-[61px] flex h-full w-full flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <section className="-mt-[13dvh] flex h-dvh flex-col items-center justify-center gap-[32px] px-5 sm:items-start md:px-2">
        <h1
          className="text-center text-3xl leading-10 xl:text-4xl"
          data-heading-tag="H1"
        >
          Google Drive as your Cloud Bucket DEV
        </h1>
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Connect Google Account with Drive.
          </li>
          <li className="tracking-[-.01em]">
            Securely use it as Cloud Bucket through our API Service.
          </li>
        </ol>

        <div className="flex items-center gap-4">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">
            <RocketIcon />
            Learn goodrive
          </Button>
          <Link href="#charts" passHref>
            <Button variant="outline">
              <ArrowDownIcon />
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="charts"
        className="from-0 -mt-20 flex w-full items-stretch justify-center from-[#09090B] via-[#151719] via-45% to-[#09090B] to-99% px-2 pt-40 pb-36 md:px-3 xl:px-6 dark:bg-gradient-to-b"
      >
        <div className="grid w-full grid-cols-1 items-start justify-center xl:grid-cols-2 xl:gap-x-8">
          <div className="mb-6 grid w-full min-w-full scroll-m-48 grid-cols-1 gap-4 sm:grid-cols-2 xl:w-1/2 xl:grid-cols-1 xl:gap-6">
            <BenefitCard
              title="Easy and Simple"
              description="Your data stays consistent worldwide through deployment migrations."
            />
            <BenefitCard
              title="Zero Config"
              description="No configuration required — just start using it right away!"
            />
            <BenefitCard
              title="Persisted between deployments"
              description="Your data stays consistent worldwide through deployment migrations."
            />
            <BenefitCard
              title="Centralized management"
              description="Connect multiple Google Accounts and manage Buckets in one place."
            />
          </div>
          <div className="flex h-full w-full min-w-full">
            <TransferredDataCharts />
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitCard(props: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
