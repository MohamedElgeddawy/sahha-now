"use client";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "motion/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// Animated version of the breadcrumb components
const AnimatedBreadcrumbItem = motion.create(BreadcrumbItem);
const AnimatedBreadcrumbPage = motion.create(BreadcrumbPage);
const AnimatedBreadcrumbSeparator = motion.create(BreadcrumbSeparator);

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShadcnBreadcrumb className="py-4 text-[#2C3E50]">
        <BreadcrumbList>
          {items.map((item, index) => (
            <Fragment key={item.href || index}>
              {index > 0 && (
                <AnimatedBreadcrumbSeparator
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                />
              )}
              <AnimatedBreadcrumbItem
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                {index === items.length - 1 ? (
                  <AnimatedBreadcrumbPage
                    initial={{ color: "#808080" }}
                    animate={{ color: "#2C3E50" }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    {item.label}
                  </AnimatedBreadcrumbPage>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BreadcrumbLink asChild>
                      <Link
                        className="text-gray-500 hover:underline"
                        href={item.href ?? "/"}
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  </motion.div>
                )}
              </AnimatedBreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </motion.div>
  );
}
