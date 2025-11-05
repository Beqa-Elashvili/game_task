import { usePathname, useRouter } from "next/navigation";

const usePathnameHook = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (category: string) => {
    const segments = pathname.split("/").filter(Boolean);

    const collections: string[] = [];
    const providers: string[] = [];

    let currentType: string | null = null;

    for (const segment of segments) {
      if (segment === "collections" || segment === "providers") {
        currentType = segment;
      } else if (currentType === "collections") {
        collections.push(segment);
      } else if (currentType === "providers") {
        providers.push(segment);
      }
    }

    const newCategory = category.toLowerCase().replace(/\s+/g, "-");

    const updatedCollections = collections.filter(
      (c) => c !== "all-collections" && c !== newCategory
    );
    updatedCollections.push(newCategory);

    const newPath = [
      "games",
      "collections",
      ...updatedCollections,
      "providers",
      ...(providers.length ? providers : ["all-providers"]),
    ].join("/");

    router.push(`/${newPath}`);
  };
  return { handleClick };
};
export default usePathnameHook;
