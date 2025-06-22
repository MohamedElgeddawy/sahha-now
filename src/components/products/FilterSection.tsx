import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";

type FilterItem = {
  name: string;
  count: number;
};

type FilterSectionProps = {
  title: string;
  items: FilterItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  searchInput?: React.ReactNode;
  onItemSelect?: (itemName: string) => void;
  selectedItem?: string;
  renderItem?: (item: FilterItem) => React.ReactNode;
};

const FilterSection = ({
  title,
  items,
  isCollapsed,
  onToggleCollapse,
  searchInput,
  onItemSelect,
  selectedItem,
  renderItem,
}: FilterSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleCollapse}
      >
        <h3 className="font-medium text-lg">{title}</h3>
        <motion.button
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? <Plus /> : <Minus />}
        </motion.button>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {searchInput && <div className="my-3">{searchInput}</div>}

            <div className="mt-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  {renderItem ? (
                    renderItem(item)
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`item-${item.name}`}
                          checked={selectedItem === item.name}
                          onCheckedChange={() =>
                            onItemSelect && onItemSelect(item.name)
                          }
                        />
                        <label
                          htmlFor={`item-${item.name}`}
                          className="text-gray-700"
                        >
                          {item.name}
                        </label>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({item.count})
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;
