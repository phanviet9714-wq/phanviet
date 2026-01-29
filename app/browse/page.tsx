import { getPortfolioData } from "@/lib/data";
import BrowseClient from "@/components/BrowseClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Browse() {
    // 1. Read from CSV
    const categories = await getPortfolioData();

    // 2. Pass data to Client Component
    return <BrowseClient categories={categories} />;
}
