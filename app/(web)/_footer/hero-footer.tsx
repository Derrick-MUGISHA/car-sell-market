"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  CAR_BRAND_OPTIONS,
  CAR_CONDITION_OPTIONS,
  CAR_FUELTYPE_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_PRICE_RANGE_OPTIONS,
  CAR_YEAR_RANGE_OPTIONS,
} from "@/constants/car-options";
import { SelectValue } from "@radix-ui/react-select";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface filterOption {
  label: string;
  value: string;
}

interface FilterSelectorProps {
  label: string;
  options: filterOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

function HeroFooter() {
  // const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<{
    brand?: string;
    condition?: string;
    model?: string;
    fuelType?: string;
    year_min?: string;
    year_max?: string;
    price?: string;
  }>({});

  const filterOptions: Record<string, filterOption[]> = {
    brand: CAR_BRAND_OPTIONS,
    models: CAR_MODEL_OPTIONS,
    conditions: CAR_CONDITION_OPTIONS,
    years: CAR_YEAR_RANGE_OPTIONS,
    fuelType: CAR_FUELTYPE_OPTIONS,
    priceRange: CAR_PRICE_RANGE_OPTIONS?.filter((item) => item.value !== "0"),
  };

  const handleFilterChange = (key: keyof typeof selectedFilter, value: string) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(selectedFilter).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    router.push(`/search?${params.toString()}`); // dou to the messing  useRouter()
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-4 lg:gap-8">
        <FilterSelect
          label="Brand"
          options={filterOptions.brand}
          placeholder="Brand"
          onChange={(value) => handleFilterChange("brand", value)}
        />

        <FilterSelect
          label="Model"
          options={filterOptions.models}
          placeholder="Model"
          onChange={(value) => handleFilterChange("model", value)}
        />

        <FilterSelect
          label="Condition"
          options={filterOptions.conditions}
          placeholder="Condition"
          onChange={(value) => handleFilterChange("condition", value)}
        />

        <FilterSelect
          label="Year"
          options={filterOptions.years}
          placeholder="Year"
          onChange={(value) => {
            const [min, max] = value.split("-").map(Number);
            setSelectedFilter((prev) => ({
              ...prev,
              year_min: min.toString(),
              year_max: max.toString(),
            }));
          }}
        />

        <FilterSelect
          label="Fuel Type"
          options={filterOptions.fuelType}
          placeholder="Fuel Type"
          onChange={(value) => handleFilterChange("fuelType", value)}
        />

        <FilterSelect
          label="Price"
          options={filterOptions.priceRange}
          placeholder="Price"
          onChange={(value) => handleFilterChange("price", value)}
        />
      </div>

      <Button
        className="w-full lg:w-11/12 mx-auto flex items-center justify-between py-6 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-200"
        onClick={handleSearch}
      >
        <span className="flex items-center gap-1 font-light">
          <b className="font-bold">1000+</b> CAR Listed
        </span>
        <span className="flex items-center gap-1 uppercase font-semibold">
          Search Now
          <ChevronRight />
        </span>
      </Button>

      <p className="text-muted text-sm text-center text-gray-700 mt-4">
        Want to search more customized{" "}
        <Link
          href="/search"
          className="text-blue-500 hover:text-blue-700 underline font-semibold ml-2"
        >
          Advanced search
        </Link>
      </p>
    </div>
  );
}

const FilterSelect: React.FC<FilterSelectorProps> = ({
  label,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full lg:w-[28%]">
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default HeroFooter;
