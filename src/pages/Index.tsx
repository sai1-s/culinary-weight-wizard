
import Header from "@/components/Header";
import RecipeForm from "@/components/RecipeForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-2">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full">
        <RecipeForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
