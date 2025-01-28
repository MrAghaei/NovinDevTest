import type * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: React.ComponentProps<"nav"> & {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const renderPageButton = (pageNumber: number) => (
    <PaginationLink
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      isActive={currentPage === pageNumber}
    >
      {pageNumber}
    </PaginationLink>
  );

  const renderEllipsis = (key: string) => <PaginationEllipsis key={key} />;

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      buttons.push(renderPageButton(1));

      if (currentPage > 3) {
        buttons.push(renderEllipsis("start"));
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) {
        buttons.push(renderEllipsis("end"));
      }

      buttons.push(renderPageButton(totalPages));
    }

    return buttons;
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1">
        <PaginationLink
          onClick={() => onPageChange(currentPage - 1)}
          className={currentPage === 1 ? " pointer-events-none" : ""}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationLink>
        {renderPageButtons()}
        <PaginationLink
          onClick={() => onPageChange(currentPage + 1)}
          className={currentPage === totalPages ? " pointer-events-none" : ""}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationLink>
      </ul>
    </nav>
  );
};

const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: ButtonProps & { isActive?: boolean }) => (
  <li className={"cursor-pointer"}>
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size: "icon",
        }),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  </li>
);

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export { Pagination, PaginationLink };
