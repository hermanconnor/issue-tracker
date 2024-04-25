import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className="text-xl text-gray-800 md:text-3xl md:leading-normal">
          <h1>
            <strong className="text-purple-500">
              Welcome to Issue Tracker
            </strong>
          </h1>
          <p>Keep track of issues in your projects.</p>
        </div>

        {/* TODO: login links */}
        <div className="flex justify-between">
          <Button variant="outline" asChild className="px-6 py-3">
            <Link href="/sign-in">Sign in</Link>
          </Button>

          <Button variant="primary" className="px-6 py-3">
            Demo
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:h-3/5 md:px-28 md:py-12">
        <Image
          src="/images/mock-1.jpg"
          width={1000}
          height={700}
          alt="Screenshot of the dashboard showing desktop, tablet, and mobile views"
          priority
        />
      </div>
    </div>
  );
}
