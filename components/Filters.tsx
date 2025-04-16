import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface FiltersType { // Define a type for the filters object
  name: string;
  status: string;
  gender: string;
}

interface Props {
  filters: FiltersType;
  setFilters: (filters: any) => void;
}

export const Filters = ({ filters, setFilters }: Props) => {
  const handleFilterChange = (key: keyof FiltersType, value: string) => { // Narrow down the type of key
    if (value === "all") {
      value = "";
    }
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const getDisplayValue = (filterKey: keyof FiltersType) => { // Narrow down the type of filterKey
    const value = filters[filterKey];
    if (value === "") {
      return filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Search by name"
        value={filters.name}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, name: e.target.value }))}
        className="w-full sm:w-64"
      />
      <Select onValueChange={(val) => handleFilterChange("status", val)} value={filters.status}>
        <SelectTrigger className="w-full sm:w-48">
          {getDisplayValue("status")}
        </SelectTrigger>
        <SelectContent className="bg-[#D5C7A3]">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(val) => handleFilterChange("gender", val)} value={filters.gender}>
        <SelectTrigger className="w-full sm:w-48">
          {getDisplayValue("gender")}
        </SelectTrigger>
        <SelectContent className ="bg-[#D5C7A3]">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="genderless">Genderless</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};