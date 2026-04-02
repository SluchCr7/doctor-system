import React from "react";

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className = "", ...props }, ref) => (
        <div className="relative w-full overflow-auto rounded-xl border border-border shadow-sm">
            <table
                ref={ref}
                className={`w-full caption-bottom text-sm text-left ${className}`}
                {...props}
            />
        </div>
    )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className = "", ...props }, ref) => (
        <thead ref={ref} className={`bg-background-subtle border-b border-border ${className}`} {...props} />
    )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className = "", ...props }, ref) => (
        <tbody
            ref={ref}
            className={`[&_tr:last-child]:border-0 active-tbody ${className}`}
            {...props}
        />
    )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className = "", ...props }, ref) => (
        <tr
            ref={ref}
            className={`border-b border-border-subtle transition-colors hover:bg-background-subtle/50 data-[state=selected]:bg-background-subtle ${className}`}
            {...props}
        />
    )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className = "", ...props }, ref) => (
        <th
            ref={ref}
            className={`h-11 px-6 text-left align-middle font-semibold text-text-secondary [&:has([role=checkbox])]:pr-0 ${className}`}
            {...props}
        />
    )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className = "", ...props }, ref) => (
        <td
            ref={ref}
            className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 text-text-primary ${className}`}
            {...props}
        />
    )
);
TableCell.displayName = "TableCell";
