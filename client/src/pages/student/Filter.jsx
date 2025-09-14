import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';

const categories = [
  { id: 'Web Development', label: 'Web Development' },
  { id: 'Mobile App Development', label: 'Mobile App Development' },
  { id: 'Artificial Intelligence & Machine Learning', label: 'Artificial Intelligence & Machine Learning' },
  { id: 'Data Science & Analytics', label: 'Data Science & Analytics' },
  { id: 'Cloud Computing', label: 'Cloud Computing' },
  { id: 'DevOps & System Administration', label: 'DevOps & System Administration' },
  { id: 'UI/UX Design', label: 'UI/UX Design' },
  { id: 'Cybersecurity', label: 'Cybersecurity' },
  { id: 'Digital Marketing', label: 'Digital Marketing' },
  { id: 'Business Analytics', label: 'Business Analytics' },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState('');

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[22%] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-3" />
      <div>
        <h1 className="font-semibold mb-2">Categories</h1>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
