import Header from "./Header";

export default function AppHeader() {
  return (
    <>
      <div className="h-[var(--headerHeight)] pattern-sm absolute top-0 left-0 w-full" />
      <Header />
    </>
  );
}
