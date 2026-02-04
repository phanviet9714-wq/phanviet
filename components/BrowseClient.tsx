"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Row from "@/components/Row";
import Modal from "@/components/Modal";
import { Category } from "@/lib/data";
import { useProfile, ProfileId } from "@/components/ProfileContext";

interface BrowseClientProps {
  categories: Category[];
}

export default function BrowseClient({ categories }: BrowseClientProps) {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const { currentProfile } = useProfile();

  // Helper to find category by partial name
  const findCat = (partial: string) => categories.find(c => c.title.toLowerCase().includes(partial.toLowerCase()));

  // 1. Determine Hero Movie based on Profile
  let featuredMovie = null;

  if (currentProfile.id === 1) { // Người tò mò -> Highlight (Phan Việt)
    const cat = findCat("Highlight");
    featuredMovie = cat ? cat.items[0] : null;
  } else if (currentProfile.id === 2) { // Content Creator -> Mr Beast (Hành trình)
    const cat = findCat("Hành trình");
    // Pick "Bí mật Viral của Mr. Beast" or just the first one
    featuredMovie = cat ? cat.items.find(m => m.title.includes("Mr. Beast")) || cat.items[0] : null;
  } else if (currentProfile.id === 3) { // Chuyên gia -> Người thầy (Naval/Sam Altman)
    const cat = findCat("Người thầy");
    featuredMovie = cat ? cat.items.find(m => m.title.includes("Naval")) || cat.items[0] : null;
  } else if (currentProfile.id === 4) { // Học viên -> Course
    const cat = findCat("Lớp sắp khai giảng");
    featuredMovie = cat ? cat.items[0] : null;
  }

  // Fallback if specific movie not found
  if (!featuredMovie) {
    const highlight = findCat("Highlight");
    featuredMovie = highlight ? highlight.items[0] : (categories.length > 0 ? categories[0].items[0] : null);
  }

  // 2. Sort Categories based on Profile
  let sortedCategories = [...categories].filter(c => c.title !== "Highlight"); // Always hide Highlight from rows if used in Hero? 
  // Wait, current logic was: "Filter out Highlight from rows".
  // But for other profiles, "Highlight" (Phan Viet) might be interesting to see in rows if it's not the Hero?
  // Let's keep it simple: Filter out the category that IS the Hero category? 
  // Or just filter out "Highlight" specifically because it's the "Intro" category.
  // Actually, "Highlight" is specifically "Introduction". It fits well as Hero for "Curious".
  // For others, "Highlight" might be good to have in rows.

  // Let's re-implement sort logic:
  const sortOrder: Record<ProfileId, string[]> = {
    1: ["Cột mốc", "Hành trình", "Người thầy", "Lớp"], // Tò mò
    2: ["Hành trình", "Cột mốc", "Người thầy", "Lớp"], // Creator
    3: ["Người thầy", "Cột mốc", "Hành trình", "Lớp"], // Chuyên gia
    4: ["Lớp", "Hành trình", "Người thầy", "Cột mốc"], // Học viên
  };

  const order = sortOrder[currentProfile.id] || [];

  sortedCategories.sort((a, b) => {
    const indexA = order.findIndex(key => a.title.includes(key));
    const indexB = order.findIndex(key => b.title.includes(key));

    // If found in order list
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  // Filter out the category that is currently the Hero?
  // If Hero is from "Hành trình", maybe we shouldn't show "Hành trình" row?
  // Or just show it, duplicate is fine for Netflix (Trending Now vs Top 10).
  // But "Highlight" (Phan Viet) is special, it's just one item usually? (CSV has 1 item "PHAN VIỆT").
  // So "Highlight" should probably ALWAYS be hidden from rows if it only has 1 item.
  sortedCategories = sortedCategories.filter(c => c.title !== "Highlight");


  return (
    <div className="relative min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="relative pb-24 lg:space-y-24">
        {/* Pass featured movie data to Hero */}
        <Hero
          movie={featuredMovie}
          accentColor={currentProfile.accentColor}
          greeting={currentProfile.greeting}
        />

        <div className="relative z-20 -mt-10 md:-mt-32 space-y-8 lg:space-y-16">
          {sortedCategories.map((category) => (
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
