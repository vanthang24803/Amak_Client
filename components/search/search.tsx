'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import useSearch from '@/hooks/use-search';
import { SearchContent } from './search-context';

const SearchComponent = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { router, content, handleInputChange, product, search, searchLoading } =
    useSearch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/search/?product=${content}`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="relative lg:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[500px] md:w-[300px] h-10 font-medium"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Tìm kiếm sản phẩm..."
      />
      <div className="absolute top-1 right-1 w-14 h-5/6 flex items-center justify-center bg-[#417505] rounded-md cursor-pointer hover:bg-[#65b10d] ">
        <Search className="w-4 h-4 text-white hover:cursor-pointer " />
      </div>
      {open && (
        <SearchContent
          content={content}
          product={product}
          search={search}
          loading={searchLoading}
        />
      )}
    </div>
  );
};

export default SearchComponent;
