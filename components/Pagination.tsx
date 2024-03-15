"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  DoubleArrowRightIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        disabled={currentPage <= 1}
        variant="outline"
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        disabled={currentPage <= 1}
        variant="outline"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <p>
        Page {currentPage} of {totalPages}
      </p>

      <Button
        disabled={currentPage >= totalPages}
        variant="outline"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>

      <Button
        disabled={currentPage >= totalPages}
        variant="outline"
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
