import { RocketIcon } from "lucide-react";
import { Button } from "~/shared/view/ui/button";

export default function Home() {
  return (
    <div className="border-t-[1px] border-border/50 items-center justify-items-center min-h-[100dvh] h-[100dvh] flex justify-center p-6 mt-[61px] w-full font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start -mt-40 px-1 md:px-2">
        <h1 className="text-3xl lg:text-4xl text-center leading-10">
          Google Drive as your Cloud Bucket
        </h1>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Connect Google Account with Drive.
          </li>
          <li className="tracking-[-.01em]">
            Generate secret key for our API Service.
          </li>
        </ol>

        <div className="flex gap-4 items-center">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">
            <RocketIcon />
            Learn goodrive
          </Button>
        </div>
      </main>
    </div>
  );
}
