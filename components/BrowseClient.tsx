"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Row from "@/components/Row";
import Modal from "@/components/Modal";
import { Category } from "@/lib/data";

interface BrowseClientProps {
  categories: Category[];
}

export default function BrowseClient({ categories }: BrowseClientProps) {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  // 1. Find the "Highlight" category for the Hero section
  const highlightCategory = categories.find((c) => c.title === "Highlight");
  const featuredMovie = highlightCategory ? highlightCategory.items[0] : (categories.length > 0 ? categories[0].items[0] : null);

  // 2. Filter out "Highlight" from the rows so it doesn't appear twice
  const rows = categories.filter((c) => c.title !== "Highlight");

  return (
    <div className="relative min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="relative pb-24 lg:space-y-24">
        {/* Pass featured movie data to Hero */}
        <Hero movie={featuredMovie} />

        <div className="pl-4 md:pl-16 -mt-10 md:-mt-32 relative z-20 space-y-8 lg:space-y-16">
          {rows.map((category) => (
            <Row
              key={category.title}
              title={category.title}
              movies={category.items}
              onMovieSelect={setSelectedMovie}
            />
          ))}

          {categories.length === 0 && (
            <div className="text-white text-center pt-20">
              <p>Chưa có dữ liệu. Hãy chỉnh sửa file <code>public/content.csv</code></p>
            </div>
          )}
        </div>
      </main>

      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}
