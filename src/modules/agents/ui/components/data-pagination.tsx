import { Button } from "@/components/ui/button";

interface props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-1 text-sm text-muted-foreground pl-1">
        Page {page} from {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
