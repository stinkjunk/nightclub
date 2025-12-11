import PageHeadline from "@/app/components/global/PageHeadline";
import AppHeader from "@/app/components/layout/header/AppHeader";

export default function Blog() {
  return (
    <>
      <AppHeader />
      <main>
        <PageHeadline title="Blog Post" />
      </main>
    </>
  );
}