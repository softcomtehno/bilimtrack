import React from "react";
import { cn } from "@/shared/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  subtitle,
  action,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-card overflow-hidden",
        className
      )}
    >
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
