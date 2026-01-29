import fs from "fs";
import path from "path";
import Papa from "papaparse";

export interface Movie {
    id: number;
    category: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    logoUrl?: string; // New field for transparent logo
    videoUrl: string;
    genre: string;
    match: string;
    year: string;
    duration: string; // Added for compatibility
    imdbRating?: string; // New field
    streams?: string;    // New field
}

export interface Category {
    title: string;
    items: Movie[];
}

export async function getPortfolioData(): Promise<Category[]> {
    const filePath = path.join(process.cwd(), "public", "content.csv");

    try {
        const fileContent = fs.readFileSync(filePath, "utf8");

        const { data } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });

        // Group by Category
        const categories: Record<string, Movie[]> = {};

        data.forEach((row: any, index: number) => {
            const category = row.Category || "Uncategorized";

            if (!categories[category]) {
                categories[category] = [];
            }

            // Handle image paths: if it starts with http, keep it; otherwise assume /images/ folder
            let thumb = row.ImageFile;
            if (thumb && !thumb.startsWith("http") && !thumb.startsWith("/")) {
                thumb = `/images/${thumb}`;
            }
            // If no image provided, use a placeholder
            if (!thumb) thumb = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

            // Handle Logo path
            let logo = row.LogoFile;
            if (logo && !logo.startsWith("http") && !logo.startsWith("/")) {
                logo = `/images/${logo}`;
            }

            categories[category].push({
                id: index + 1,
                category: category,
                title: row.Title,
                description: row.Description,
                thumbnailUrl: thumb,
                logoUrl: logo || undefined,
                videoUrl: row.VideoFile || "", // We handle video paths similarly later if needed
                genre: row.Genre || "General",
                match: row.Match || "90%",
                year: row.Year || "2025",
                duration: "10m", // Default for now
                imdbRating: row.IMDb || "",
                streams: row.Streams || ""
            });
        });

        // Convert map to array
        return Object.keys(categories).map(key => ({
            title: key,
            items: categories[key].slice(0, 5)
        }));

    } catch (error) {
        console.error("Error reading CSV:", error);
        // Fallback data if file read fails (prevent crash)
        return [];
    }
}
